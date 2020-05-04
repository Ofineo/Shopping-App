import React from "react";
import { Platform } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createDrawerNavigator } from "react-navigation-drawer";
import ProductOverviewScreen from "../screens/ProductOverviewScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen";
import Colors from "../constants/Colors";
import OrdersScreen from "../screens/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductScreen from "../screens/UserProductsScreen";
import EditProductScreen from "../screens/EditProductScreen";

const defaultNav = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleStyle: {
    fontFamily: "bb2-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "bb2",
  },
};

const ProductNavigator = createStackNavigator(
  {
    ProductsOverview: { screen: ProductOverviewScreen },
    ProductDetail: { screen: ProductDetailScreen },
    Cart: { screen: CartScreen },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNav,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-list" : "ios-list"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNav,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: { screen: UserProductScreen },
    EditProduct: { screen: EditProductScreen },
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig) => (
        <Ionicons
          name={Platform.OS === "android" ? "md-create" : "ios-create"}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions: defaultNav,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(ShopNavigator);
