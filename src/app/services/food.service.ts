import { Injectable } from '@angular/core';
import { Pizzas } from '../shared/models/pizza';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }
   searchText: any;
  getAll():Pizzas[]{
    return ([
      {
        id:1,
        name: "Margherita",
        image: "assets/img1.jpg",
        price: 250,
        size: "Small",
        star: 5
      },
      {
        id:2,
        name: "Marinara",
        image: "assets/img4.jpg",
        price: 300,
        size: "Medium",
        star: 4.5
      },
      {
        id:3,
        name: "Carbonara",
        image: "assets/img3.jpg",
        price: 200,
        size: "Small",
        star: 3.5
      },
      {
        id: 4,
        name: "Americana",
        image: "assets/img4.jpg",
        price: 500,
        size: "Large",
        star: 2.5
      },
      {
        id: 5,
        name: "Chicken Mushroom",
        image: "assets/img1.jpg",
        price: 350,
        size: "Medium",
        star: 3.5
      },
      {
        id: 6,
        name: "Paneer pizza",
        image: "assets/img2.jpg",
        price:200,
        size: "Small",
        star: 2.5
      },
      {
        id: 7,
        name: "Vegies pizza",
        image: "assets/img1.jpg",
        price: 600,
        size: "Large",
        star: 3
      },
      { 
        id: 8,
        name: "Pepperoni",
        image: "assets/img2.jpg",
        price: 500,
        size: "Medium",
        star: 4
      },
      { 
        id: 9,
        name: "Perry perry",
        image: "assets/img3.jpg",
        price: 400,
        size: "Small",
        star: 2
      }
    ]);
  }
}
