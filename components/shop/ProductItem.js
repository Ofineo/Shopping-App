import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";
import Colors from "../../constants/Colors";

const ProductItem = (props) => {
  const TouchableComponent =
    Platform.OS === "android" && Platform.Version>=21 ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <TouchableComponent onPress={props.onViewDetail} useForeground >
      <View style={styles.product}>
        <Image style={styles.image} source={{ uri: props.image }} />
        <View style={styles.details}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>£{props.price.toFixed(2)}</Text>
        </View>

        <View style={styles.actions}>
          <Button
            color={Colors.accent}
            title="View Details"
            onPress={props.onViewDetail}
          />
          <Button
            color={Colors.accent}
            title="To Cart"
            onPress={props.onAddToCart}
          />
        </View>
      </View>
    </TouchableComponent>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    height: 300,
    margin: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  title: {
    fontSize: 18,
    marginVertical: 4,
    fontFamily:'bb2-bold'
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily:'bb2-bold'
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "25%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
