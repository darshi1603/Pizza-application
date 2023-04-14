import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { Cart } from '../cart/cart.model';
import { MainService } from 'src/app/main/main.service';
import { Pizzas } from 'src/app/home/home.model';
import { fetchPizzaList } from 'src/app/state/pizza.action';
import { selectCart, selectPizzaList } from 'src/app/state/pizza.selector';
import { Order } from 'src/app/history/history.model';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit {
  orderList: Order[];
  pizza: Pizzas[] = [];
  constructor(private mainService: MainService,private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(fetchPizzaList());
    this.mainService.fetchCartOrder().subscribe((res) => {
      if (res) {
        this.orderList = res;
        this.store.select(selectPizzaList).subscribe((list) => {
          this.pizza = list;
        });
      }
    });
  }
  getPizzaListFromCartMap(cartMap: Cart[]) {
    let cartList: Pizzas[] = [];
    cartList = this.pizza.filter((item) => {
      let ispresent: boolean = false;
      for (let i = 0; i < cartMap.length; i++) {
        if (cartMap[i].name == item.name) ispresent = true;
      }
      if (ispresent) 
       return true;
      else
       return false;
    });
    return cartList;
  }
  getTotalPrice(order: Order) {
    let total = 0;
    let pizzaCartList = this.getPizzaListFromCartMap(order.addedCart);
    for (let i = 0; i < order.addedCart.length; i++) {
      if (order.addedCart[i] && pizzaCartList[i])
        total += order.addedCart[i].quantity * pizzaCartList[i].price;
    }
    return total;
  }
}
