import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pizzas } from '../home/home.model';
import { Cart } from '../cart/cart.model';
import { CartComponent } from '../cart/cart.component';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { clearCart } from '../state/pizza.action';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [CartComponent],
})
export class CheckoutComponent implements OnInit {
  total: number = 0;
  Pizza: Pizzas[] = [];
  cartList: Pizzas[] = [];
  cartMap: Cart[] = [];

  constructor(private router: Router, private store: Store<AppState>) {}
  ngOnInit(): void {
  
    this.store.select('pizzaListStore').subscribe((state) => {
      this.cartMap = state.cartMap || [];
      this.Pizza = state.Pizza;
      this.cartList = this.Pizza.filter((item) => {
        let ispresent: boolean = false;
        for (let i = 0; i < this.cartMap.length; i++) {
          if (this.cartMap[i].name == item.name) ispresent = true;
        }
        if (ispresent) return true;
        else return false;
      });
    });
  }
  
  getTotalPrice() {
    this.total = 0;
    for (let i = 0; i < this.cartList.length; i++) {
      this.total += this.cartList[i].price * this.cartMap[i].quantity;
    }
    return this.total;
  }

  success() {
    this.router.navigateByUrl('success');
    this.store.dispatch(clearCart());
  }
}
