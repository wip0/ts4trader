import * as fs from 'fs';
import * as path from 'path';

const csv = require('fast-csv');
////////////////////////////////////////////////////////////////////////////////
interface HistoricalData {
    date: string;
    open: number;
    High: number;
    Low: number;
    close: number;
}

let eurusd: HistoricalData[] = [];
// Read data from file
const INPUT_FILE = './input/EURUSD.csv';
let fullPathFile: string = path.resolve(__dirname, INPUT_FILE);
csv.fromPath(INPUT_FILE, { headers: true}).on('data', (data: any) => {
    console.log(data);//console.log(data);
    eurusd.push(<HistoricalData> data);
}).on('end', () => {
    console.log('done');//console.log('done');
function findMax():number{
    let max: number = 0;
    for (let i of eurusd){
    if( i.High > max){max = i.High}
    }
    return max; 
}

function findMin():number{
    let min: number = 100;
    for (let i of eurusd){
    if( i.Low < min){min = i.Low;}
    }
    return min; 
}

   console.log ("highest value is: "+ findMax());
   console.log("lowest value is: " + findMin()); // todo: Find the max value and min value from the loaded historical data  
}).on('error', (error:any) => {
    console.log(error);
});
