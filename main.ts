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
/*
function correlation(eur,jpy){
    return covariance(eur,jpy) / getSd(eur)*getSd(jpy)
}*/
function getAverage(data: Array<HistoricalData[]>){
    let total:number = 0;
    for(var i = 0 ;  i < data[].close.length ; i++){
        total +=data[].close; 
    }
    return total/data[].length;
}   
/*
function getSd(data:[]){
    let avg:number = getAverage(data[]);
    let squareDiffs:number = data[].map(function(data){
        let diff:number = value - avg;
        let sqrDiff: number = diff * diff;
        return sqrDiff
    });

    let avgSquareDiff: number = getAverage(squareDiffs);
    let stdDev = Math.sqrt(avgSquareDiff);
    return stdDev

}

function covariance(data:[]){
    let eurDiff:number = data[].forEach(element => {
        element - getAverage(data[])
        });
    let jpyDiff:number = data[1.forEach(element => {
        element = getAverage(data[1])
    });

    let sumProduct: number = eurDiff * jpyDiff;
    return sumProduct/(data[1].length -1)

};
const numbers = [10, 20, 30, 40]
const result = numbers.reduce((sum,number) => {
  return sum+number
}, 0)
console.log(result) // 100

const numbers = [20, 30, 40, 60]
let result = numbers
   .map((number) => number * 2)
   .reduce((sum, number) => sum + number)
console.log(result) // 300
*/
    
}).catch((error) => {
    console.error(error);
});
