import * as fs from 'fs';
import * as path from 'path';
////////////////////////////////////////////////////////////////////////////////////////////////////
interface Stock {
    name: string;
    cost: number;
    amount: number;
    price: number;
}

interface Fx {
    name: string;
    action: string;
    cost: number;
    amount: number;
    bid: number;
    ask: number;
}

function calculateFromStock(stocks: Stock[]): number {
    let net: number = 0;
    for (let stock of stocks) {
        // todo: Calculate profit/loss
    }
    return net;
}

// todo: Add a new function to calculate from Fx

////////////////////////////////////////////////////////////////////////////////////////////////////
// Read data from file
const INPUT_FILE = './input/data.json';
let fullPathFile: string = path.resolve(process.cwd(), INPUT_FILE);

try {
    let text = fs.readFileSync(fullPathFile, 'utf-8');
    let data: any = JSON.parse(text);
    
    // print data
    //console.log(data);

    let stocks: Stock[] = <Stock[]> data.stocks;
    let fxs: Fx[] = <Fx[]> data.fxs;

    // todo: Calculate profit/loss of our portfolio
    // calculateFromStock(stocks);

} catch (error) {
    console.error(error);
}
