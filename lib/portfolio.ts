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
        let net = 0, number;
        let stock = tocks[]
        for (let stock of stocks){
            // todo:
        return 0;
    }
}
// todo: change interface Fx to class Fx // why do we need to check interface FX to class
export class Fx {
    public name: string;
    public action: string;
    public cost: number;
    public lot: number;
    public bid: number;
    public ask: number;

    constructor (name:string, action:string, cost: number, lot: number, bid: number, ask: number){
    this.name = name;
    this.action = action;
    this.cost = cost;
    this.lot = lot;
    this.bid = bid;
    this.ask = ask;
}
 public getFxWorth(): number {
        // todo:
        return 0;
    }
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
            this.fxs = this.loadFx(data.fx);// todo: load fx 
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
