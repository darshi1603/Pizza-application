import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  constructor(private router: Router){}
  @ViewChild('f')
  signUpForm!: NgForm;
  user={
    firstname:'',
    lastname:'',
    email:'',
    address:'',
    phoneNo:'',
    country:'',
    state:'',
    city:'',
    street:'',
    pinc:''
  };
  
  // onSubmit(form: NgForm){
  //   console.log(form);
  // }

  onSubmit(){
    //console.log(form)  //Accessing the form with viewChild
    //Extract form data
    let submitted = true;
    if(submitted){
      this.router.navigate(['home']);
    }
    this.user.firstname = this.signUpForm.value.userData.FirstName;
    this.user.lastname= this.signUpForm.value.userData.LastName;
    this.user.email = this.signUpForm.value.userData.email
    this.user.address = this.signUpForm.value.userData.Address;
    this.user.phoneNo = this.signUpForm.value.userData.PhoneNumber;
    this.user.country = this.signUpForm.value.userData.country;
    this.user.state = this.signUpForm.value.userData.state;
    this.user.city = this.signUpForm.value.userData.city;
    this.user.street = this.signUpForm.value.userData.street;
    this.user.pinc = this.signUpForm.value.userData.pinc;

    localStorage.setItem("email", this.user.firstname);
    localStorage.setItem("userDetails", JSON.stringify(this.user));

    // localStorage.setItem("LastName", this.user.lastname);
    // localStorage.setItem("Email", this.user.email);
    // localStorage.setItem("Address", this.user.address);
    // localStorage.setItem("phoneNo", this.user.phoneNo);
    // localStorage.setItem("Country", this.user.country);
    // localStorage.setItem("State", this.user.state);
    // localStorage.setItem("City", this.user.city);
    // localStorage.setItem("Street", this.user.street);
    // localStorage.setItem("Pincode", this.user.pinc);
  

    //reset form data
    this.signUpForm.reset();

  }
}
