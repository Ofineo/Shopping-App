import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const GET_ORDERS = "GET_ORDERS";

export const fetchOrders = () => {
  try {
    return async (dispatch,getState) => {
      const userId = getState().auth.userId;
      const response = await fetch(
        `https://react-native-shop-app-aa566.firebaseio.com/orders/${userId}.json`
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const resData = await response.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].carItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: GET_ORDERS,
        orders: loadedOrders,
      });
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addOrder = (carItems, totalAmount) => {
  return async (dispatch,getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    const date = new Date();``
    const response = await fetch(
      `https://react-native-shop-app-aa566.firebaseio.com/orders/${userId}.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: carItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
