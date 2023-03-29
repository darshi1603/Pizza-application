import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  cart = new Cart();
  //cart!:Cart;
  constructor(private cartService: CartService) {
    //this.setCart()
    // this.cart = localStorage.getItem('cart_items');
  }

  ngOnInit(): void {
    this.setCart();
  }

  setCart() {
    //  this.cart = this.cartService.getCart();
    this.cart = JSON.parse(localStorage.getItem('cart_items') as any);
  }
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.pizza.id);
    this.setCart();
  }
}
