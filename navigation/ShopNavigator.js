import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductOverviewScreen from "../screens/ProductOverviewScreen";

const ShopNavigator = createStackNavigator({
  Shop: { screen: ProductOverviewScreen },

});

export default createAppContainer(ShopNavigator);
