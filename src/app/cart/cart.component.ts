import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
//import { Pizzas } from '../shared/models/pizza';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cart = new Cart();
  check: any;
  subTotal: any;
  //cart!:Cart;
  constructor(private cartService: CartService, private router: Router) {
    //this.setCart()
    // this.cart = localStorage.getItem('cart_items');
  }

  ngOnInit(): void {
    this.setCart();
    this.updateCart();
  }

  setCart() {
    //  this.cart = this.cartService.getCart();
    this.cart = JSON.parse(localStorage.getItem('cart_items') as any);
  }
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.pizza.id);
    this.setCart();
    this.updateCart();
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);

    this.cartService.changeQuantity(quantity, cartItem.pizza.id);
    this.setCart();
  }

  changeSubTotal(cartItem: any) {
    //this.subTotal = cartItem.pizza.price;
    const qty = cartItem.quantity;
    const amt = cartItem.pizza.price;

    this.subTotal = qty * amt;

    this.updateCart();
    return this.subTotal;
  }

  get totalPrice(): number {
    let total = 0;
    if(this.cart?.items?.length)
    this.cart?.items.forEach((item) => {
      total += item.quantity * item.pizza.price;
    });
    return total;
  }

  checkout() {
    this.updateCart();
    localStorage.setItem('cart_total', JSON.stringify(this.totalPrice));
    //localStorage.setItem("userDetails", JSON.stringify(this.user));
    this.check = JSON.parse(localStorage.getItem('userDetails') as any);
    //console.log(this.check.firstname)
    if (this.check?.firstname != null && this.check?.email != null) {
      this.router.navigateByUrl('checkout');
    } else {
      this.router.navigateByUrl('login');
    }
  }

  updateCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.cart));
  }

  ngOnDestroy(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.cart));
  }
}
