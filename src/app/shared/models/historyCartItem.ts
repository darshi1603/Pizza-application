import {Pizzas} from './pizza'

export class HistoryCartItem{
    static quantity: any;
    static pizza: any;
   static price: any;
   subTotal: number;
    constructor(pizza: Pizzas){
     this.pizza = pizza;
    
    }
   pizza: Pizzas;
   quantity:number=1;
    
}