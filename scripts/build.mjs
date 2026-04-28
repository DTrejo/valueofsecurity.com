import { copyFile, mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { load } from 'cheerio';
import renderToString from 'preact-render-to-string';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourcePath = path.resolve(__dirname, '../src/index.html');
const outputDirectoryPath = path.resolve(__dirname, '../gh-pages');
const outputPath = path.resolve(outputDirectoryPath, 'index.html');
const companyMetricsPath = path.resolve(__dirname, '../company-metrics');
const companyDataOutputPath = path.resolve(outputDirectoryPath, 'company-data');
const sourceTemplate = await readFile(sourcePath, 'utf8');
const companyNameSlugEntries = await (async function readCompanyNameSlugEntries() {
  const entries = await readdir(companyMetricsPath, { withFileTypes: true });
  const companyEntries = [];

  for (const entry of entries) {
    if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
    const filePath = path.resolve(companyMetricsPath, entry.name);
    const fileRaw = await readFile(filePath, 'utf8').catch(() => null);
    if (!fileRaw) continue;

    let parsed;
    try {
      parsed = JSON.parse(fileRaw);
    } catch {
      continue;
    }

    if (!parsed || typeof parsed !== 'object') continue;
    if (typeof parsed.companyName !== 'string' || parsed.companyName.trim().length === 0) continue;
    const slug = path.basename(entry.name, '.json').trim().toLowerCase();
    if (!/^[a-z0-9-]+$/.test(slug)) continue;

    companyEntries.push({
      name: parsed.companyName.trim(),
      slug,
    });
  }

  companyEntries.sort((a, b) => a.name.localeCompare(b.name));
  return companyEntries;
})();

if (!sourceTemplate.includes('__COMPANY_NAME_SLUG__')) {
  throw new Error('Could not find __COMPANY_NAME_SLUG__ placeholder in src/index.html');
}

const indexSource = sourceTemplate.replace('__COMPANY_NAME_SLUG__', JSON.stringify(companyNameSlugEntries));
await mkdir(outputDirectoryPath, { recursive: true });
await mkdir(companyDataOutputPath, { recursive: true });

const companyDataOutputEntries = await readdir(companyDataOutputPath, { withFileTypes: true }).catch(() => []);
for (const entry of companyDataOutputEntries) {
  if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
  await unlink(path.resolve(companyDataOutputPath, entry.name)).catch(() => {});
}

const companyMetricEntries = await readdir(companyMetricsPath, { withFileTypes: true });
for (const entry of companyMetricEntries) {
  if (!entry.isFile() || !entry.name.endsWith('.json')) continue;
  const sourceFilePath = path.resolve(companyMetricsPath, entry.name);
  const outputFilePath = path.resolve(companyDataOutputPath, entry.name);
  await copyFile(sourceFilePath, outputFilePath);
}

const existingOutput = await readFile(outputPath, 'utf8').catch(() => null);
const $ = load(indexSource);

const appModuleElement = $('script#app-module[type="module"]').first();
if (!appModuleElement.length) {
  throw new Error('Could not find <script type="module" id="app-module"> in index.html');
}

const appModuleSource = appModuleElement.text();
const tempModulePath = path.resolve(__dirname, '.app-module.build.mjs');
await writeFile(tempModulePath, appModuleSource, 'utf8');

let appModule;
try {
  globalThis.COMPANY_NAME_SLUG = companyNameSlugEntries;
  const tempModuleUrl = `${pathToFileURL(tempModulePath).href}?t=${Date.now()}`;
  appModule = await import(tempModuleUrl);
} finally {
  await unlink(tempModulePath).catch(() => {});
}

if (typeof appModule.renderApp !== 'function') {
  throw new Error('Expected app-module to export renderApp()');
}

const appElement = $('#app').first();
if (!appElement.length) {
  throw new Error('Could not find #app in index.html');
}

const prerenderedApp = renderToString(appModule.renderApp());
appElement.empty().append(prerenderedApp);
const output = $.html();

if (output !== existingOutput) {
  await writeFile(outputPath, output, 'utf8');
  console.log(`Built ${outputPath}`);
} else {
  console.log(`No changes for ${outputPath}`);
}
