import { ADD_TO_CART } from "../actions/shop";

const initialStore = {
  products: [],
  cart:[],

};

const shopReducer=(state=initialStore, action)=>{
    switch (action.type){
        case ADD_TO_CART:
            return {...state, cart: cart.concat(action.item)}
        default:
            return state;
    }
}
