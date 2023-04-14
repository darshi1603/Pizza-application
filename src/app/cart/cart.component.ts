import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { MainService } from 'src/app/main/main.service';
import { Pizzas } from 'src/app/home/home.model';
import {
  decreaseCount,
  fetchCart,
  removeCartItem,
  saveCart,
  updateCart,
} from 'src/app/state/pizza.action';
import { selectUser } from 'src/app/state/pizza.selector';
import { User } from '../user-details/user.model';
import { Cart } from 'src/app/cart/cart.model';
import { Order } from '../history/history.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  addedToCartList: Pizzas[] = [];
  cartList: Pizzas[] = [];
  total: number = 0;
  cartMap: Cart[] = [];
  Pizza: Pizzas[];
  orderList: Order[] = [];
  tempList: Pizzas[] = [];
  subscriptions: Subscription;
  constructor(private store: Store<AppState>, private router: Router, private mainService: MainService) {
    this.subscriptions = new Subscription();
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCart());
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
  increment(id: number) {
    this.store.dispatch(updateCart({ name: this.cartMap[id].name }));
  }
  decrement(id: number) {
    let cartMapItem = JSON.parse(JSON.stringify(this.cartMap[id]));
    if (cartMapItem.quantity > 1) {
      cartMapItem.quantity -= 1;
      this.store.dispatch(decreaseCount({ id: id, item: cartMapItem }));
    } else {
      this.store.dispatch(removeCartItem({ id }));
    }
  }
  removeFromCart(id: number){
    this.store.dispatch(removeCartItem({ id }));
  }
  getTotalPrice(): number{
    if (this.cartList.length) {
      this.total = 0;
      for (let i = 0; i < this.cartList.length; i++) {
        this.total += this.cartList[i].price * this.cartMap[i].quantity;
      }
      return this.total;
    } 
    else return 0;
  }

  checkout() {
    this.store.dispatch(saveCart());
        let addedUser: User
        this.subscriptions.add(this.store.select(selectUser).subscribe(user => {
          addedUser = user;
        }));
        if (addedUser) {
          if (this.cartMap.length) {
            let order: Order = { addedCart: this.cartMap };
            this.mainService.fetchCartOrder().subscribe(res => {
              this.orderList = res || [];
              this.orderList.push(order);
              this.mainService.saveCartOrder(this.orderList).subscribe(res => {
                this.router.navigate(['checkout']);
              });
            })
          }
        }
        else {
          this.router.navigateByUrl('login')
        }
     
      }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}