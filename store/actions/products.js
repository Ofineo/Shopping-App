import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const GET_PRODUCTS = "GET_PRODUCTS";

export const fetchProducts = () => {
  try {
    return async (dispatch) => {
      const response = await fetch(
        "https://react-native-shop-app-aa566.firebaseio.com/products.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const resData = await response.json();

      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            "u1",
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({
        type: GET_PRODUCTS,
        products: loadedProducts,
      });
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://react-native-shop-app-aa566.firebaseio.com/products/${productId}.json`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    dispatch({
      type: DELETE_PRODUCT,
      pId: productId,
    });
  };
};
export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    //any async code you want!!
    const response = await fetch(
      "https://react-native-shop-app-aa566.firebaseio.com/products.json",
      {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl, price }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: { id: resData.name, title, description, imageUrl, price },
    });
  };
};
export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch) => {
    const response = await fetch(
      `https://react-native-shop-app-aa566.firebaseio.com/products/${id}.json`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, imageUrl }),
      }
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    dispatch({
      type: UPDATE_PRODUCT,
      productData: { id, title, description, imageUrl },
    });
  };
};
