import { url } from "inspector";

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('source-map-support').install();
let page:number = 1;
const request = require("request");
///////////////////////////////////////////////////////////////////////////////////////////

const hostUrl = 'http://api.worldbank.org/v2/';
const countryApiUrl = `${hostUrl}/countries?page=`+ page;
let data = '';
// https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-api-country-queries

function fetch(page){
    var url: string = "http://api.worldbank.org/v2/countries?page=" + page + "&format=json"
    request.get(url, function(result) {
        if (page < 7){
            fetch(page++)
        }
    })
}


request.get(url)
    .on('response', (res) => {
    console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`);
    fetch(page);
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