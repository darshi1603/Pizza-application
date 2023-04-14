import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}
  searchText: any;

  ngOnInit(): void {}

  onSearch() {
    if (this.searchText) {
      this.router.navigateByUrl('/search/' + this.searchText);
    }
  }
}
