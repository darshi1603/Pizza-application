import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as PizzaActions from 'src/app/state/pizza.action';
import { AppState } from 'src/app/store/app.state';
import { User } from './user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userForm: FormGroup;
  constructor(private store: Store<AppState>, private router: Router) { }

  ngOnInit(): void {
    this.userForm= new FormGroup({
      'firstname': new FormControl(null, [Validators.required]),
      'lastname': new FormControl(null, [Validators.required]),
      'contact': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required])
    })
  }
  onSubmit() {
    const user: User = {
      firstname: this.userForm.value['firstname'],
      lastname: this.userForm.value['lastname'],
      email: this.userForm.value['email'],
      address: this.userForm.value['address'],
      contact: this.userForm.value['contact']

    }
    
    this.store.dispatch(PizzaActions.addUser({ user: user }))
    this.router.navigate(['home'])
  }
}
