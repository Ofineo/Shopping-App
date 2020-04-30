import React from "react";
import { View, StyleSheet, FlatList, Platform } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../components/shop/ProductItem";
import { addToCart } from "../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { HeaderButton } from "../components/UI/HeaderButton";

const ProductOverviewScreen = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onViewDetail={() => {
            props.navigation.navigate({
              routeName: "ProductDetail",
              params: {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              },
            });
          }}
          onAddToCart={() => dispatch(addToCart(itemData.item))}
        />
      )}
    />
  );
};

ProductOverviewScreen.navigationOptions = navData => {
  return {
    title: 'All Products',
    headerRight:()=> (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
              navData.navigation.navigate('Cart')
          }}
        />
      </HeaderButtons>
    )
  };
};

export default ProductOverviewScreen;
