import * as fs from 'fs';
const jsonminify = require('jsonminify');       // use require for old module

import {Asset, AssetFactory, Stock, Fx} from './asset';
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
        // todo: sum all cash entries
        return 0;
    }

    public getNetWorth(): number {
        // todo: 
        return 0;
    }

    public getAllLossStock(): Stock[] {
        // todo:
        return [];
    }
}
