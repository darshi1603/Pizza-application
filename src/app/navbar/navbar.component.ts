import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pizzas } from 'src/app/home/home.model';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';


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
    private store: Store<AppState>,
    
    //private foodService: FoodService,
   
  ) {}
  searchText: string = '';

  ngOnInit(): void {
   
  }

  onSearch() {
    if (this.searchText) {
      this.router.navigateByUrl('/search/' + this.searchText);
    }
  }

}
