import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { HistoryComponent } from './history/history.component';
import { HomeComponent } from './home/home.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path:'search/:searchItem', component:HomeComponent},
  {path: 'login', component:UserDetailsComponent},
  {path: 'cart', component:CartComponent},
  {path:'history', component:HistoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
