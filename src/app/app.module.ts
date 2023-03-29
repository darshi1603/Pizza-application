import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { FormsModule } from '@angular/forms';
import {RatingModule} from 'ng-starrating';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccessPageComponent } from './success-page/success-page.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UserDetailsComponent,
    CartComponent,
    HistoryComponent,
    CheckoutComponent,
    SuccessPageComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RatingModule,
    Ng2SearchPipeModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
