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
const eurFile = './input/EURUSD.csv';
const jpyFile = './input/USDJPY.csv';

let inputFiles: string[] = [ eurFile, jpyFile ].map((file) => {
    return path.resolve(process.cwd(), file);
});
inputFiles.forEach(element => {
    console.log(element);
    
});
// todo: check inputFiles value

let promises = inputFiles.map((file) => {
    return loadHistoricalData(file);
});

// now we would like to load both files in parallel
Promise.all(promises).then((data: Array<HistoricalData[]>) => {
    // here both of them are finish
    let eur = data[0];
    let jpy = data[1];

    // todo: Find correlation between eur and jpy

    
}).catch((error) => {
    console.error(error);
});
