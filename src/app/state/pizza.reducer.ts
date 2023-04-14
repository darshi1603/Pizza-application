import { state } from '@angular/animations';
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../user-details/user.model';
import * as PizzaActions from 'src/app/state/pizza.action';
import { Pizzas } from '../home/home.model';

export interface State {
  cartMap: any[];
  user: User;
  Pizza: Pizzas[];
}

const initialState: State = {
  user: null,
  Pizza: [],
  cartMap: [],
};
const reducer = createReducer(
  initialState,
  on(PizzaActions.setPizzaList, (state, { Pizza }) => ({
    ...state,
    Pizza: [...Pizza],
  })),
  on(PizzaActions.setUser, (state, { user }) => ({ 
    ...state,
     user: user 
  })),
  on(PizzaActions.setCartMap, (state, { cartMap }) => ({
    ...state,
    cartMap: cartMap,
  })),
  on(PizzaActions.updateCartSuccess, (state, { cartList }) => ({
    ...state,
    cartMap: [...cartList],
  })),
  on(PizzaActions.addToCart, (state, { cartItem }) => ({
    ...state,
    cartMap: [...state.cartMap, cartItem],
  })),
  on(PizzaActions.clearCartSuccess, (state) => ({ 
    ...state, 
    cartMap: null 
  }))
);
export function pizzaReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
