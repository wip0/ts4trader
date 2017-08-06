import * as path from 'path';
import {Portfolio} from './lib/portfolio';
import {Stock} from './lib/asset';
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
    console.log('Stock Worth: ' + portfolio.getStockWorth());
    console.log('Fx Worth: ' + portfolio.getFxWorth());
    console.log(`Cash: ${portfolio.cash}`);
    console.log('invald:' + portfolio.getInvalid() );
    console.log(`Net worth: ${value}`);
    


    let lossStocks: Stock[] = portfolio.getAllLossStock();
    if (lossStocks.length === 0){
        console.log('You dont have any loss Stocks')
    }
    else{
        lossStocks.forEach((Stock) =>{
        console.log('Here are the loss stocks you have: ' + Stock.name + ' P/L :' + Stock.getWorth() );
        });// todo: show all loss stocks detail
}
}
