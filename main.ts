require('source-map-support').install();


import * as request from 'request';
///////////////////////////////////////////////////////////////////////////////////////////
const hostUrl: string = 'http://api.worldbank.org/v2/';
const countryApiUrl: string = `${hostUrl}/countries/TH`;

// https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-api-country-queries
request.get(`${countryApiUrl}?format=json`)
    .on('response', (res) => {
        console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`);
    })
    .on('data', (buf: Buffer) => {
        const data: string = buf.toString();
        console.log(`Data: ${data}`);
       let arrayOfmyObj: any = JSON.parse(data);
       // arrayofmyobj length
       console.log(arrayOfmyObj.length)
        for(var i =0; i< arrayOfmyObj.length; i++){
            var object = arrayOfmyObj[i]
            //console.log(object)
            for ( var j =0; j< object.length; j++){
               var object1 = object[j]
               console.log(object1)
               console.log(object1.incomeLevel.value)
               //for( var k =0; k< object1.length; k++){
                 //  console.log(object1[k])
               }
            
        }
    
    
    }
        
        // todo: show all countries that have high income 
    )
    .on('error', (error) => {
        console.error(error.message || error);
    });