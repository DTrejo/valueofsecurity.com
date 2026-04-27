# Security Value

## Project layout
- `src/` contains source files (`src/index.html`, `src/styles.input.css`).
- Project root contains built artifacts (`index.html`, `styles.css`) so the same branch can be served directly by GitHub Pages.

## Local development
- `npm start` runs file watchers and serves the project root.
- `npm run build` rebuilds root artifacts from `src/`.

## Adding/updating new company 10k data
1. Find latest 10k https://www.sec.gov/edgar/search/#/q=CHYM&dateRange=1y&filter_forms=10-K
2. View filing detail, e.g. https://www.sec.gov/Archives/edgar/data/1795586/000179558626000013/0001795586-26-000013-index.html
3. Open iXBRL e.g. https://www.sec.gov/ix?doc=/Archives/edgar/data/1795586/000179558626000013/chym-20251231.htm
4. Menu > Save XBRL zip
5. Move unzipped contents to docs/$company/xbrl/