import { createSelector } from "@ngrx/store";
import { AppState } from "src/app/store/app.state";

export const selectFeature = (state : AppState) => state.pizzaListStore
export const selectUser = createSelector(selectFeature , 
    state => state.user
    );
export const selectPizzaList = createSelector(selectFeature ,
     state => state.Pizza
     );
export const selectCart = createSelector(selectFeature , 
    state => state.cartMap
    );