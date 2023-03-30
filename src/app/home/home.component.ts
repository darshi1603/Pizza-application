import { Component, OnInit } from '@angular/core';
import { FoodService } from '../services/food.service';
import { Pizzas } from '../shared/models/pizza';

// import { StarRatingComponent } from 'ng-starrating';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  [x: string]: any;

  searchText: any;
  Pizza: Pizzas[] = [];
  constructor(
    private foodService: FoodService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['searchItem']) {
        this.Pizza = this.foodService
          .getAll()
          .filter((pizza) =>
            pizza.name
              .toLowerCase()
              .includes(params['searchItem'].toLowerCase())
          );
        //this.Pizza = this.Pizza.filter(pizza=>pizza.price(params['searchItem']));
        if (this.Pizza.length == 0) {
          this.Pizza = this.foodService
            .getAll()
            .filter((pizza) =>
              pizza.price.toString().includes(params['searchItem'].toString())
            );

          if (this.Pizza.length == 0) {
            this.Pizza = this.foodService
              .getAll()
              .filter((pizza) =>
                pizza.star.toString().includes(params['searchItem'].toString())
              );
          }
        }
      } else {
        this.Pizza = this.foodService.getAll();
      }
    });
  }
  AddToCart(pizza: Pizzas, element, text) {
    this.cartService.addToCart(pizza);
    element.textContent = text;

    //this.router.navigateByUrl('cart')
  }

  sort(order: any){
    if(order=='asc'){
      this.Pizza.sort(
        (p1,p2) =>{
          return p1.price > p2.price ? 1 : -1
        }
      )
    }
    else{
      this.Pizza.sort(
        (p1,p2) =>{
          return p1.price > p2.price ? -1 : 1
        }
      )
    }
  }

  sort1(order: any){
    if(order=='asc1'){
      this.Pizza.sort(
        (p1,p2) =>{
          return p1.star > p2.star ? 1 : -1
        }
      )
    }
    else{
      this.Pizza.sort(
        (p1,p2) =>{
          return p1.star > p2.star ? -1 : 1
        }
      )
    }
  }
}
