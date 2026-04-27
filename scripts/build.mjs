import { readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { load } from 'cheerio';
import renderToString from 'preact-render-to-string';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, '../index.html');
const indexSource = await readFile(outputPath, 'utf8');
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

await writeFile(outputPath, output, 'utf8');

console.log(`Built ${outputPath}`);
