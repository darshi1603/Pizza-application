import { CartItem } from "./CartItem";

export class Cart{
    static CartItem(CartItem: any): string {
      throw new Error('Method not implemented.');
    }
    items:CartItem[]=[];

    // get totalPrice():number{
    //     let total=0;
    //     this.items.forEach(item=>{
    //         total += (item.quantity * item.price)
    //     })
    //     return total;
    // }
}