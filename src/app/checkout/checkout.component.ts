import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  cartTotal!: any;

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.cartTotal = JSON.parse(localStorage.getItem('cart_total') as any);
    console.log(this.cartTotal);
  }

  success() {
    if(this.cartTotal!=0){
    this.router.navigateByUrl('success');
    }
    localStorage.removeItem('cart_items');
  }
}
