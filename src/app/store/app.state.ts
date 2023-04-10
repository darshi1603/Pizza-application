import { ActionReducerMap } from "@ngrx/store";
import * as fromPizzaStore  from "src/app/state/pizza.reducer";

export interface AppState{
    pizzaListStore : fromPizzaStore.State
}
export const appReducer : ActionReducerMap<AppState> = {
    pizzaListStore : fromPizzaStore.pizzaReducer
}