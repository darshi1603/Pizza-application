import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../services/food.service';
import { Pizzas } from '../shared/models/pizza';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  pizza: any;
  Pizzas: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private foodService: FoodService,
   
  ) {}
  searchText: string = '';

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['searchText']) this.searchText = params['searchText'];
    });
  }

  onSearch() {
    if (this.searchText) {
      this.router.navigateByUrl('/search/' + this.searchText);
    }
  }

}
