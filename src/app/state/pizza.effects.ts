import { Injectable } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { EMPTY, map, switchMap, withLatestFrom } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import * as PizzaActions from 'src/app/state/pizza.action';
import { MainService } from 'src/app/main/main.service';
import { Cart } from '../cart/cart.model';
import { selectCart } from './pizza.selector';

@Injectable()
export class PizzaEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private mainService: MainService
  ) {}

  fetchPizzaList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaActions.fetchPizzaList),
      switchMap(() => {
        return this.mainService.getPizzaList().pipe(
          map((Pizza) => {
            return PizzaActions.setPizzaList({ Pizza: Pizza });
          })
        );
      })
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaActions.addUser),
      switchMap(({ user }) => {
        return this.mainService.addUser(user).pipe(
          map((addedUser) => {
            return PizzaActions.setUser({ user: addedUser });
          })
        );
      })
    )
  );

  fetchUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaActions.fetchUser),
      switchMap(() => {
        return this.mainService.fetchUser().pipe(
          map((user) => {
            return PizzaActions.setUser({ user: user });
          })
        );
      })
    )
  );

  updateCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PizzaActions.updateCart),
        withLatestFrom(this.store.select(selectCart)),
        switchMap(([action, cart]) => {
          let selectedPizza: Cart = { name: action.name, quantity: 1 };
          let cartList: Cart[] = [...cart];

          if (cartList.find((item) => item.name == action.name)) {
            let id = cartList.findIndex((item) => item.name == action.name);
            selectedPizza.quantity = cartList[id].quantity + 1;
            cartList[id] = selectedPizza;

            this.store.dispatch(
              PizzaActions.updateCartSuccess({ cartList: cartList })
            );
            this.store.dispatch(PizzaActions.saveCart());
          } else {
            this.store.dispatch(
              PizzaActions.addToCart({ cartItem: selectedPizza })
            );
            this.store.dispatch(PizzaActions.saveCart());
          }
          return EMPTY;
        })
      ),
    { dispatch: false }
  );
 
  decreaseCount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PizzaActions.decreaseCount),
        withLatestFrom(this.store.select(selectCart)),
        switchMap(([action, cart]) => {
          let cartList: Cart[] = [...cart];
          cartList[action.id] = action.item;
          this.store.dispatch(
            PizzaActions.updateCartSuccess({ cartList: cartList })
          );
          this.store.dispatch(PizzaActions.saveCart());
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  removeCartItem = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PizzaActions.removeCartItem),
        withLatestFrom(this.store.select(selectCart)),
        switchMap(([action, cart]) => {
          let cartList: Cart[] = [...cart];
          cartList.splice(action.id, 1);
          this.store.dispatch(
            PizzaActions.updateCartSuccess({ cartList: cartList })
          );
          this.store.dispatch(PizzaActions.saveCart());
          return EMPTY;
        })
      ),
    { dispatch: false }
  );

  saveCart$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(PizzaActions.saveCart),
        withLatestFrom(this.store.select(selectCart)),
        switchMap(([action, cart]) => {
          return this.mainService.saveCart(cart).pipe(
            map((cart) => {
              console.log(cart);
            })
          );
        })
      ),
    { dispatch: false }
  );

  fetchCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaActions.fetchCart),
      switchMap(() => {
        return this.mainService.fetchCart().pipe(
          map((cart) => {
            let fetchedCart = cart || [];
            return PizzaActions.setCartMap({ cartMap: fetchedCart });
          })
        );
      })
    )
  );

  clearCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PizzaActions.clearCart),
      switchMap(() => {
        return this.mainService
          .clearCart()
          .pipe(map((res) => PizzaActions.clearCartSuccess()));
      })
    )
  );
}
