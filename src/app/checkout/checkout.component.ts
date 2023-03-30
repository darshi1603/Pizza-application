import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../shared/models/CartItem';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartTotal!: any;
  history_items: CartItem[] = [];
  // historyCart:any[] = [];

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.cartTotal = JSON.parse(localStorage.getItem('cart_total') as any);
    //console.log(this.cartTotal);
  }

  success() {
    if (this.cartTotal != 0) {
      let cart = JSON.parse(localStorage.getItem('cart_items'));

      let historyItems = JSON.parse(
        localStorage.getItem('history_items') as any
      );
      if (historyItems) {
        this.history_items = historyItems;
        this.history_items.push(cart);
      } 
      else {
        this.history_items[0] = cart;
      }
      localStorage.setItem('history_items', JSON.stringify(this.history_items));
      localStorage.removeItem('cart_items');
      this.router.navigateByUrl('success');
    }
  }
  cart(arg0: string, cart: any) {
    throw new Error('Method not implemented.');
  }
}
