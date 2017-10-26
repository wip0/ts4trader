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
        csv.fromPath(filename, { headers: true}).on("data", (data: HistoricalData) => {
            prices.push(data);
        }).on('end', () => {
            //console.log(prices)
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
        total += Number(eur[i].close); 
    }
    return total/data[0].length;
}   
function getAverageJpy(jpy: HistoricalData[]):number{
    let total:number = 0;
    for(var i = 0 ;  i < data[1].length ; i++){
        total +=Number(jpy[i].close); 
    }
    return total/data[1].length;
}   
/////////////////////////////////////////////
function getSdEur(eur: HistoricalData[]):number{
    let sum:number = 0;
    for(var i = 0; i< data[0].length; i++){
        sum += Math.pow(Math.abs(Number(eur[i].close) - getAverageEur(eur)),2)
    }
    let sdEur:number ;
    return sdEur = Math.sqrt(sum / data[0].length)
}
function getSdJpy(jpy: HistoricalData[]):number{
    let sum:number = 0;
    for(var i = 0; i< data[1].length; i++){
        sum += Math.pow(Math.abs(Number(jpy[i].close) - getAverageEur(jpy)),2)
    }
    let sdJpy:number ;
    return sdJpy = Math.sqrt(sum / data[1].length)
}
//////////////////////////////////////////////////////
function covariance(eur: HistoricalData[], jpy: HistoricalData[]) : number{
    let sum:number = 0
    for(var i = 0; i < data[1].length; i++){
        sum +=  ((Number(eur[i].close) - getAverageEur(eur)) * (Number(jpy[i].close) - getAverageJpy(jpy)))
    }
    return sum 
}
function corr(eur:HistoricalData[], jpy:HistoricalData[]):number{
    return (covariance(eur,jpy)/(getSdEur(eur)*getSdJpy(jpy)))/data[0].length

}
  //console.log(" the eur average is " + getAverageEur(eur));
  //console.log(" the eur sd is " + getSdEur(eur));
  //console.log(" the jpy average is " + getAverageJpy(jpy));
  //console.log(" the jpy sd is " + getSdJpy(jpy));
  //console.log(" the covariance of eurjpy is" + covariance(eur, jpy));
  console.log(" the correlation between eur&jpy is " + corr(eur,jpy).toFixed(2)  )
}).catch((error) => {
    console.error(error);
});