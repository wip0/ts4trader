import * as fs from 'fs';
import * as path from 'path';

// Read data from file
const INPUT_FILE = './input/data.json';
let fullPathFile: string = path.resolve(process.cwd(), INPUT_FILE);

try {
    let text = fs.readFileSync(fullPathFile, 'utf-8');
    let data: any = JSON.parse(text);
    
    // print data
    console.log(data);//console.log(data);

    console.log(`We have ${data.name} in our portfolio.` );

    console.log('Portfolio P/L is ' + (data.price - data.cost)*data.amount);// todo: Calculate profit/loss from data
} catch (error) {
    console.error(error);
}
