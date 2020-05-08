import React from "react";
import { useDispatch } from "react-redux";
import * as authAction from "../store/actions/auth";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import ProductOverviewScreen, {
  screenOptions,
} from "../screens/ProductOverviewScreen";
import ProductDetailScreen, {
  productDetailOptions,
} from "../screens/ProductDetailScreen";
import CartScreen, { cartScreenOptions } from "../screens/CartScreen";
import Colors from "../constants/Colors";
import OrdersScreen from "../screens/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductScreen from "../screens/UserProductsScreen";
import EditProductScreen from "../screens/EditProductScreen";
import AuthScreen from "../screens/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

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

const ProdcutsStackNavigator = createStackNavigator();

export const ProductsNavigator = () => {
  return (
    <ProdcutsStackNavigator.Navigator screenOptions={defaultNav}>
      <ProdcutsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductOverviewScreen}
        options={screenOptions}
      />
      <ProdcutsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={productDetailOptions}
      />
      <ProdcutsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProdcutsStackNavigator.Navigator>
  );
};

// const ProductNavigator = createStackNavigator(
//   {
//     ProductsOverview: { screen: ProductOverviewScreen },
//     ProductDetail: { screen: ProductDetailScreen },
//     Cart: { screen: CartScreen },
//   },
//   {
//     navigationOptions: {
//       drawerIcon: (drawerConfig) => (
//         <Ionicons
//           name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
//           size={23}
//           color={drawerConfig.tintColor}
//         />
//       ),
//     },
//     defaultNavigationOptions: defaultNav,
//   }
// );

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
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.accent}
              onPress={() => {
                dispatch(authAction.logout());
                props.navigation.navigate({ routeName: "Auth" });
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);
const AuthNavigator = createStackNavigator(
  {
    Auth: { screen: AuthScreen },
  },
  {
    defaultNavigationOptions: defaultNav,
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});
export default createAppContainer(MainNavigator);
