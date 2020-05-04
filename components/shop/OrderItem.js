import React, { useState } from "react";
import Colors from "../../constants/Colors";
import { View, Text, StyleSheet, Platform, Button } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CartItem from "./CartItem";
import Card from "../UI/Card";

const OrderItem = (props) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View>
        <Text style={styles.totalAmount}>{props.amount.toFixed(2)}</Text>
        <Text style={styles.date}>{props.date}</Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        color={Colors.accent}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.detailItem}>
          {props.items.map((item) => (
            <CartItem
              key={item.productId}
              quantity={item.quantity}
              amount={item.sum}
              title={item.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    margin: 15,
  },
  totalAmount: {
    fontFamily: "bb2-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "bb2",
    fontSize: 16,
    color: "#888",
  },
  detailItem: {
    width: "100%",
  },
});

export default OrderItem;
