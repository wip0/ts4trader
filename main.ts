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
    lot: number;
    bid: number;
    ask: number;
}

function calculateFromStock(stocks: Stock[]): number {
    let net: number = 0;
    for (let stock of stocks) {
        net += (stock.price-stock.cost)*stock.amount;    // todo: Calculate profit/loss
    }
    return net;
}

function calculateFromFx(fxs: Fx[]): number{
    let fxnet: number = 0;
    for (let fx of fxs){
        switch(fx.action) {
            case "long":{
                fxnet += (fx.bid - fx.cost)*fx.lot*10000;
                break;
            }
            case "short":{
                fxnet += (fx.cost - fx.ask)*fx.lot*10000;
                break;
        }
    }
}
    return fxnet;
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
    console.log(data);//console.log(data);

    let stocks: Stock[] = <Stock[]> data.stocks;
    let fxs: Fx[] = <Fx[]> data.fxs;

    // todo: Calculate profit/loss of our portfolio
   console.log('P/L from Stock is ',calculateFromStock(stocks));
   console.log('P/L from FX is ', calculateFromFx(fxs));
   console.log('Total P/L of our portfolio is ', calculateFromStock(stocks)+calculateFromFx(fxs));

} catch (error) {
    console.error(error);
}

