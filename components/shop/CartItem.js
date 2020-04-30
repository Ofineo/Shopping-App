import React from "react";
import Colors from "../../constants/Colors";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const TouchableComponent =
  Platform.OS === "android" ? TouchableNativeFeedback : TouchableOpacity;

const CartItem = (props) => {
  return (
    <View style={styles.carItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{props.quantity} </Text>
        <Text style={styles.title}>{props.title}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.amount}>£{props.amount.toFixed(2)}</Text>
        <TouchableComponent
          style={styles.deleteButton}
          onPress={props.onRemove}
        >
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={23}
            color="red"
          />
        </TouchableComponent>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    carItem: {
        padding: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
      },
      itemData: {
        flexDirection: "row",
        alignItems: "center",
      },
      quantity: {
        fontFamily: "bb2",
        color: "#888",
        fontSize: 16,
      },
      title: {
        fontFamily: "bb2-bold",
        fontSize: 16,
      },
      amount: {
        fontFamily: "bb2-bold",
        fontSize: 16,
      },
      deleteButton: {
        marginLeft: 20,
      }
});

export default CartItem;
