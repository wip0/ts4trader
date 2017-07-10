import * as fs from 'fs';
import * as path from 'path';

// Read data from file
const INPUT_FILE = './input/data.json';
let fullPathFile: string = path.resolve(process.cwd(), INPUT_FILE);

try {
    let text = fs.readFileSync(fullPathFile, 'utf-8');
    let data: any = JSON.parse(text);
    
    // print data
    //console.log(data);

    let stocks: any[] = data.stocks;
    let numStock: number = stocks.length; 
    console.log(`We have ${numStock} stocks in our portfolio.` );

    // todo: Calculate profit/loss of our portfolio
    for (let i = 0; i < numStock; ++i) {
        let stock = stocks[i];
        // console.log(stock);
    }
} catch (error) {
    console.error(error);
}
