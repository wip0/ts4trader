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
        return 0;
    }    
}

export class Fx implements Asset {
    // todo: 
}
