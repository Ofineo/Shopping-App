import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import CartItem from "../components/shop/CartItem";
import { deleteItem } from "../store/actions/cart";
import { addOrder } from "../store/actions/orders";
import Card from "../components/UI/Card";

const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const cartTotal = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const cartItemsArray = [];
    for (const key in state.cart.items) {
      cartItemsArray.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return cartItemsArray.sort((a, b) => (a.productId > b.productId ? 1 : -1));
  });

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(deleteItem(itemData.item.productId));
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.sumaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            £{Math.round((cartTotal.toFixed(2) * 100) / 100)}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.accent} />
        ) : (
          <Button
            color={Colors.primary}
            title="Order now"
            disabled={cartItems.length === 0}
            onPress={() => dispatch(addOrder(cartItems, cartTotal))}
          />
        )}
      </Card>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.productPrice}
            onRemove={sendOrderHandler}
            deletable
          />
        )}
      />
    </View>
  );
};

export const cartScreenOptions = () => {
  return { title: "Your Cart" };
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  sumaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.accent,
  },
});

export default CartScreen;
