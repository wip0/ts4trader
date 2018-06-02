import { url } from "inspector";
import { error } from "util";
/*var request = require("request");
var userDetails;

function initialize() {
    // Setting URL and headers for request
    var options = {
        url: 'https://api.github.com/users/narenaryan',
        headers: {
            'User-Agent': 'request'
        }
    };
    // Return new promise 
    return new Promise(function(resolve, reject) {
    	// Do async job
        request.get(options, function(err, resp, body) {
            if (err) {
                reject(err);
            } else {
                resolve(JSON.parse(body));
            }
        })
    })

}

function main() {
    var initializePromise = initialize();
    initializePromise.then(function(result) {
        userDetails = result;
        console.log(userDetails)
        console.log("----------");
        console.log("----------");
        console.log("----------");
        console.log("THIS WORD MUST BE WAIT TILL GET RESULT FROM URL");
        console.log("----------");
        // Use user details from here        
    }, function(err) {
        console.log(err);
    })
}

main();
*/
/* 
const https = require("https");
const request = require("request");
const fs = require("fs");
let body:string = '';
let urls = ["https://api.worldbank.org/v2/countries?page=1&format=json"
,"https://api.worldbank.org/v2/countries?page=2&format=json",
"https://api.worldbank.org/v2/countries?page=3&format=json",
"https://api.worldbank.org/v2/countries?page=4&format=json",
"https://api.worldbank.org/v2/countries?page=5&format=json",
"https://api.worldbank.org/v2/countries?page=6&format=json",
"https://api.worldbank.org/v2/countries?page=7&format=json"]
function loadPage(){
    return new Promise(function(resolve,reject){
    urls.forEach(function(url){
    request.get(url, function(err,resp, data) {
      
        //.on('data', data=>
        if(err){
            reject (err)
        }
        else{
        resolve(body += data ) ;
        //.on('end',() => {resolve(body) });
        
        }
    });
    
    //console.log('\n\n------------\n\n')})
    })
})
}
function main(){
    var initializePromise = loadPage()
    initializePromise.then(function(resolve){
    fs.writeFile("data.txt",resolve,function(err){
       if(err) return console.log(err);
    console.log('successful')
    console.log(body)


   let arrayOfmyObj = JSON.parse(body);
    // arrayofmyobj length
    console.log(arrayOfmyObj.length);
    for (var i = 0; i < arrayOfmyObj.length; i++) {
        var object = arrayOfmyObj[i];
        //console.log(object);
        for (var j = 0; j < object.length; j++) {
            var incomeLevel = object[j];
            //console.log(incomeLevel)
            if (incomeLevel.incomeLevel.value == 'Low income') {
                console.log(`${incomeLevel.incomeLevel.value} : ${object[j].name}`);
            }
        }
    }
}) 

    })
    }
}

   
main()
*/

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install();
let page:number = 1;
const request = require("request");
///////////////////////////////////////////////////////////////////////////////////////////

const hostUrl = 'http://api.worldbank.org/v2/';
const countryApiUrl = `${hostUrl}/countries?page=`+ page;
let data1:string = ''
let data2:string = ''
let data3:string = ''
let data4:string = ''
let data5:string = ''
let data6:string = ''
let data7:string = ''
// https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-api-country-queries


function promiseToGetData1():Promise<string>{

    return new Promise(function(resolve, reject){

    var url: string = "http://api.worldbank.org/v2/countries?page=1&format=json";
    
    request.get(url)
    .on('response', (res:Response) => {
        //console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`);
        
    })    

    .on('data', (buf:Buffer) => {
       data1 += buf;
    })
    .on('end',()=>{
        resolve(data1);
    })
    .on('error',(error:Error)=>{
        console.error(error.message || error);
    }) 
});
}
///////////////////////
function promiseToGetData2():Promise<string>{
    return new Promise(function(resolve, reject){

    var url: string = "http://api.worldbank.org/v2/countries?page=2&format=json";
    
    request.get(url)
    .on('response', (res:Response) => {
        //console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`);
        
    })    

    .on('data', (buf:Buffer) => {
        data2 += buf;
    })
    .on('end',()=>{
        resolve(data2);
    })
    .on('error',(error:Error)=>{
        console.error(error.message || error);
    })
});
}
////////////////////////

 function promiseToGetData3():Promise<string>{
     return new Promise(function(resolve, reject){

    var url: string = "http://api.worldbank.org/v2/countries?page=3&format=json";
    
    request.get(url)
    .on('response', (res:Response) => {
        //console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`);
        
    })    

    .on('data', (buf:Buffer) => {
        data3 += buf;
    })
    
    .on('end', () => {
        resolve(data3)
    })
    .on('error',(error:Error)=>{
        console.error(error.message || error);
    })
     
});

}
//////////////////////
function promiseToGetData4():Promise<string>{
    return new Promise(function(resolve, reject){

    var url: string = "http://api.worldbank.org/v2/countries?page=4&format=json";
    
    request.get(url)
    .on('response', (res:Response) => {
        //console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`);
        
    })    

    .on('data', (buf:Buffer) => {
        data4 += buf;
    })
    
    .on('end', () => {
        resolve(data4)
    })
    .on('error',(error:Error)=>{
        console.error(error.message || error);
    })
});

}

////////////////////////////////////
function promiseToGetData5():Promise<string>{
    return new Promise(function(resolve, reject){
    
    var url: string = "http://api.worldbank.org/v2/countries?page=5&format=json";
    
    request.get(url)
    .on('response', (res:Response) => {
        //console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`);
        
    })    

    .on('data', (buf:Buffer) => {
        data5 += buf;
    })
    .on('end',()=>{
        resolve(data5)
    })
    .on('eror',(error:Error)=>{
        console.error(error.message || error);
    })
});
}
////////////////
function promiseToGetData6():Promise<string>{
    return new Promise(function(resolve, reject){
    
    var url: string = "http://api.worldbank.org/v2/countries?page=6&format=json";
    
    request.get(url)
    .on('response', (res:Response) => {
        //console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`);
        
    })    

    .on('data', (buf:Buffer) => {
        data6 += buf;
    })
    .on('end',()=>{
        resolve(data6)
    })
    .on('error', (error:Error)=>{
        console.error(error.message || error);
        ;
    })
});
}

///////////////////////
function promiseToGetData7():Promise<string>{
    return new Promise(function(resolve, reject){
    
    var url: string = "http://api.worldbank.org/v2/countries?page=7&format=json";
    
    request.get(url)
    .on('response', (res:Response) => {
        //console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`);
        
    })    

    .on('data', (buf:Buffer) => {
        data7 += buf;
    })
    .on('end',()=>{
        resolve(data7);
    })    
    .on('error', (error:Error)=>{
        console.error(error.message || error);
    })
});
}
promiseToGetData1().then(function(data1){
    
    let arrayOfmyObj = JSON.parse(data1);
    // arrayofmyobj length
   //console.log(arrayOfmyObj.length);
    for (var i = 0; i < arrayOfmyObj.length; i++) {
        var object = arrayOfmyObj[i];
        //console.log(object);
        for (var j = 0; j < object.length; j++) {
            var incomeLevel = object[j];
            //console.log(incomeLevel)
            if (incomeLevel.incomeLevel.value == 'Upper middle income') {
                console.log(`${incomeLevel.incomeLevel.value} : ${object[j].name}`);
            }
        }
    }
})
promiseToGetData2().then(function(data2){
    let arrayOfmyObj = JSON.parse(data2);
    
    // arrayofmyobj length
    //console.log(arrayOfmyObj.length);
    for (var i = 0; i < arrayOfmyObj.length; i++) {
        var object = arrayOfmyObj[i];
        //console.log(object);
        for (var j = 0; j < object.length; j++) {
            var incomeLevel = object[j];
            //console.log(incomeLevel)
            if (incomeLevel.incomeLevel.value == 'Upper middle income') {
                
                console.log(`${incomeLevel.incomeLevel.value} : ${object[j].name}`);
            }
        }
    }
})
promiseToGetData3().then(function(data3){
    let arrayOfmyObj = JSON.parse(data3);
    for(var i:number = 0; i < arrayOfmyObj.length;i++){
        var object = arrayOfmyObj[i];
        for(var j:number = 0; j < object.length; j++){
            var incomeLevel = object[j];
            if(incomeLevel.incomeLevel.value == 'Upper middle income'){
                console.log(`${incomeLevel.incomeLevel.value} : ${object[j].name}`);
            }
        }
    }
})
promiseToGetData4().then(function(data4){
    let arrayOfmyObj = JSON.parse(data4);
    for(var i:number = 0; i < arrayOfmyObj.length;i++){
        var object = arrayOfmyObj[i];
        for(var j:number = 0; j < object.length; j++){
            var incomeLevel = object[j];
            if(incomeLevel.incomeLevel.value == 'Upper middle income'){
                console.log(`${incomeLevel.incomeLevel.value} : ${object[j].name}`);
            }
        }
    }
})
promiseToGetData5().then(function(data5){
    let arrayOfmyObj = JSON.parse(data5);
    for(var i:number = 0; i < arrayOfmyObj.length;i++){
        var object = arrayOfmyObj[i];
        for(var j:number = 0; j < object.length; j++){
            var incomeLevel = object[j];
            if(incomeLevel.incomeLevel.value == 'Upper middle income'){
                console.log(`${incomeLevel.incomeLevel.value} : ${object[j].name}`);
            }
        }
    }
})
promiseToGetData6().then(function(data6){
    let arrayOfmyObj = JSON.parse(data6);
    for(var i:number = 0; i < arrayOfmyObj.length;i++){
        var object = arrayOfmyObj[i];
        for(var j:number = 0; j < object.length; j++){
            var incomeLevel = object[j];
            if(incomeLevel.incomeLevel.value == 'Upper middle income'){
                console.log(`${incomeLevel.incomeLevel.value} : ${object[j].name}`);
            }
        }
    }
})
promiseToGetData7().then(function(data7){
    let arrayOfmyObj = JSON.parse(data7);
    for(var i:number = 0; i < arrayOfmyObj.length;i++){
        var object = arrayOfmyObj[i];
        for(var j:number = 0; j < object.length; j++){
            var incomeLevel = object[j];
            if(incomeLevel.incomeLevel.value == 'Upper middle income'){
                console.log(`${incomeLevel.incomeLevel.value} : ${object[j].name}`);
            }
        }
    }
})
//# sourceMappingURL=main.js.map*/