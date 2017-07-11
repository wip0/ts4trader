import * as path from 'path';
import {Portfolio, Stock} from './lib/portfolio';
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

    let mostStock: Stock | null = portfolio.getTheMostPositionInStock();
    if (mostStock) {
        let worth = mostStock.getWorth();
        console.log(`Most stock: ${mostStock.name} Worth: ${worth}`);
    } else {
        console.log('No stock in portfolio');
    }
}
