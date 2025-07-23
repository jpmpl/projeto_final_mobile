import { Text, View, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "@/components/Button";
import { GestureHandlerRootView, ScrollView, TextInput } from "react-native-gesture-handler";
import React from "react";
import ItemImagePicker from "@/components/ItemImagePicker";

interface Props {
    restaurant: string;
}

const ItemRegistrationViewer: React.FC<Props> = ({ restaurant }) => {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [imageUri, setImageUri] = React.useState<string | null>(null);
    
    const handleRegistration = async () => {
        let items: string[];

        if (!name || !description || !price || !imageUri) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (isNaN(Number(price)) || Number(price) <= 0) {
            Alert.alert('Error', 'Price must be a positive number');
            return;
        }

        try {
            //console.log('RESTAURANT:', restaurant);
            items = JSON.parse(await AsyncStorage.getItem(`items@${restaurant}`) || '[]');
            if (items.includes(name)) {
                Alert.alert('Error', 'Item already exists');
                return;
            }
            items.push(name);
            //console.log('ITEMS:', items);
            //console.log(`items@${restaurant}`)
            // Save the updated items list to AsyncStorage
            await AsyncStorage.setItem(`items@${restaurant}`, JSON.stringify(items));

            // Check if the item already exists
            const existingUser = await AsyncStorage.getItem(`item@${restaurant}@${name}`);
            if (existingUser) {
                Alert.alert('Error', 'Item already exists');
                return;
            }

            // Save data to AsyncStorage
            await AsyncStorage.setItem(`item@${restaurant}@${name}`, 
                JSON.stringify({ name, description, price, imageUri }));

            // Clear the input fields
            setName('');
            setDescription('');
            setPrice('');
            setImageUri('');

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', 'Registration failed: ' + error.message);
            } else {
                Alert.alert('Error', 'Registration failed: ' + String(error));
            }
        }

        Alert.alert('Success', 'Registration successful!');
    };

    return (
        <GestureHandlerRootView style={{ flex: 9 }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <TextInput 
                    style={styles.input}
                    placeholder="Item Name"
                    onChangeText={newText => setName(newText)}
                    value={name}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Description"
                    onChangeText={newText => setDescription(newText)}
                    value={description}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    onChangeText={newText => setPrice(newText)}
                    value={price}
                    keyboardType="numeric"
                />
                <ItemImagePicker
                    imageUri={imageUri}
                    setImageUri={setImageUri}
                />
                </ScrollView>
                <Button 
                    label="Register Item"
                    onPress={handleRegistration}
                />
            </View>
            
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
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

export default ItemRegistrationViewer;