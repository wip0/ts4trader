import * as fs from 'fs';
const jsonminify = require('jsonminify');       // use require for old module

import {Asset, AssetFactory, Stock, Fx} from './asset';
////////////////////////////////////////////////////////////////////////////////////////////////////
export class Portfolio {
    public cash: number;        // try: change public to private and see what's happen
    private assets: Asset[];

    constructor() {
        this.cash = 0;
        this.assets = [];
    }

    public loadFromFile(fileName: string, encoding: string = 'utf-8'): boolean {
        let bOK: boolean = true;
        try {
            let text: string = fs.readFileSync(fileName, encoding);
            let data: any = JSON.parse(jsonminify(text));

            this.cash = data.cash || 0; // default is 0
            
            this.assets = [];
            let assets: any[] = data.assets || [];
            if (Array.isArray(assets)) {    // check data before creating
                assets.forEach((asset) => { // try: change to for-of
                    let obj = AssetFactory.create(asset);
                    if (obj != null) {
                        this.assets.push(obj);
                    }
                });
            }
        } catch (error) {
            bOK = false;
        }
        return bOK;        
    }

    public getNetWorth(): number {
        let stockWorth: number =this.getStockWorth();
        let fxWorth: number = this.getFxWorth();
        let cash: number = this.cash;
        let netWorth: number = cash + stockWorth + fxWorth;
        return netWorth;
    }

    private getStockWorth(): number {
        
        let stocks: Stock[] = <Stock[]> this.assets.filter((asset) => asset.type === 'Stock');
        let sum = 0;
        for (let stock of stocks ) {
            sum += stock.getWorth();
        }
        return sum;
    }

    private getFxWorth(): number {
        let fxs: Fx[] = <Fx[]> this.assets.filter((asset) => asset.type === 'Fx');
        let sum = 0;
        for (let fx of fxs){
            sum += fx.getWorth();// todo:
        }
        return sum;
    }

    public getAllLongInFx(): Fx[] {
        let fxs: Fx[] = <Fx[]> this.assets.filter((asset) => asset.type === 'Fx');
        let list:Fx[] = [];
        for (let fx of fxs) {
            if(fx.action = 'long'){list.push(fx) ;}
        }
        return list;
    }
}
///////////////////////////////////////////////////////////////////////

        