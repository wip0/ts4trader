import * as path from 'path';
import {Portfolio} from './lib/portfolio';
////////////////////////////////////////////////////////////////////////////////////////////////////
const INPUT_FILE = './input/data.json';
let fullPathFile: string = path.resolve(process.cwd(), INPUT_FILE);

main();
////////////////////////////////////////////////////////////////////////////////////////////////////
function main() {
    let portfolio: Portfolio = new Portfolio();
    if (!portfolio.loadFromFile(fullPathFile)) {
        console.log(`Cannot load from file: ${fullPathFile}`);
        return;
    }

    let value: number = portfolio.getNetWorth();
    console.log(`Net worth: ${value}`);
    console.log(`Cash: ${portfolio.cash}`);

    let lossStocks: Stock[] = portfolio.getAllLossStock();
    // todo: show all loss stocks detail
}
