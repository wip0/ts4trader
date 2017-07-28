export type AssetType = 'Stock' | 'Fx';

export interface Asset {
    type: AssetType;
    name: string;
    cost: number;
    amount: number;

    getWorth(): number;
}

export class AssetFactory {
    public static create(data: any | null): Asset | null {
        let assetType = data && data.type;
        if (assetType === 'Stock') {
            return <Asset> new Stock(data.name, data.cost, data.amount, data.price);
        } else if (assetType === 'Fx') {
            return <Asset> new Fx(data.name, data.action,data.cost, data.lot, data.bid,data.ask);// todo:
        }
        return null;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
export class Stock implements Asset {
    public type: AssetType;
    public name: string;
    public cost: number;
    public amount: number;
    public price: number;

    constructor(name: string, cost: number, amount: number, price: number) {
        this.type = 'Stock';
        this.name = name;
        this.cost = cost;
        this.amount = amount;
        this.price = price;
    }

    public getWorth(): number {// todo:
        return (this.price - this.cost) * this.amount;
    }    
}

export class Fx implements Asset {
    public type: AssetType;
    public name: string;
    public action: string;
    public cost: number;
    public lot: number;
    public amount: number;
    public bid: number;
    public ask: number;

    constructor(name: string, action: string, cost: number, lot: number, bid: number, ask: number) {
        this.type = 'Fx';
        this.name = name;
        this.action = action;
        this.cost = cost;
        this.lot = lot;
        this.bid = bid;
        this.ask = ask;
    }

    public getWorth(): number {
        if (this.action == 'long'){
            return (this.bid - this.cost)*this.lot*10000;
        }
        else{
            return (this.cost -this.ask)*this.lot *10000;
        }   
    }    
// todo: 
}
