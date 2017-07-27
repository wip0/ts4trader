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

function loadHistoricalData(filename: string): Promise<HistoricalData[]> {
    return new Promise<HistoricalData[]>((resolve, reject) => {
        let prices: HistoricalData[] = [];
        csv.fromPath(filename, { headers: true}).on('data', (data: HistoricalData) => {
            prices.push(data);
        }).on('end', () => {
            resolve(prices);
        }).on('error', (error: any) => {
            reject(error);
        })
    });
}
////////////////////////////////////////////////////////////////////////////////
// Read data from file
const INPUT_FILE = './input/EURUSD.csv';
let fullPathFile: string = path.resolve(__dirname, INPUT_FILE);
loadHistoricalData(fullPathFile).then((data: HistoricalData[]) => {
    // todo: Find when the price is the maximum value
}).catch((error: any) => {
    console.error(error);
});
