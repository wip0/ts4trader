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
///////////////////////////////////////
function getAverageEur(eur: HistoricalData[]):number{
    let total:number = 0;
    for(var i = 0 ;  i < data[0].length; i++){
        total +=eur[i].close; 
    }
    return total/data[0].length;
}   
function getAverageJpy(jpy: HistoricalData[]):number{
    let total:number = 0;
    for(var i = 0 ;  i < data[1].length ; i++){
        total +=jpy[i].close; 
    }
    return total/data[1].length;
}   
/////////////////////////////////////////////
function getSdEur(eur: HistoricalData[]):number{
    let sum:number = 0;
    for(var i = 0; i< data[0].length; i++){
        sum += Math.pow(Math.abs(eur[i].close - getAverageEur(eur)),2)
    }
    let sdEur:number ;
    return sdEur = Math.sqrt(sum / data[0].length)
}
function getSdJpy(jpy: HistoricalData[]):number{
    let sum:number = 0;
    for(var i = 0; i< data[1].length; i++){
        sum += Math.pow(Math.abs(jpy[i].close - getAverageEur(jpy)),2)
    }
    let sdJpy:number ;
    return sdJpy = Math.sqrt(sum / data[1].length)
}
//////////////////////////////////////////////////////
function covariance(eur: HistoricalData[], jpy: HistoricalData[]) : number{
    let sum:number = 0
    for(var i = 0; i < data[1].length; i++){
        sum +=  (eur[i].close - getAverageEur(eur)) * (jpy[i].close - getAverageJpy(jpy))
    }
    return sum 
}
function corr(eur:HistoricalData[], jpy:HistoricalData[]):number{
    return covariance(eur,jpy)/getSdEur(eur)*getSdJpy(jpy)

}
  console.log(" the correlation between eur&jpy is " + corr(eur,jpy))  
}).catch((error) => {
    console.error(error);
});

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