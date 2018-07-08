import { url } from "inspector";
import { error } from "util";
import { Buffer } from "buffer";
import { resolve } from "path";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install();

const request = require("request");
const incomeValue = 'High income'
///////////////////////////////////////////////////////////////////////////////////////////

//const hostUrl = 'http://api.worldbank.org/v2/countries?page='+ page + "&format=JSON";
//const countryApiUrl = `${hostUrl}/countries?page=`+ page + "&format=JSON";


///Function to extract data
function getWebSite(idx:number):Promise<string>{
    return new Promise(function(resolve,reject){
        let data:string = ''
        const hostUrl:string = 'http://api.worldbank.org/v2/countries?page='+ idx + "&format=JSON";
        request.get(hostUrl)
        .on('response', (res:Response)=>{
            //console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`)
        })
        .on('data', (buf:Buffer)=>{
            data += buf
        })
        .on('end', ()=>{
            resolve(data)
        })
    })

}


    
//Loop to use function    
let promises:Array<Promise<string>> = [];
for(let idx:number =1 ; idx<=10;idx++){
    promises.push(getWebSite(idx));
}

Promise.all(promises).then(results=>{
    return results.map(stringData=>{return JSON.parse(stringData)})
        .filter(array=>array[0].page<=array[0].pages)
        .map(array=>{return array[1]})
        .reduce((total,members)=>{return total.concat(members)})
        .filter(listOfCountries=>{return listOfCountries.incomeLevel.value == incomeValue})
        }).then(outs=>outs.forEach(countries=> {console.log(`${incomeValue} : ${countries.name}`)
    }))
                        
     

/*
Promise.all(promises).then(function(results){

    return results.filter(elem=> elem[1])
    let arrayofmyobj:Array<object> = result.map(x=>{return JSON.parse(x)})
    for (var i = 0; i < arrayofmyobj.length; i++) {
        var object:Array<object | any>= arrayofmyobj[i];
       // console.log(object);
        for (var j = 0; j < object.length; j++) {
            var countries = object[j];
           // console.log(countries)
            //console.log(countries.page)
            if(countries.page>countries.pages){
               return process.exit
            }
            else{
            for(var k = 0; k<countries.length; k++){
                 
                if (countries[k].incomeLevel.value == 'Upper middle income') {
                    console.log(`${countries[k].incomeLevel.value} : ${countries[k].name}`);
            }
        }
    }
    }
}
})
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


   
/*
// https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-api-country-queries

var urls = ["http://api.worldbank.org/v2/countries?page=1&format=json","http://api.worldbank.org/v2/countries?page=2&format=json"]
let promiseToGetWeb:Promise<string> = new Promise(function(resolve,reject){
    let data:string = ''
    urls.map(function(url){
        request.get(url)
        .on('response',(res:Response)=>{
            //console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`)
        })
        .on('data',(buf:Buffer)=>{
            data += buf
        })
        .on('end', ()=>{
            resolve(data)
        })
        .on('error',(error:Error)=>{
            console.error(error.message || error)
        })
        })
    })
promiseToGetWeb.then(function(result){
    let object1 = JSON.parse(result)
    console.log(object1)
})

 let promiseToGetData1:Promise<string> =

    new Promise(function(resolve, reject){
    let data1:string = ''

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
        // Object way :resolve(JSON.parse(data1))
    })
    .on('error',(error:Error)=>{
        console.error(error.message || error);
    }) 
});

///////////////////////
 let promiseToGetData2:Promise<string> =
    new Promise(function(resolve, reject){
    let data2:string = ''

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
        //Object way : resolve(JSON.parse(data2))
    })
    .on('error',(error:Error)=>{
        console.error(error.message || error);
    })
});


////////////////////////

 let promiseToGetData3:Promise<string> = 
     new Promise(function(resolve, reject){
    let data3:string = ''
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

//////////////////////
let promiseToGetData4:Promise<string> = new Promise(function(resolve, reject){
    let data4:string = ''
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


////////////////////////////////////
let promiseToGetData5:Promise<string> = new Promise(function(resolve, reject){
    let data5:string = ''
    
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

////////////////
let promiseToGetData6:Promise<string> =  new Promise(function(resolve, reject){
    let data6:string = ''
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

///////////////////////
let promiseToGetData7:Promise<string> = new Promise(function(resolve, reject){
    let data7= ''
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

let promises:Array<Promise<string>> = [promiseToGetData1,promiseToGetData2,promiseToGetData3,promiseToGetData4,promiseToGetData5,
promiseToGetData6,promiseToGetData7]
Promise.all(promises).then(function(result){
let arrayofmyobj:Array<object> = result.map(x=>{return JSON.parse(x)})
    for (var i = 0; i < arrayofmyobj.length; i++) {
        var object:Array<object | any>= arrayofmyobj[i];
        //console.log(object);
        for (var j = 0; j < object.length; j++) {
            var countries = object[j];
            console.log(countries)
            for(var k = 0; k<countries.length; k++){
                 
                if (countries[k].incomeLevel.value == 'High middle income') {
                    console.log(`${countries[k].incomeLevel.value} : ${countries[k].name}`);
            }
        }
    }
}
})
/*
Promise.all([promiseToGetData1,promiseToGetData2]).then(function(result){
    let arrayofmyobj:Array<object> = result
    for (var i = 0; i < arrayofmyobj.length; i++) {
        var object:Array<object | any>= arrayofmyobj[i];
        //console.log(object);
        for (var j = 0; j < object.length; j++) {
            var countries = object[j];
            console.log(countries)
            for(var k = 0; k<countries.length; k++){
                 
                if (countries[k].incomeLevel.value == 'Upper middle income') {
                    console.log(`${countries[k].incomeLevel.value} : ${countries[k].name}`);
            }
        }
    }
}
})
/*

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