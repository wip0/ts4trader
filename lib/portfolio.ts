import * as fs from 'fs';
const jsonminify = require('jsonminify');       // use require for old module

import {Asset, Cash, AssetFactory, Stock, Fx, InvalidAsset} from './asset';
////////////////////////////////////////////////////////////////////////////////////////////////////
export class Portfolio {
    private assets: Asset[];

    constructor() {
        this.assets = [];
    }

    public loadFromFile(fileName: string, encoding: string = 'utf-8'): boolean {
        let bOK: boolean = true;
        try {
            let text: string = fs.readFileSync(fileName, encoding);
            let data: any = JSON.parse(jsonminify(text));

            this.assets = [];
            let assets: any[] = data.assets || [];
            if (Array.isArray(assets)) {
                let allAssets = assets.map((asset) => AssetFactory.create(asset));  // try: merge 2 lines into one line
                this.assets = allAssets.filter((asset) => !AssetFactory.isInvalidAsset(asset));
            }
        } catch (error) {
            bOK = false;
        }
        return bOK;        
    }

    public get cash(): number {
        let cashs: Cash[] = <Cash[]> this.assets.filter((asset) => asset.type === 'Cash');
        let sum = 0;
        for (let cash of cashs){
            sum += cash.getWorth();
        }
        return sum;
    }
    //public set cash(value: number){
       // this.cash;
    //}

    public getNetWorth(): number {
        let stockWorth = this.getStockWorth();
        let fxWorth = this.getFxWorth();
        let cash = this.cash;
        let invalid = this.getInvalid();// todo: 
        return stockWorth + fxWorth + cash + invalid;
    }

    public getAllLossStock(): Stock[] {
        let stocks: Stock[] = <Stock[]> this.assets.filter((asset) => asset.type === 'Stock');
        let lossList: Stock[] = [];
        for(let stock of stocks){
            if(stock.getWorth() < 0){lossList.push(stock);}
        }
        return lossList;
}
    public getStockWorth(): number{
        let stocks: Stock[] = <Stock[]> this.assets.filter((asset) => asset.type === 'Stock');
        let sum = 0;
        for (let stock of stocks){
            sum += stock.getWorth();
        }
        return sum;
    }

    public getFxWorth(): number{
        let fxs: Fx[] = <Fx[]> this.assets.filter((asset) => asset.type === 'Fx');
        let sum = 0;
        for (let fx of fxs){
            sum += fx.getWorth();// todo:
        }
        return sum;
    }
    public getInvalid(): number{
        let invalids: InvalidAsset[] = <InvalidAsset[]> this.assets.filter((asset) => asset.type === 'invalid');
        let sum = 0;
        for (let invalid of invalids){
            sum += invalid.getWorth()
        }
        return sum;
    }
}
