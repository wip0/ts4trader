require('source-map-support').install();

import * as request from 'request';
///////////////////////////////////////////////////////////////////////////////////////////
const hostUrl: string = 'http://api.worldbank.org/v2/';
const countryApiUrl: string = `${hostUrl}/countries`;

// https://datahelpdesk.worldbank.org/knowledgebase/articles/898590-api-country-queries
request.get(`${countryApiUrl}?format=json`)
    .on('response', (res) => {
        console.log(`HTTP Result = ${res.statusCode} ${res.statusMessage}`);
    })
    .on('data', (buf: Buffer) => {
        const data: string = buf.toString();
        //console.log(`Data: ${data}`);
        // todo: show all countries that have high income
    })
    .on('error', (error) => {
        console.error(error.message || error);
    });