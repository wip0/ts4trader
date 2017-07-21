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
            let fx: Fx[] = this.loadFx(data.fx);
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
    private loadFx(data: any): Fx[] {
        let fxs: Fx[] = [];
        let keys: string[] = Object.keys(data);

        for (let key of keys){
            let obj: any = data[key];
            let fx: Fx = new Fx(key, obj.action, obj.cost, obj.amount, obj.lot, obj.bid, obj.offer);
            fxs.push(fx);
        }
        return fxs;
    }

    public getTheMostPositionInStock(): Asset | null {
        let stocks: Stock[] = <Stock[]> this.assets.filter((asset) => asset.type === 'Stock');

        if (this.assets.length === 0) {
            return null;
        }
        let maxPosition =0, maxIndex=-1, i=0;
        for (i=0; i<this.assets.length;i++){
            if (maxPosition < this.assets[i].amount){
                maxPosition = this.assets[i].amount;
                maxIndex = i
            }
        }
        if (maxIndex>=0){
            return this.assets[maxIndex];
        }
        return null;
    }

    public getNetWorth(): number {
        let stockWorth: number = this.getStockWorth();
        let fxWorth: number = this.getFxWorth();
        let netWorth: number = stockWorth + fxWorth;
        return netWorth;
    }

    private getStockWorth(): number {
        
        let stocks: Stock[] = <Stock[]> this.assets.filter((asset) => asset.type === 'Stock');
        let sum = 0;
        for (let stock of this.assets ) {
            sum += stock.getWorth();
        }
        return sum;
    }

    private getFxWorth(): number {
        let fxs: Fx[] = <Fx[]> this.assets.filter((asset) => asset.type === 'Fx');
        let sum = 0;
        for (let fx of this.assets){
            sum += fx.getWorth();// todo:
        }
        return sum;
    }

}
        