import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const companyMetricsDir = path.resolve(__dirname, '../company-metrics');
const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

function formatCurrency(value) {
  return Number.isFinite(value) ? currencyFormatter.format(value) : 'N/A';
}

function formatNumber(value) {
  return Number.isFinite(value) ? numberFormatter.format(value) : 'N/A';
}

function withGuessSuffix(value, isGuessed = false) {
  return isGuessed ? `${value} (?)` : value;
}

function formatMaybeGuessed(key, value, guessedKeys, format = formatNumber) {
  return withGuessSuffix(format(value), guessedKeys.has(key));
}

function logScenarioHeader(companyName, scenarioName) {
  console.log(`\n${companyName} — ${scenarioName}`);
}

function logNumber(label, value, format = formatNumber) {
  console.log(`- ${label}: ${format(value)}`);
}

function readRequiredNumber(missing, key, value) {
  if (Number.isFinite(value)) return value;
  missing.add(key);
  console.log(`- Missing number: ${key}`);
  return null;
}

async function loadCompany(slug) {
  const filePath = path.resolve(companyMetricsDir, `${slug}.json`);
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

function runScenario1(companyName, metrics, inputs, guessedKeys, missing) {
  logScenarioHeader(companyName, 'Scenario 1: member value (3x to 20x revenue) and ransomware');
  const revenue = readRequiredNumber(missing, 'metrics.revenue', metrics.revenue);
  if (!Number.isFinite(revenue)) return;

  const memberValueLow = revenue * 3;
  const memberValueHigh = revenue * 20;
  logNumber('Revenue', revenue, formatCurrency);
  console.log(`- Member value low = revenue * 3 = ${formatCurrency(revenue)} * 3 = ${formatCurrency(memberValueLow)}`);
  console.log(`- Member value high = revenue * 20 = ${formatCurrency(revenue)} * 20 = ${formatCurrency(memberValueHigh)}`);

  const ransomAmount = readRequiredNumber(missing, 'ransomAmountForCompleteBusinessStoppage', inputs.ransomAmountForCompleteBusinessStoppage);
  if (!Number.isFinite(ransomAmount)) return;
  const ransomPctOfRevenue = (ransomAmount / revenue) * 100;
  console.log(`- Ransom amount = ${formatMaybeGuessed('ransomAmountForCompleteBusinessStoppage', ransomAmount, guessedKeys, formatCurrency)}`);
  console.log(`- Ransom as % of revenue = (${formatMaybeGuessed('ransomAmountForCompleteBusinessStoppage', ransomAmount, guessedKeys, formatCurrency)} / ${formatCurrency(revenue)}) * 100 = ${formatNumber(ransomPctOfRevenue)}%`);
}

function runScenario2(companyName, inputs, guessedKeys, missing) {
  logScenarioHeader(companyName, 'Scenario 2: member data');
  const members = readRequiredNumber(missing, 'numberOfMembers', inputs.numberOfMembers);
  const confidentialFields = readRequiredNumber(missing, 'confidentialFieldsPerMember', inputs.confidentialFieldsPerMember);
  const restrictedFields = readRequiredNumber(missing, 'restrictedFieldsPerMember', inputs.restrictedFieldsPerMember);
  const finePerConfidential = readRequiredNumber(missing, 'finePerConfidentialField', inputs.finePerConfidentialField);
  const finePerRestricted = readRequiredNumber(missing, 'finePerRestrictedField', inputs.finePerRestrictedField);
  const darkWebSalePerMember = readRequiredNumber(missing, 'darkWebSaleValuePerMember', inputs.darkWebSaleValuePerMember);
  const bugBounty = readRequiredNumber(missing, 'bugBountyValueForMemberDataIssue', inputs.bugBountyValueForMemberDataIssue);

  if (![members, confidentialFields, restrictedFields, finePerConfidential, finePerRestricted, darkWebSalePerMember, bugBounty].every(Number.isFinite)) return;

  const totalSensitiveFields = members * (confidentialFields + restrictedFields);
  const confidentialFineExposure = members * confidentialFields * finePerConfidential;
  const restrictedFineExposure = members * restrictedFields * finePerRestricted;
  const totalRegulatoryExposure = confidentialFineExposure + restrictedFineExposure;
  const totalDarkWebExposure = members * darkWebSalePerMember;
  const bugBountyEquivalent = totalRegulatoryExposure / bugBounty;

  console.log(`- Total sensitive fields = members * (confidential + restricted) = ${formatMaybeGuessed('numberOfMembers', members, guessedKeys)} * (${formatMaybeGuessed('confidentialFieldsPerMember', confidentialFields, guessedKeys)} + ${formatMaybeGuessed('restrictedFieldsPerMember', restrictedFields, guessedKeys)}) = ${formatNumber(totalSensitiveFields)}`);
  console.log(`- Confidential fine exposure = members * confidential fields * fine = ${formatMaybeGuessed('numberOfMembers', members, guessedKeys)} * ${formatMaybeGuessed('confidentialFieldsPerMember', confidentialFields, guessedKeys)} * ${formatMaybeGuessed('finePerConfidentialField', finePerConfidential, guessedKeys, formatCurrency)} = ${formatCurrency(confidentialFineExposure)}`);
  console.log(`- Restricted fine exposure = members * restricted fields * fine = ${formatMaybeGuessed('numberOfMembers', members, guessedKeys)} * ${formatMaybeGuessed('restrictedFieldsPerMember', restrictedFields, guessedKeys)} * ${formatMaybeGuessed('finePerRestrictedField', finePerRestricted, guessedKeys, formatCurrency)} = ${formatCurrency(restrictedFineExposure)}`);
  console.log(`- Total regulatory exposure = confidential + restricted = ${formatCurrency(totalRegulatoryExposure)}`);
  console.log(`- Dark web exposure = members * dark web sale value per member = ${formatMaybeGuessed('numberOfMembers', members, guessedKeys)} * ${formatMaybeGuessed('darkWebSaleValuePerMember', darkWebSalePerMember, guessedKeys, formatCurrency)} = ${formatCurrency(totalDarkWebExposure)}`);
  console.log(`- Bug bounty equivalent count = total regulatory exposure / bug bounty value = ${formatCurrency(totalRegulatoryExposure)} / ${formatMaybeGuessed('bugBountyValueForMemberDataIssue', bugBounty, guessedKeys, formatCurrency)} = ${formatNumber(bugBountyEquivalent)}`);
}

function runScenario3(companyName, inputs, guessedKeys, missing) {
  logScenarioHeader(companyName, 'Scenario 3: vulnerabilities (example: RCE)');
  const govFine = readRequiredNumber(missing, 'rceGovernmentFine', inputs.rceGovernmentFine);
  const darkWebSale = readRequiredNumber(missing, 'rceDarkWebSaleValue', inputs.rceDarkWebSaleValue);
  const bugBounty = readRequiredNumber(missing, 'rceBugBountyValue', inputs.rceBugBountyValue);
  const annualRceEvents = readRequiredNumber(missing, 'annualRceEventCount', inputs.annualRceEventCount);

  if (![govFine, darkWebSale, bugBounty, annualRceEvents].every(Number.isFinite)) return;

  const perEventCost = govFine + darkWebSale + bugBounty;
  const annualizedCost = perEventCost * annualRceEvents;
  console.log(`- Per-event RCE cost = government fine + dark web value + bug bounty = ${formatMaybeGuessed('rceGovernmentFine', govFine, guessedKeys, formatCurrency)} + ${formatMaybeGuessed('rceDarkWebSaleValue', darkWebSale, guessedKeys, formatCurrency)} + ${formatMaybeGuessed('rceBugBountyValue', bugBounty, guessedKeys, formatCurrency)} = ${formatCurrency(perEventCost)}`);
  console.log(`- Annualized RCE cost = per-event cost * annual event count = ${formatCurrency(perEventCost)} * ${formatMaybeGuessed('annualRceEventCount', annualRceEvents, guessedKeys)} = ${formatCurrency(annualizedCost)}`);
}

function runScenario4(companyName, inputs, guessedKeys, missing) {
  logScenarioHeader(companyName, 'Scenario 4: government consent order');
  const annualCost = readRequiredNumber(missing, 'consentOrderContinuingCostPerYear', inputs.consentOrderContinuingCostPerYear);
  const years = readRequiredNumber(missing, 'consentOrderProjectionYears', inputs.consentOrderProjectionYears);

  if (![annualCost, years].every(Number.isFinite)) return;
  const totalCost = annualCost * years;
  console.log(`- Consent order total cost = annual continuing cost * years = ${formatMaybeGuessed('consentOrderContinuingCostPerYear', annualCost, guessedKeys, formatCurrency)} * ${formatMaybeGuessed('consentOrderProjectionYears', years, guessedKeys)} = ${formatCurrency(totalCost)}`);
}

function runScenario5(companyName, inputs, guessedKeys, missing) {
  logScenarioHeader(companyName, 'Scenario 5: emotional / brand value');
  const trustValue = readRequiredNumber(missing, 'valueOfMemberTrust', inputs.valueOfMemberTrust);
  const trustLossPct = readRequiredNumber(missing, 'trustLossPctFromSecurityIncident', inputs.trustLossPctFromSecurityIncident);
  const founderSleepValue = readRequiredNumber(missing, 'foundersSleepWellAtNightValue', inputs.foundersSleepWellAtNightValue);

  if (![trustValue, trustLossPct, founderSleepValue].every(Number.isFinite)) return;
  const trustLossValue = trustValue * (trustLossPct / 100);
  const combinedIntangibleValue = trustLossValue + founderSleepValue;
  console.log(`- Trust loss value = trust value * trust loss % = ${formatMaybeGuessed('valueOfMemberTrust', trustValue, guessedKeys, formatCurrency)} * ${formatMaybeGuessed('trustLossPctFromSecurityIncident', trustLossPct, guessedKeys)}% = ${formatCurrency(trustLossValue)}`);
  console.log(`- Combined intangible value = trust loss value + founder sleep value = ${formatCurrency(trustLossValue)} + ${formatMaybeGuessed('foundersSleepWellAtNightValue', founderSleepValue, guessedKeys, formatCurrency)} = ${formatCurrency(combinedIntangibleValue)}`);
}

function runScenario6(companyName, metrics, inputs, guessedKeys, missing) {
  logScenarioHeader(companyName, 'Scenario 6: security engineers value');
  const securityEngineers = readRequiredNumber(missing, 'securityEngineerCount', inputs.securityEngineerCount);
  const valuePerEngineer = readRequiredNumber(missing, 'valuePerSecurityEngineerPerYear', inputs.valuePerSecurityEngineerPerYear);
  const employeeCount = readRequiredNumber(missing, 'metrics.employeeCount', metrics.employeeCount);

  if (![securityEngineers, valuePerEngineer, employeeCount].every(Number.isFinite)) return;

  const totalEngineerValue = securityEngineers * valuePerEngineer;
  const securityTeamPct = (securityEngineers / employeeCount) * 100;
  console.log(`- Security engineer value = security engineers * value per engineer = ${formatMaybeGuessed('securityEngineerCount', securityEngineers, guessedKeys)} * ${formatMaybeGuessed('valuePerSecurityEngineerPerYear', valuePerEngineer, guessedKeys, formatCurrency)} = ${formatCurrency(totalEngineerValue)}`);
  console.log(`- Security team share of workforce = security engineers / employee count = ${formatMaybeGuessed('securityEngineerCount', securityEngineers, guessedKeys)} / ${formatNumber(employeeCount)} = ${formatNumber(securityTeamPct)}%`);
}

function runChimeScenarios(chime) {
  const missing = new Set();
  const inputs = {
    ransomAmountForCompleteBusinessStoppage: 25000000, // conservative guess
    numberOfMembers: 7000000, // conservative guess
    confidentialFieldsPerMember: 3, // conservative guess
    restrictedFieldsPerMember: 5, // conservative guess
    finePerConfidentialField: 100, // conservative guess
    finePerRestrictedField: 25, // conservative guess
    darkWebSaleValuePerMember: 15, // conservative guess
    bugBountyValueForMemberDataIssue: 10000, // conservative guess
    rceGovernmentFine: 5000000, // conservative guess
    rceDarkWebSaleValue: 2000000, // conservative guess
    rceBugBountyValue: 25000, // conservative guess
    annualRceEventCount: 0.25, // conservative guess
    consentOrderContinuingCostPerYear: 15000000, // conservative guess
    consentOrderProjectionYears: 5,
    valueOfMemberTrust: 300000000, // conservative guess
    trustLossPctFromSecurityIncident: 2, // conservative guess
    foundersSleepWellAtNightValue: 10000000, // conservative guess
    securityEngineerCount: 80, // conservative guess
    valuePerSecurityEngineerPerYear: 750000, // conservative guess
  };
  const guessedKeys = new Set([
    'ransomAmountForCompleteBusinessStoppage',
    'numberOfMembers',
    'confidentialFieldsPerMember',
    'restrictedFieldsPerMember',
    'finePerConfidentialField',
    'finePerRestrictedField',
    'darkWebSaleValuePerMember',
    'bugBountyValueForMemberDataIssue',
    'rceGovernmentFine',
    'rceDarkWebSaleValue',
    'rceBugBountyValue',
    'annualRceEventCount',
    'consentOrderContinuingCostPerYear',
    'valueOfMemberTrust',
    'trustLossPctFromSecurityIncident',
    'foundersSleepWellAtNightValue',
    'securityEngineerCount',
    'valuePerSecurityEngineerPerYear',
  ]);

  runScenario1(chime.companyName, chime.metrics ?? {}, inputs, guessedKeys, missing);
  runScenario2(chime.companyName, inputs, guessedKeys, missing);
  runScenario3(chime.companyName, inputs, guessedKeys, missing);
  runScenario4(chime.companyName, inputs, guessedKeys, missing);
  runScenario5(chime.companyName, inputs, guessedKeys, missing);
  runScenario6(chime.companyName, chime.metrics ?? {}, inputs, guessedKeys, missing);
  return missing;
}

function runVercelScenarios(vercel) {
  const missing = new Set();
  const inputs = {
    ransomAmountForCompleteBusinessStoppage: 8000000, // conservative guess
    numberOfMembers: 252157, // from docs/company-metrics.md lower-bound company usage stat (early 2026)
    confidentialFieldsPerMember: 2, // conservative guess
    restrictedFieldsPerMember: 3, // conservative guess
    finePerConfidentialField: 30, // conservative guess
    finePerRestrictedField: 15, // conservative guess
    darkWebSaleValuePerMember: 8, // conservative guess
    bugBountyValueForMemberDataIssue: 7500, // conservative guess
    rceGovernmentFine: 2000000, // conservative guess
    rceDarkWebSaleValue: 1000000, // conservative guess
    rceBugBountyValue: 15000, // conservative guess
    annualRceEventCount: 0.2, // conservative guess
    consentOrderContinuingCostPerYear: 5000000, // conservative guess
    consentOrderProjectionYears: 5,
    valueOfMemberTrust: 120000000, // conservative guess
    trustLossPctFromSecurityIncident: 1.5, // conservative guess
    foundersSleepWellAtNightValue: 5000000, // conservative guess
    securityEngineerCount: 45, // conservative guess
    valuePerSecurityEngineerPerYear: 600000, // conservative guess
  };
  const guessedKeys = new Set([
    'ransomAmountForCompleteBusinessStoppage',
    'confidentialFieldsPerMember',
    'restrictedFieldsPerMember',
    'finePerConfidentialField',
    'finePerRestrictedField',
    'darkWebSaleValuePerMember',
    'bugBountyValueForMemberDataIssue',
    'rceGovernmentFine',
    'rceDarkWebSaleValue',
    'rceBugBountyValue',
    'annualRceEventCount',
    'consentOrderContinuingCostPerYear',
    'valueOfMemberTrust',
    'trustLossPctFromSecurityIncident',
    'foundersSleepWellAtNightValue',
    'securityEngineerCount',
    'valuePerSecurityEngineerPerYear',
  ]);

  runScenario1(vercel.companyName, vercel.metrics ?? {}, inputs, guessedKeys, missing);
  runScenario2(vercel.companyName, inputs, guessedKeys, missing);
  runScenario3(vercel.companyName, inputs, guessedKeys, missing);
  runScenario4(vercel.companyName, inputs, guessedKeys, missing);
  runScenario5(vercel.companyName, inputs, guessedKeys, missing);
  runScenario6(vercel.companyName, vercel.metrics ?? {}, inputs, guessedKeys, missing);
  return missing;
}

const chime = await loadCompany('chime');
const vercel = await loadCompany('vercel');
runChimeScenarios(chime);
runVercelScenarios(vercel);
console.log('(?) = conservative guessed number');
