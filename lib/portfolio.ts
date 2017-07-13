import * as fs from 'fs';
////////////////////////////////////////////////////////////////////////////////////////////////////
interface Stock {
    name: string;
    cost: number;
    amount: number;
    price: number;
}

interface Fx {
    name: string;
    action: string;
    cost: number;
    lot: number;
    bid: number;
    ask: number;
}

export class Portfolio {
    private stocks: Stock[];
    private fxs: Fx[];

    constructor() {
        this.stocks = [];
        this.fxs = [];
    }

    public loadFromFile(fileName: string, encoding: string = 'utf-8'): boolean {
        let bOK: boolean = true;
        try {
            let data: any = JSON.parse(fs.readFileSync(fileName, encoding));
            this.stocks = this.loadStock(data.stock);
            this.fxs = this.loadFx(data.fx);// todo: load fx 
        } catch (error) {
            bOK = false;
        }
        return bOK;        
    }
////****Methods*****///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

private loadStock(data: any): Stock[] {
        let stocks: Stock[] = [];
        let keys: string[] = Object.keys(data);
        for (let key of keys) {
            let obj: any = data[key];
            let stock: Stock = {
                name: key,
                cost: obj.cost,
                amount: obj.amount,
                price: obj.price,
            };

            stocks.push(stock);
        }

        return stocks;
    }

    private loadFx(data: any): Fx[]{
        let fxs: Fx[] = [];
        let keys: string[] = Object.keys(data);
        for (let key of keys){
            let obj: any = data[key];
            let fxs: Fx = {
                name: key,
                action: obj.action,
                cost: obj.cost,
                lot: obj.lot,
                bid: obj.bid,
                ask: obj.ask
            };
        } 
        return fxs;
    }

///////////////////////////////////////////////////////////////////////////////////////////////////////
    public getNetWorth(): number {
        let stockWorth: number = this.getStockWorth();
        let fxWorth: number = this.getFxWorth();
        let netWorth: number = stockWorth + fxWorth;
        return netWorth;
    }

    private getStockWorth(): number {
        calculateFromStock(stock[]);// todo: 
        return 0;
    }

    private getFxWorth(): number {
        calculateFromFx(Fx[])// todo:
        return 0;
    }
}
