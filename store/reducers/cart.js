import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cartItem";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let cartItem;
      if (state.items[action.item.id]) {
        //already have the item in the cart
        cartItem = new CartItem(
          state.items[action.item.id].quantity + 1,
          action.item.price,
          action.item.title,
          state.items[action.item.id].sum + action.item.price
        );
      } else {
        cartItem = new CartItem(
          1,
          action.item.price,
          action.item.title,
          action.item.price
        );
      }
      return {
        ...state,
        items: { ...state.items, [action.item.id]: cartItem },
        totalAmount: state.totalAmount + action.item.price,
      };

    case REMOVE_FROM_CART:
      const newState = { ...state.items };
      if (state.items[action.itemId].quantity > 1) {
        newState[action.itemId].quantity = newState[action.itemId].quantity - 1;
        newState[action.itemId].sum =
          newState[action.itemId].sum - newState[action.itemId].productPrice;
      } else {
        delete newState[action.itemId];
      }
      return {
        ...state,
        items: newState,
        totalAmount:
          state.totalAmount - state.items[action.itemId].productPrice,
      };
    default:
      return state;
  }
};
