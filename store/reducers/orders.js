import { ADD_ORDER, GET_ORDERS } from "../actions/orders";
import Order from "../../models/order";

const initialSate = {
  orders: [],
};

export default ordersReducer = (state = initialSate, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return {
        orders: action.orders,
      };

    case ADD_ORDER:
      const newOrder = new Order(
        action.orderData.id,
        action.orderData.items,
        action.orderData.amount,
        action.orderData.date
      );
      return { ...state, orders: state.orders.concat(newOrder) };
    default:
      return state;
  }
};
