import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { updateCart, fetchPizzaList } from 'src/app/state/pizza.action';
import { State } from 'src/app/state/pizza.reducer';
import { selectPizzaList } from 'src/app/state/pizza.selector';
import { Pizzas } from 'src/app/home/home.model';
import * as PizzaActions from 'src/app/state/pizza.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  searchText: any;
  Pizza: Pizzas[] = [];
  selectedPizzaList: Pizzas[] = [];
  filteredList: Pizzas[];

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    
    this.store.select(selectPizzaList).subscribe((Pizza) => {
      this.Pizza = JSON.parse(JSON.stringify(Pizza));
      this.filteredList = this.Pizza;
    });

    this.route.params.subscribe((params) => {
      if (params['searchItem']) {
        this.Pizza = this.Pizza.filter((pizza) =>
          pizza.name.toLowerCase().includes(params['searchItem'].toLowerCase())
        );
        //this.Pizza = this.Pizza.filter(pizza=>pizza.price(params['searchItem']));
        if (this.Pizza.length == 0) {
          this.Pizza = this.Pizza.filter((pizza) =>
            pizza.price.toString().includes(params['searchItem'].toString())
          );

          if (this.Pizza.length == 0) {
            this.Pizza = this.Pizza.filter((pizza) =>
              pizza.star.toString().includes(params['searchItem'].toString())
            );
          }
        }
      }
    });
  }

  AddToCart( element, text, id: number) {
   
    element.textContent = text;
    this.store.dispatch(updateCart({ name: this.Pizza[id].name }));
  }
  
  sort(order: any) {
    if (order == 'asc') {
      this.Pizza.sort((p1, p2) => {
        return p1.price > p2.price ? 1 : -1;
      });
    } else {
      this.Pizza.sort((p1, p2) => {
        return p1.price > p2.price ? -1 : 1;
      });
    }
  }

  sort1(order: any) {
    if (order == 'asc1') {
      this.Pizza.sort((p1, p2) => {
        return p1.star > p2.star ? 1 : -1;
      });
    } else {
      this.Pizza.sort((p1, p2) => {
        return p1.star > p2.star ? -1 : 1;
      });
    }
  }

  onClick() {
    this.Pizza = [
      {
        id: 1,
        name: 'Margherita',
        image: 'assets/img1.jpg',
        price: 250,
        size: 'Small',
        star: 5,
      },
      {
        id: 2,
        name: 'Marinara',
        image: 'assets/img4.jpg',
        price: 300,
        size: 'Medium',
        star: 4.5,
      },
      {
        id: 3,
        name: 'Carbonara',
        image: 'assets/img3.jpg',
        price: 200,
        size: 'Small',
        star: 3.5,
      },
      {
        id: 4,
        name: 'Americana',
        image: 'assets/img4.jpg',
        price: 500,
        size: 'Large',
        star: 2.5,
      },
      {
        id: 5,
        name: 'Chicken Mushroom',
        image: 'assets/img1.jpg',
        price: 350,
        size: 'Medium',
        star: 3.5,
      },
      {
        id: 6,
        name: 'Paneer pizza',
        image: 'assets/img2.jpg',
        price: 200,
        size: 'Small',
        star: 2.5,
      },
      {
        id: 7,
        name: 'Vegies pizza',
        image: 'assets/img1.jpg',
        price: 600,
        size: 'Large',
        star: 3,
      },
      {
        id: 8,
        name: 'Pepperoni',
        image: 'assets/img2.jpg',
        price: 500,
        size: 'Medium',
        star: 4,
      },
      {
        id: 9,
        name: 'Perry perry',
        image: 'assets/img3.jpg',
        price: 400,
        size: 'Small',
        star: 2,
      },
    ];
    this.store.dispatch(fetchPizzaList());
  }
}
