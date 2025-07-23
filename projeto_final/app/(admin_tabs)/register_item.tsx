import { Text, View, StyleSheet } from "react-native";
import { router } from "expo-router";
import RestaurantPicker from "@/components/RestaurantPicker";
import React from "react";
import ItemRegistrationViewer from "@/components/ItemRegistrationViewer";

export default function RegisterItem() {
    const [selectedRestaurant, setSelectedRestaurant] = React.useState('');
    return (
        <View style={styles.container}>
            <RestaurantPicker
                    selectedValue={selectedRestaurant}
                    onValueChange={(itemValue) => setSelectedRestaurant(itemValue)}
                />
            <ItemRegistrationViewer
                restaurant={selectedRestaurant}
            />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
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