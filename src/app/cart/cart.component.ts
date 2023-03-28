import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
//import { Pizzas } from '../shared/models/pizza';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
   cart = new Cart();
   //cart!:Cart;
   constructor(private cartService: CartService){
     
      //this.setCart()
      // this.cart = localStorage.getItem('cart_items');
   }

   ngOnInit(): void {
      this.setCart();
   }

   setCart(){
   //  this.cart = this.cartService.getCart();
   this.cart = JSON.parse((localStorage.getItem('cart_items') as any));
   }
   removeFromCart(cartItem: CartItem){
      this.cartService.removeFromCart(cartItem.pizza.id);
      this.setCart();

   }

   changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);

    this.cartService.changeQuantity(quantity, cartItem.pizza.id);
    this.setCart();
   }

   // counter=1;
   // incrementQty(cartItem){
   //    cartItem.counter = this.counter+1;
   // }
   // decrementQty(cartItem){
   //    if(this.counter!=1)
   //    cartItem.counter = this.counter-1;
   // }

   get totalPrice():number{
      let total=0;
      this.cart.items.forEach(item=>{
       total += (item.quantity * item.pizza.price)
     })
     return total;
 }
      
   }

