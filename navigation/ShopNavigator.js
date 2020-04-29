import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductOverviewScreen from "../screens/ProductOverviewScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import Colors from "../constants/Colors";

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: { screen: ProductOverviewScreen },
    ProductDetail:{screen: ProductDetailScreen},
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

ProductOverviewScreen.navigationOptions ={
    title: 'All products'
}

export default createAppContainer(ProductNavigator);
