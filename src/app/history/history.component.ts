import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartItem } from '../shared/models/CartItem';
import { HistoryCart } from '../shared/models/historyCart';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  //cart = new Cart();
  historyCart = new HistoryCart();
  historyItemArray:any[] = [];
 
  //cart!:Cart;
  constructor(private cartService: CartService) {
    //this.setCart()
    // this.cart = localStorage.getItem('cart_items');
  }

  ngOnInit(): void {
    this.setCart();
  }

  setCart():any {
    //  this.cart = this.cartService.getCart();
    this.historyItemArray = JSON.parse(localStorage.getItem('history_items') as any);
    // for (let index = 0; index < this.historyItemArray.length; index++) {
    //   const element = this.historyItemArray[index];
    //   this.historyCart.items.push(element);
      
    // }
    // this.historyCart = JSON.parse(localStorage.getItem('history_items') as any)

    
  }
}
