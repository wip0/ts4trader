import * as path from 'path';
import {Portfolio} from './lib/portfolio';
import {Fx} from './lib/asset';
////////////////////////////////////////////////////////////////////////////////////////////////////
const INPUT_FILE = './input/data.json';
let fullPathFile: string = path.resolve(process.cwd(), INPUT_FILE);

main();
////////////////////////////////////////////////////////////////////////////////////////////////////
function main() {
    let portfolio: Portfolio = new Portfolio();
    if (!portfolio.loadFromFile(fullPathFile)) {
        console.log(`Cannot load from file: ${fullPathFile}`);
        return;
    }

    let value: number = portfolio.getNetWorth();
    console.log(`Net worth: ${value}`);
    console.log(`Cash: ${portfolio.cash}`);

    let longFxs: Fx[] = portfolio.getAllLongInFx();
    if (longFxs.length === 0) {
        console.log('No long FX in portfolio');
    } else {
        longFxs.forEach((fx) => {
        console.log('Here is Fx long position: ' + fx.name + ' cost: ' + fx.cost + ' lot: ' + fx.lot + ' action: ' + fx.action);// todo: show long fx detail
        });
    }

}