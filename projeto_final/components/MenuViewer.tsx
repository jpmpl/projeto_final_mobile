import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView, ScrollView, TextInput } from "react-native-gesture-handler";
import { useFocusEffect } from '@react-navigation/native';
import ItemViewer from './ItemViewer';

interface Props {
    restaurant: string;
}

const MenuViewer: React.FC<Props> = ({ restaurant }) => {
    const [items, setItems] = useState<any[]>([]);

    useFocusEffect(
        useCallback(() => {
          // This runs every time the tab is clicked (focused)
          loadItems();
        }, [ restaurant ])
    );

    useEffect(() => {
        loadItems();
    }, [restaurant]);

    const loadItems = async () => {
        let itemsData: any[] = [];

        //console.log('LOAD ITEMS FOR RESTAURANT:', restaurant);
        //console.log(`items@${restaurant}`);
        const data = await AsyncStorage.getItem(`items@${restaurant}`);
        //console.log('DATA:', data);
        if (data) {
            const parsed = JSON.parse(data);
            for (let i = 0; i < parsed.length; i++) {
                const item = await AsyncStorage.getItem(`item@${restaurant}@${parsed[i]}`);
                if (item) {
                    const itemData = JSON.parse(item);
                    //console.log('ITEM DATA:', itemData);
                    itemsData.push(itemData);
                }
            }
        }
        setItems(itemsData);
    };

    return (
        <GestureHandlerRootView style={{ flex: 9 }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Menu for {restaurant}</Text>
                    {items.length === 0 ? (
                        <Text>No items available</Text>
                    ) : (
                        items.map((item, index) => (
                            <ItemViewer 
                                key={index} 
                                imgSource={{ uri: item.imageUri }} 
                                name={item.name} 
                                description={item.description} 
                                price={item.price}
                            />
                        ))
                    )}
                </ScrollView>
            </View>
            
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    input: {
        width: 300,
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});

export default MenuViewer;