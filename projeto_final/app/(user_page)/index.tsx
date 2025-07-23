import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { router } from "expo-router";
import RestaurantPicker from "@/components/RestaurantPicker";
import React from "react";
import MenuViewer from "@/components/MenuViewer";

const PlaceholderImage = require("@/assets/images/menu_logo.jpg");

export default function AdminMenu() {
  const [selectedRestaurant, setSelectedRestaurant] = React.useState('');
  return (
    <View style={styles.container}>
      <RestaurantPicker
          selectedValue={selectedRestaurant}
          onValueChange={(itemValue) => setSelectedRestaurant(itemValue)}
      />
      <MenuViewer restaurant={selectedRestaurant} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 28,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
