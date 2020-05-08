import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {ProductsNavigator} from "./ShopNavigator";

import ProductOverviewScreen from "../screens/ProductOverviewScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import UserProductScreen from "../screens/UserProductsScreen";
import EditProductScreen from "../screens/EditProductScreen";
import AuthScreen from "../screens/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import OrdersScreen from "../screens/OrdersScreen";

// const MyStack = createStackNavigator();

const AppNavigator = (props) => {
  const isAuth = useSelector((state) => !!state.auth.token);

  return (
    <NavigationContainer>
      <ProductsNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
