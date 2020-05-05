import PRODUCTS from "../../data/dummy-data";
import {
  DELETE_PRODUCT,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  GET_PRODUCTS,
} from "../actions/products";
import Product from "../../models/product";

const initialState = {
  availableProducts: [],
  userProducts: []
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        availableProducts: action.products,
        userProducts: action.userProducts
      }
    case CREATE_PRODUCT:
      const newProduct = new Product(
        new Date().toString(),
        action.productData.ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        action.productData.price
      );
      return {
        ...state,
        availableProducts: state.availableProducts.concat(newProduct),
        userProducts: state.userProducts.concat(newProduct),
      };
    case UPDATE_PRODUCT:
      const userProductIndex = state.userProducts.findIndex(
        (prod) => prod.id === action.productData.id
      );
      const availableProductIndex = state.availableProducts.findIndex(
        (prod) => prod.id === action.productData.id
      );

      const updatedProduct = new Product(
        action.productData.id,
        state.userProducts[userProductIndex].ownerId,
        action.productData.title,
        action.productData.imageUrl,
        action.productData.description,
        state.userProducts[userProductIndex].price
      );
      const updatedUserProducts = [...state.userProducts];
      updatedUserProducts[userProductIndex] = updatedProduct;
      const updatedAvailableProducts = [...state.availableProducts];
      updatedAvailableProducts[availableProductIndex] = updatedProduct;

      return {
        ...state,
        availableProducts: updatedAvailableProducts,
        userProducts: updatedUserProducts,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(
          (prod) => prod.id != action.pId
        ),
        availableProducts: state.availableProducts.filter(
          (prod) => prod.id != action.pId
        ),
      };

    default:
      return state;
  }
};

export default productsReducer;
