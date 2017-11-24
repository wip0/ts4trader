require('source-map-support').install();
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
    let eur = data[0] ;
    let jpy = data[1];

    // now we have 1H data
    // todo: create BarHistory for 4H and 1D timeframe
//////////////////////////////////////////////////

function toFourHour(eur:BarHistory):BarHistory{
    let bar4Hs: BarData[] = [];
    for(let i = 0,b = 0 ; i < eur.data.length; i += 4, b += 4) { // todo: fix the loop
        let bar1H = eur.data[i];
      

        // todo: Convert 1H to 4H
        let date4H = bar1H.date;
        let open4H = bar1H.open;
        let close4H = bar1H.close;
        let high4H = bar1H.high;
        let low4H = bar1H.low;
        console.log(' - idx: ' + i + ' Date: ' + bar1H.date);
        let bar4H: BarData = {
            date: date4H,
            open: open4H,
            high: high4H,
            low: low4H,
            close: close4H,
        };
        ////////////////open///////////////
        let open:number = 0;
        for(let z = i ; z < b + 4; z ++){
            open = eur.data[z].open;
        } 
         bar4H.open = open    
         //////////////close/////////////

         bar4H.close= bar1H.close 
         /////////////date///////////////

         bar4H.date = bar1H.date
         ////////////high////////////////

         let max:number = 0;
         for(let j = i; j < b + 4; j++){
              if( eur.data[j].high > max){
              max = eur.data[j].high;
              }
              else{
                 max = max
              }
        bar4H.high = max;
            }
        
         /////////////low////////////////
         let min:number = 1000;
         for(let k = i; k < b + 4; k++){
            if(eur.data[k].low < min){
                min = eur.data[k].low;
            }
            else{
                min = min;
            }
            bar4H.low = min;
         }

        bar4Hs.push(bar4H);       
       
    }
    return new BarHistory('4H', bar4Hs)
}
console.log(toFourHour(eur))
}).catch((error) => {
    console.error(error);
});

