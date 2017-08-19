import * as fs from 'fs';
import * as path from 'path';

const csv = require('fast-csv');
////////////////////////////////////////////////////////////////////////////////
interface BarData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
}

type TimeFrame = '1H' | '4H' | '1D';
class BarHistory {
    public readonly timeframe: TimeFrame;
    public readonly data: BarData[];

    constructor(timeframe: TimeFrame, data: BarData[]) {
        this.timeframe = timeframe;
        this.data = data;
    }
}

function loadHistoricalData(filename: string): Promise<BarHistory> {
    return new Promise<BarData[]>((resolve, reject) => {
        let prices: BarData[] = [];
        csv.fromPath(filename, { headers: true}).on('data', (data: BarData) => {
            prices.push(data);
        }).on('end', () => {
            resolve(prices);
        }).on('error', (error: any) => {
            reject(error);
        })
    }).then((data: BarData[]) => {
        // promise chain
        return new BarHistory('1H', data);
    });
}
////////////////////////////////////////////////////////////////////////////////
const eurFile = './input/EURUSD.csv';
const jpyFile = './input/USDJPY.csv';

let inputFiles: string[] = [ eurFile, jpyFile ].map((file) => {
    return path.resolve(process.cwd(), file);
});
// todo: check inputFiles value

let promises = inputFiles.map((file) => {
    return loadHistoricalData(file);
});

// now we would like to load both files in parallel
Promise.all(promises).then((data: BarHistory[]) => {
    // here both of them are finish
    let eur = data[0];
    let jpy = data[1];

    // now we have 1H data
    // todo: create BarHistory for 4H and 1D timeframe

    
}).catch((error) => {
    console.error(error);
});
