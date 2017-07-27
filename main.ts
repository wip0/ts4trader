import * as fs from 'fs';
import * as path from 'path';

const csv = require('fast-csv');
////////////////////////////////////////////////////////////////////////////////
interface HistoricalData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

let eurusd: HistoricalData[] = [];
// Read data from file
const INPUT_FILE = './input/EURUSD.csv';
let fullPathFile: string = path.resolve(__dirname, INPUT_FILE);
csv.fromPath(INPUT_FILE, { headers: true}).on('data', (data: any) => {
    //console.log(data);
    eurusd.push(<HistoricalData> data);
}).on('end', () => {
    //console.log('done');
    // todo: Find the max value and min value from the loaded historical data  
}).on('error', (error) => {
    console.log(error);
});
