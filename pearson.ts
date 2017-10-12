function covariance():number{

}

function sd(price:number){

}

function average(Historicaldata:[]){
    let total:number = 0;
    for(var i:number = 0, i < price.length; i++){
        total += price[i];
    }
    return total/price.length;
}