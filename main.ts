import * as fs from 'fs';
import * as path from 'path';

// Read data from file
const INPUT_FILE = './input/data.json';
let fullPathFile: string = path.resolve(__dirname, INPUT_FILE);
let data: any = fs.readFileSync(fullPathFile, 'utf-8');

// print data
console.log(data);



