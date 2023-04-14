import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from 'src/app/user-details/user.model';
import { Pizzas } from '../home/home.model';
import { Cart } from '../cart/cart.model';
import { Order } from '../history/history.model';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  constructor(private http: HttpClient) {}
  selectedPizzaList = new BehaviorSubject<Pizzas[]>([]);

  getPizzaList() {
    return this.http
      .get<Pizzas[]>(
        'https://pizza-app-514cb-default-rtdb.firebaseio.com/pizzaList.json'
      )
      .pipe(map((res) => res));
  }
  setPizzaList(Pizza: Pizzas[]) {
    return this.http
      .put<Pizzas[]>(
        'https://pizza-app-514cb-default-rtdb.firebaseio.com/pizzaList.json',
        Pizza
      )
      .pipe(map((res) => res));
  }
  addUser(user: User) {
    return this.http
      .put<User>(
        'https://pizza-app-514cb-default-rtdb.firebaseio.com/user.json',
        user
      )
      .pipe(map((res) => res));
  }
  fetchUser() {
    return this.http
      .get<User>(
        'https://pizza-app-514cb-default-rtdb.firebaseio.com/user.json'
      )
      .pipe(map((res) => res));
  }
  saveCart(cart: Cart[]) {
    return this.http
      .put<Cart[]>(
        'https://pizza-app-514cb-default-rtdb.firebaseio.com/cart.json',
        cart
      )
      .pipe(map((res) => res));
  }
  fetchCart() {
    return this.http
      .get<Cart[]>(
        'https://pizza-app-514cb-default-rtdb.firebaseio.com/cart.json'
      )
      .pipe(map((res) => res));
  }
  clearCart() {
    return this.http
      .delete('https://pizza-app-514cb-default-rtdb.firebaseio.com/cart.json')
      .pipe(map((res) => res));
  }
  saveCartOrder(orderList: Order[]) {
    return this.http
      .put<Order[]>(
        'https://pizza-app-514cb-default-rtdb.firebaseio.com/orderList.json',
        orderList
      )
      .pipe(map((res) => res));
  }
  fetchCartOrder() {
    return this.http
      .get<Order[]>(
        'https://pizza-app-514cb-default-rtdb.firebaseio.com/orderList.json'
      )
      .pipe(map((res) => res));
  }
}
