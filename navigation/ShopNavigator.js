import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductOverviewScreen from "../screens/ProductOverviewScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import Colors from "../constants/Colors";

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: { screen: ProductOverviewScreen },
    ProductDetail:{screen: ProductDetailScreen},
    Cart:{screen: CartScreen},
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.primary : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
      headerTitleStyle: {
        fontFamily: 'bb2-bold'
      },
      headerBackTitleStyle:{
          fontFamily: 'bb2'
      }
    },
  }
);


export default createAppContainer(ProductNavigator);
