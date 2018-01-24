import { url } from "inspector";

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install();
let page:number = 1;
const request = require("request");
///////////////////////////////////////////////////////////////////////////////////////////

const hostUrl = 'http://api.worldbank.org/v2/';
const countryApiUrl = `${hostUrl}/countries?page=`+ page;
let data:string= ''
// https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-api-country-queries


let promiseToGetData = new Promise(function(resolve, reject){

    var url: string = "http://api.worldbank.org/v2/countries?page=" + page + "&format=json";
    for(page =1; page<=7; page++){
    
    request.get(url)
    .on('response', (res) => {
        console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`);
    })    

    .on('data', (buf:Buffer) => {
        data += buf;
    })
    
    .on('end', () => {
        data.concat(data.toString())
    
    })
    }
    if (page=7){
        resolve();
    }else{
        reject();
    }

    
});

promiseToGetData.then(function(fromResolve){
    console.log(`Data: ${data}`);
})


/*
request.get(url)
    .on('response', (res) => {
    console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`);
   
})
    .on('data', (buf:Buffer) => {
    data += buf;
})
    .on('end', () => {
    data = JSON.parse(data);
    //const data: string = buf.toString();
    console.log(`Data: ${data}`);
    let arrayOfmyObj = data;
    // arrayofmyobj length
    console.log(arrayOfmyObj.length);
    for (var i = 0; i < arrayOfmyObj.length; i++) {
        var object = arrayOfmyObj[i];
        console.log(object);
        for (var j = 0; j < object.length; j++) {
            var incomeLevel = object[j];
            //console.log(incomeLevel)
            if (incomeLevel.incomeLevel.value == 'Upper middle income') {
                console.log(`${incomeLevel.incomeLevel.value} : ${object[j].name}`);
            }
        }
    }
})

    .on('error', (error) => {
    console.error(error.message || error);
});
//# sourceMappingURL=main.js.map