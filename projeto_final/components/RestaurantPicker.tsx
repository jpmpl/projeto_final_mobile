import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useFocusEffect } from '@react-navigation/native';

interface Props {
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const RestaurantPicker: React.FC<Props> = ({ selectedValue, onValueChange }) => {
  const [restaurants, setRestaurants] = useState<string[]>([]);

  useFocusEffect(
    useCallback(() => {
      //console.log('Selected restaurant changed:', selectedValue);
      // This runs every time the tab is clicked (focused)
      loadRestaurants();
    }, [selectedValue])
  );

  useEffect(() => {
    loadRestaurants();
  }, [selectedValue]);

  const loadRestaurants = async () => {
    const data = await AsyncStorage.getItem('@restaurants');
    if (data) {
      const parsed = JSON.parse(data);
      setRestaurants(parsed);
      
      if (parsed.length > 0 && !selectedValue) {
        onValueChange(parsed[0]); // Set the first restaurant as default if none is selected
      }
    }
    else {
      Alert.alert('No restaurants found', 'Please add a restaurant first.');
    }
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}
      >
        {restaurants.length === 0 ? (
          <Picker.Item label="No restaurants" value="gray" />
        ) : (restaurants.map((item, idx) => (
            <Picker.Item label={item} value={item} key={idx} />
          ))
        )}
      </Picker>
    </View>
  );
}

export default RestaurantPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'lightgray',
    borderWidth: 2,
    borderColor: 'gray',
  },
  selected: {
    marginTop: 20,
    fontSize: 16,
    color: 'blue',
  },
});