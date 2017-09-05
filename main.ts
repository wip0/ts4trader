import * as fs from 'fs';
import * as path from 'path';

const csv = require('fast-csv');
////////////////////////////////////////////////////////////////////////////////
interface HistoricalData {
    Date: string;
    Open: number;
    High: number;
    Low: number;
    Close: number;
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
let EURUSD = data; 
function findMaxDate():string{
    let max: number = 0;
    let index:string = '';
    for (let i of EURUSD){
    if( i.High > max){max = i.High;
        index = i.Date;}
    }
    return index; 
}
function findMax():number{
    let max: number = 0;
    for (let i of EURUSD){
        if (i.High > max){
        max = i.High;
        }
    }
    return max;
}
console.log("the price is maximum when: " +  findMaxDate() + " at " + findMax());// todo: Find when the price is the maximum value
}).catch((error: any) => {
    console.error(error);
});
