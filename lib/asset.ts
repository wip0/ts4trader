export type AssetType = 'Stock' | 'Fx' | 'Cash' | 'invalid';

export interface Asset {
    type: AssetType;
    name: string;
    cost?: number;      // ? mean optional
    amount?: number;

    getWorth(): number;
}

export class AssetFactory {
    public static create(data: any | null): Asset {
        let assetType = data && data.type;
        if (assetType === 'Stock') {
            return <Asset> new Stock(data.name, data.cost, data.amount, data.price);
        } else if (assetType === 'Fx') {
            // todo:
        } else if (assetType === 'Cash') {
            return <Asset> new Cash(data.amount, data.name);
        }
        return <Asset> new InvalidAsset();
        }
        // todo: return invalid asset
    

    public static isInvalidAsset(asset: Asset | null): boolean {
        if (asset && asset.type) {
            return asset.type === 'invalid';
        }

        return true;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////
class InvalidAsset implements Asset {
    public type: AssetType;
    public name: string;
    public amount: number;

    constructor() {
        this.type = 'invalid';
        this.name = '';
        this.amount = NaN;
    }

    public getWorth(): number { return this.amount; }
}

export class Cash implements Asset {
    public type: AssetType;
    public name: string;
    public amount: number;

    constructor(amount: number, name: string = 'Dollar') {
        this.type = 'Cash';
        this.amount = amount;
        this.name = name;
    }

    public getWorth(): number {
        return this.amount;
    }
}

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
        return (this.price - this.cost) * this.amount;
    }    
}

export class Fx implements Asset {
   public type: AssetType;
   public name: string;
   public action: string;
   public cost: number;
   public lot: number;
   public bid: number;
   public ask: number;

   constructor(name:string, action: string, cost: number, lot: number, bid: number, ask:number ){
       this.name = name;
       this.action = action;
       this.lot = lot;
       this.bid = bid;
       this.ask = ask;
   }
   public getWorth(): number{
       if(this.action == 'long'){
           return (this.bid - this.cost) * this.lot * 10000;
       }
           return (this.cost - this.ask) * this.lot * 10000;
   } // todo: 
} 

