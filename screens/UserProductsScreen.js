import React from "react";
import { View, Text, StyleSheet, FlatList, Button, Alert } from "react-native";
import ProductItem from "../components/shop/ProductItem";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/UI/HeaderButton";
import Colors from "../constants/Colors";
import { deleteProduct } from "../store/actions/products";

const UserProductScreen = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  const editProductHandler = (productId) => {
    props.navigation.navigate({
      routeName: "EditProduct",
      params: { productId: productId },
    });
  };

  const deleteHandler = (id) => {
    Alert.alert("Are you sure", "Do you really want to delete this item", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(deleteProduct(id)),
      },
    ]);
  };

  if (userProducts.length === 0) {
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
        <Text>No Products found, why not add some?</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={userProducts}
      key={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          price={itemData.item.price}
          image={itemData.item.imageUrl}
          onSelect={() => editProductHandler(itemData.item.id)}
        >
          <Button
            color={Colors.accent}
            title="Edit"
            onPress={() => editProductHandler(itemData.item.id)}
          />
          <Button
            color="red"
            title="Delete"
            onPress={() => deleteHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductScreen.navigationOptions = (navData) => {
  return {
    title: "Your Products Admin area",
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Add"
          iconName={Platform.OS === "android" ? "md-create" : "ios-create"}
          onPress={() => {
            navData.navigation.navigate({
              routeName: "EditProduct",
            });
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default UserProductScreen;
