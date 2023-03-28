import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { Pizzas } from '../shared/models/pizza';
import { CartItem } from '../shared/models/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = new Cart();
  constructor() { }

  addToCart(pizza:Pizzas): void{
      
        let cartItem = this.cart.items.find(item=> item.pizza.id===pizza.id)

        if(cartItem){
          this.cart = JSON.parse((localStorage.getItem('cart_items') as any))
          this.changeQuantity(pizza.id, cartItem.quantity +1)
          return;
        }
        this.cart.items.push(new CartItem(pizza))
        this.saveCart()     
  }

  removeFromCart(pizzaId:number): any{
    this.cart = JSON.parse((localStorage.getItem('cart_items') as any))
    this.cart.items = this.cart.items.filter(item=>item.pizza.id !=pizzaId)
    localStorage.removeItem('cart_items');
    this.saveCart();
  }

  changeQuantity(quantity:number, pizzaId:number){
   
    let cartItem = this.cart.items.find(item=>item.pizza.id===pizzaId)
    this.cart = JSON.parse((localStorage.getItem('cart_items') as any))
    if(!cartItem) return;
    this.cart.items.map(item=>{
      if(item.pizza.id === pizzaId){
        item.quantity = quantity;
      }
    })
    localStorage.setItem('cart_items', JSON.stringify(this.cart)); 
  }
  
  getCart(): any{
    this.cart = JSON.parse(JSON.stringify(localStorage.getItem('cart_items')));
    return this.cart;
    //localStorage.setItem("products", JSON.stringify(Cart.CartItem))
  }
  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.cart)); 
  }
  loadCart(): void {
    //this.cart = JSON.parse(localStorage.getItem("cart_items")) ?? [];
  }
}
