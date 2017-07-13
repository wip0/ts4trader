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
        // todo: return cash + assets' worth
        return 0;
    }

    public getAllLongInFx(): Fx[] {
        // todo:
        return [];
    }
}
