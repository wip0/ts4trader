export type AssetType = 'Stock' | 'Fx';

export interface Asset {
    type: AssetType;
    name: string;
    cost: number;
    amount: number;
    getWorth(): number;
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

    public getWorth(): number {
        // todo:
        return (this.price - this.cost)*this.amount;
    }    
}

export class Fx implements Asset {
    public type : AssetType;
    public name : string;
    public action : string;
    public cost : number;
    public amount : number;
    public bid : number;
    public ask : number;
    
    constructor( name: string, action:string, cost: number, amount:number, bid:number, ask:number){
        this.name = name;
        this.action = action;
        this.cost = cost;
        this.amount = amount;
        this.bid = bid;
        this.ask = ask;
        }// todo: 

    public getWorth(): number{
        return 0;
    }
}
