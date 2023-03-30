import { HistoryCartItem } from "../models/historyCartItem";

export class HistoryCart{
    static HisoryCartItem(HisoryCartItem: any): string {
      throw new Error('Method not implemented.');
    }
    items:HistoryCartItem[]=[];

    // get totalPrice():number{
    //     let total=0;
    //     this.items.forEach(item=>{
    //         total += (item.quantity * item.price)
    //     })
    //     return total;
    // }
}