import * as fs from 'fs';
////////////////////////////////////////////////////////////////////////////////////////////////////
export class Stock {
    public name: string;
    public cost: number;
    public amount: number;
    public price: number;

    constructor(name: string, cost: number, amount: number, price: number) {
        this.name = name;
        this.cost = cost;
        this.amount = amount;
        this.price = price;
    }

    public getWorth(): number {
        // todo:
        return 0;
    }
}
// todo: change interface Fx to class Fx 
interface Fx {
    name: string;
    action: string;
    cost: number;
    amount: number;
    bid: number;
    ask: number;
}
////////////////////////////////////////////////////////////////////////////////////////////////////
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

    public getNetWorth(): number {
        let stockWorth: number = this.getStockWorth();
        let fxWorth: number = this.getFxWorth();
        let netWorth: number = stockWorth + fxWorth;
        return netWorth;
    }

    private getStockWorth(): number {
        let sum = 0;
        for (let stock of this.stocks) {
            sum += stock.getWorth();
        }
        return sum;
    }

    private getFxWorth(): number {
        // todo:
        return 0;
    }

    public getTheMostPositionInStock(): Stock | null {
        if (this.stocks.length === 0) {
            return null;
        }

        // todo:
        return null;
    }
}
