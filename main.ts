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
export class BarHistory {
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
function toFourHour(eur:BarData[]){
    let history = new BarHistory('4H', eur)
    for(var i = 2; i <eur.length; i+4){
    
        history.data[i].close = history.data[i].close
        history.data[i].date = history.data[i+3].date
        if(history.data[i].high > history.data[i-4].high){
            history.data[i].high = history.data[i].high
        }else{
            history.data[i].high = history.data[i+4].high
        }
        if(history.data[i].low > history.data[i+4].low){
            history.data[i].low = history.data[i+4].low
        }else{
            history.data[i].low = history.data[i].low
        }
    }
    console.log(history.data)
  
}
  console.log(toFourHour(eur))
}).catch((error) => {
    console.error(error);
});
