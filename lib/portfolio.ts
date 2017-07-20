import * as fs from 'fs';
import {Asset, Stock, Fx} from './asset';
////////////////////////////////////////////////////////////////////////////////////////////////////
export class Portfolio {
    private assets: Asset[];

    constructor() {
        this.assets = [];
    }

    public loadFromFile(fileName: string, encoding: string = 'utf-8'): boolean {
        let bOK: boolean = true;
        try {
            let data: any = JSON.parse(fs.readFileSync(fileName, encoding));
            let stocks: Stock[] = this.loadStock(data.stock);
            this.assets.push(...stocks);
            let fx: Fx[] = this.loadFx(data.Fx);
            this.assets.push(...fx);
            // todo: load fx 
        } catch (error) {
            bOK = false;
        }
        return bOK;        
    }

    private loadStock(data: any): Stock[] {
        let stocks: Stock[] = [];
        let keys: string[] = Object.keys(data);

        for (let key of keys) {
            let obj: any = data[key];
            let stock: Stock = new Stock(key, obj.cost, obj.amount, obj.price);
            stocks.push(stock);
        }

        return stocks;
    }
    private loadFx(data: any):Fx[] {
        let fxs: Fx[] = [];
        let keys: string[] = Object.keys(data);

        for (let key of keys){
            let obj: any = data[key];
            let fxs: Fx = new Fx(key, obj.action, obj.cost, obj.amount, obj.bid, obj.offer);
            fxs.push(fx);
        }
        return fx;
    }
    public getNetWorth(): number {
        // todo:
        return 0;
    }

    public getTheMostPositionInStock(): Stock | null {
        let stocks: Stock[] = <Stock[]> this.assets.filter((asset) => asset.type === 'Stock');

        // todo:
        return null;
    }
}
