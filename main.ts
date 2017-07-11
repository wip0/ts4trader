import * as fs from 'fs';
import * as path from 'path';

// Read data from file
const INPUT_FILE = './input/data.json';
let fullPathFile: string = path.resolve(process.cwd(), INPUT_FILE);

try {
    let text = fs.readFileSync(fullPathFile, 'utf-8');
    let data: any = JSON.parse(text);
    
    // print data
    console.log('print data');
    //console.log(data);
    console.log(data); 

    let stocks: any[] = data.stocks;
    let numStock: number = stocks.length; 
    console.log(`We have ${numStock} stocks in our portfolio.` );

    // todo: Calculate profit/loss of our portfolio
    var profit =0;
    for (let i = 0; i < numStock; ++i) {
        let stock = stocks[i];
        profit += (stock.price - stock.cost)*stock.amount;// console.log(stock);
    }
    console.log('Total P/L is ' + profit);
} catch (error) {
    console.error(error);
}
