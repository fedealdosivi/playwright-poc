import { Page } from "playwright";
import v8toIstanbul from 'v8-to-istanbul';
import libCoverage from 'istanbul-lib-coverage';
import libReport from 'istanbul-lib-report';
import reports from 'istanbul-reports';
import { promises as fs } from 'fs';

let globalCoverageMap = libCoverage.createCoverageMap();

export async function saveV8Coverage(page: Page): Promise<void> {
    const coverage = await page.coverage.stopJSCoverage();
    console.log("Coverage data length:", coverage.length);
    
    for (const entry of coverage) {
        if (entry.url === '' || entry.url.includes('cloudfront.net')) {
            continue;
        }
        const scriptPath = entry.url;
        const converter = v8toIstanbul(scriptPath, 0, { source: entry.source }, (filepath) => {
            const normalized = filepath.replace(/\\/g, '/');
            const ret = normalized.includes('node_modules/');
            return ret;
        });
        
        try {
            await converter.load();
            converter.applyCoverage(entry.functions);
            const data = converter.toIstanbul();
            console.log("Global coverage map data:", globalCoverageMap.data);
            globalCoverageMap.merge(data);  // Merge with global map
        } catch (error) {
            console.error(`Error processing entry ${entry.url}:`, error);
        }
    }
}

export async function finalizeCoverage() {
    await fs.rm('coverage', { force: true, recursive: true });
    const context = libReport.createContext({ coverageMap: globalCoverageMap });
    reports.create('html').execute(context);
    reports.create('lcovonly').execute(context);
}

