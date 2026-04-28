import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'cheerio';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const defaultSourceFile = 'docs/chime/xbrl/chym-20251231.htm';
const outputPath = path.resolve(rootDir, 'company-metrics/chime.json');

const getAttr = (element, name) => element.attr(name) ?? element.attr(name.toLowerCase()) ?? null;

const toNumber = (fact) => {
  const format = getAttr(fact, 'format');
  if (format === 'ixt:fixed-zero') return 0;
  if (format === 'ixt:fixed-true') return 1;
  if (format === 'ixt:fixed-false') return 0;

  const rawValue = fact.text().replace(/\u00a0/g, ' ').trim();
  const normalized = rawValue.replace(/,/g, '').replace(/\s+/g, '');

  if (!normalized || normalized === '-' || normalized === '—' || normalized.toLowerCase() === 'nil') {
    return null;
  }

  const numeric = Number(normalized);
  if (!Number.isFinite(numeric)) {
    return null;
  }

  const scale = Number(getAttr(fact, 'scale') ?? '0');
  const sign = getAttr(fact, 'sign');

  let value = numeric * 10 ** (Number.isFinite(scale) ? scale : 0);
  if (sign === '-') value = -Math.abs(value);
  return value;
};

const yearFromDate = (date) => Number(date?.slice(0, 4));
const toPct = (numerator, denominator) =>
  typeof numerator === 'number' && typeof denominator === 'number' && denominator !== 0
    ? (numerator / denominator) * 100
    : null;

const pickEmployeeCountFromNarrative = (filingBodyText, year) => {
  const patterns = [
    new RegExp(
      `(?:OUR\\s+EMPLOYEES\\s*)?As\\s+of\\s+[A-Za-z]+\\s+\\d{1,2},\\s*${year},\\s+we\\s+had\\s+(?:approximately\\s+)?([\\d,]+)\\s+[^.]{0,120}?\\b(?:employees|employee|full-time|part-time|seasonal|associates|workers|staff|chimers)\\b`,
      'i',
    ),
    new RegExp(
      `(?:OUR\\s+EMPLOYEES\\s*)?As\\s+of\\s+[A-Za-z]+\\s+\\d{1,2},\\s*${year},\\s+we\\s+had\\s+(?:approximately\\s+)?([\\d,]+)\\b`,
      'i',
    ),
  ];

  for (const pattern of patterns) {
    const match = filingBodyText.match(pattern);
    if (!match) continue;

    const value = Number(match[1].replace(/,/g, ''));
    if (Number.isFinite(value)) return value;
  }

  return null;
};

async function parseFiling({ sourceFile = defaultSourceFile } = {}) {
  const resolvedSourcePath = path.isAbsolute(sourceFile) ? sourceFile : path.resolve(rootDir, sourceFile);
  const xbrlSource = await readFile(resolvedSourcePath, 'utf8');
  const $ = load(xbrlSource, { decodeEntities: false });

  const contexts = new Map();
  $('xbrli\\:context').each((_, element) => {
    const context = $(element);
    const id = context.attr('id');
    if (!id) return;

    const startDate = context.find('xbrli\\:startDate').first().text().trim() || null;
    const endDate = context.find('xbrli\\:endDate').first().text().trim() || null;
    const instant = context.find('xbrli\\:instant').first().text().trim() || null;
    const hasSegment = context.find('xbrli\\:segment').length > 0;

    contexts.set(id, {
      id,
      hasSegment,
      type: instant ? 'instant' : 'duration',
      startDate,
      endDate,
      instant,
    });
  });

  const filingBodyText = $('body').text().replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
  const facts = [];
  $('ix\\:nonFraction, ix\\:nonNumeric').each((_, element) => {
    const fact = $(element);
    const name = getAttr(fact, 'name');
    const contextRef = getAttr(fact, 'contextRef');
    if (!name || !contextRef) return;

    const context = contexts.get(contextRef);
    if (!context) return;

    facts.push({
      name,
      contextRef,
      context,
      rawText: fact.text().replace(/\u00a0/g, ' ').trim(),
      value: toNumber(fact),
    });
  });

  return {
    sourceFile: path.isAbsolute(sourceFile) ? path.relative(rootDir, sourceFile).split(path.sep).join('/') : sourceFile,
    filingBodyText,
    facts,
  };
}

export async function listFacts({ sourceFile = defaultSourceFile } = {}) {
  const { facts } = await parseFiling({ sourceFile });
  return facts;
}

function createFactFinders(facts) {
  const findFacts = ({
    names,
    type,
    year,
    includeSegment = false,
  }) => {
    const nameSet = new Set(Array.isArray(names) ? names : [names]);
    return facts.filter((fact) => {
      if (!nameSet.has(fact.name)) return false;
      if (!includeSegment && fact.context.hasSegment) return false;
      if (type && fact.context.type !== type) return false;
      if (!year) return true;

      const contextYear =
        fact.context.type === 'instant'
          ? yearFromDate(fact.context.instant)
          : yearFromDate(fact.context.endDate);
      return contextYear === year;
    });
  };

  const pickValue = (query) => {
    const match = findFacts(query).find((fact) => typeof fact.value === 'number');
    return match ? match.value : null;
  };

  const pickText = (query) => {
    const match = findFacts(query).find((fact) => fact.rawText);
    return match ? match.rawText : null;
  };

  return { findFacts, pickValue, pickText };
}

async function buildOutput({ sourceFile = defaultSourceFile } = {}) {
  const { sourceFile: normalizedSourceFile, filingBodyText, facts } = await parseFiling({ sourceFile });
  const { pickValue, pickText } = createFactFinders(facts);

  const revenue = pickValue({ names: 'us-gaap:Revenues', type: 'duration', year: 2025 });
  const previousRevenue = pickValue({ names: 'us-gaap:Revenues', type: 'duration', year: 2024 });
  const grossProfit = pickValue({ names: 'us-gaap:GrossProfit', type: 'duration', year: 2025 });
  const operatingIncome = pickValue({ names: 'us-gaap:OperatingIncomeLoss', type: 'duration', year: 2025 });
  const depreciationAndAmortization =
    pickValue({ names: 'us-gaap:DepreciationDepletionAndAmortization', type: 'duration', year: 2025 }) ??
    pickValue({
      names: 'chym:DepreciationDepletionAndAmortizationExcludingDeprecationIncludedInCostOfSales',
      type: 'duration',
      year: 2025,
    });
  const operatingCashFlow = pickValue({
    names: 'us-gaap:NetCashProvidedByUsedInOperatingActivities',
    type: 'duration',
    year: 2025,
  });
  const capex =
    pickValue({ names: 'us-gaap:PaymentsToAcquireProductiveAssets', type: 'duration', year: 2025 }) ??
    pickValue({ names: 'us-gaap:PaymentsToAcquirePropertyPlantAndEquipment', type: 'duration', year: 2025 });
  const companyName = pickText({ names: 'dei:EntityRegistrantName' }) ?? 'unknown';
  const ticker = pickText({ names: 'dei:TradingSymbol' }) ?? 'unknown';
  const marketCap = pickValue({ names: 'dei:EntityPublicFloat', type: 'instant', year: 2025 });

  const employeeCount =
    pickValue({ names: 'dei:EntityNumberOfEmployees', type: 'duration', year: 2025, includeSegment: true }) ??
    pickValue({ names: 'dei:EntityNumberOfEmployees', type: 'instant', year: 2025, includeSegment: true }) ??
    pickValue({ names: 'us-gaap:NumberOfEmployees', type: 'duration', year: 2025, includeSegment: true }) ??
    pickValue({ names: 'us-gaap:NumberOfEmployees', type: 'instant', year: 2025, includeSegment: true }) ??
    pickEmployeeCountFromNarrative(filingBodyText, 2025) ??
    null;

  const revenueGrowthPct =
    typeof revenue === 'number' && typeof previousRevenue === 'number' && previousRevenue !== 0
      ? ((revenue - previousRevenue) / previousRevenue) * 100
      : null;
  const grossMarginPct = toPct(grossProfit, revenue);
  const ebitda = typeof operatingIncome === 'number' && typeof depreciationAndAmortization === 'number'
    ? operatingIncome + depreciationAndAmortization
    : null;
  const ebitdaMarginPct = toPct(ebitda, revenue);
  const freeCashFlow = typeof operatingCashFlow === 'number' && typeof capex === 'number'
    ? operatingCashFlow - capex
    : null;
  const freeCashFlowMarginPct = toPct(freeCashFlow, revenue);

  return {
    companyName,
    ticker,
    fiscalYear: 2025,
    sourceFile: normalizedSourceFile,
    extractedAt: new Date().toISOString(),
    metrics: {
      revenue,
      revenueGrowthPct,
      grossMarginPct,
      marketCap,
      valuation: null,
      ebitdaMarginPct,
      freeCashFlowMarginPct,
      employeeCount,
    },
  };
}

async function main() {
  const output = await buildOutput();
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(output, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${outputPath}`);
}

const isDirectExecution = process.argv[1] ? path.resolve(process.argv[1]) === __filename : false;
if (isDirectExecution) {
  await main();
}
