import { Text, View, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "@/components/Button";
import { GestureHandlerRootView, ScrollView, TextInput } from "react-native-gesture-handler";
import React from "react";
import { TextInputMask } from 'react-native-masked-text';

let restaurants: string[];
        
export default function RegisterRestaurantViewer() {
    const [name, setName] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [addressnumber, setAddressNumber] = React.useState('');
    const [zipcode, setZipCode] = React.useState('');
    const [neighboorhood, setNeighborhood] = React.useState('');
    const [city, setCity] = React.useState('');
    const [state, setState] = React.useState('');
    const [latitude, setLatitude] = React.useState('');
    const [longitude, setLongitude] = React.useState('');
    const [isRestaurant, setIsRestaurant] = React.useState(true);
    const [cnpj, setCnpj] = React.useState('');
    
    const handleRegistration = async () => {
        if (!name || !address || !addressnumber || !zipcode || !state || !neighboorhood || !city || !latitude || !longitude || !cnpj) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        // TODO: Add validation for fields

        try {
            restaurants = JSON.parse(await AsyncStorage.getItem('@restaurants') || '[]');
            if (restaurants.includes(name)) {
                Alert.alert('Error', 'Restaurant already exists');
                return;
            }
            restaurants.push(name);
            await AsyncStorage.setItem('@restaurants', JSON.stringify(restaurants));
            //Alert.alert('Restaurants', `Restaurant ${restaurants} added successfully!`);

            // Check if the restaurant already exists
            const existingUser = await AsyncStorage.getItem(`restaurant@${name}`);
            if (existingUser) {
                Alert.alert('Error', 'Restaurant already exists');
                return;
            }

            // Save data to AsyncStorage
            await AsyncStorage.setItem(`restaurant@${name}`, 
                JSON.stringify({ name, address, addressnumber, zipcode, neighboorhood, city, state, latitude, longitude, cnpj, isRestaurant }));
            Alert.alert('Success', 'Registration successful!');

            // Clear the input fields
            setName('');
            setAddress('');
            setAddressNumber('');
            setZipCode('');
            setNeighborhood('');
            setCity('');
            setState('');
            setLatitude('');
            setLongitude('');
            setCnpj('');
            setIsRestaurant(true);

        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', 'Registration failed: ' + error.message);
            } else {
                Alert.alert('Error', 'Registration failed: ' + String(error));
            }
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                <TextInput 
                    style={styles.input}
                    placeholder="Restaruant Name"
                    onChangeText={newText => setName(newText)}
                    value={name}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Address"
                    onChangeText={newText => setAddress(newText)}
                    value={address}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Address Number"
                    onChangeText={newText => setAddressNumber(newText)}
                    value={addressnumber}
                    keyboardType="numeric"
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Zip Code"
                    onChangeText={newText => setZipCode(newText)}
                    value={zipcode}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Neighborhood"
                    onChangeText={newText => setNeighborhood(newText)}
                    value={neighboorhood}
                />
                <TextInput
                    style={styles.input}
                    placeholder="City"
                    onChangeText={newText => setCity(newText)}
                    value={city}
                />
                <TextInput
                    style={styles.input}
                    placeholder="State"
                    onChangeText={newText => setState(newText)}
                    value={state}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Latitude"
                    onChangeText={newText => setLatitude(newText)}
                    value={latitude}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Longitude"
                    onChangeText={newText => setLongitude(newText)}
                    value={longitude}
                    keyboardType="numeric"
                />
                <TextInputMask
                    type={'cnpj'}
                    value={cnpj}
                    onChangeText={text => setCnpj(text)}
                    placeholder="00.000.000/0000-00"
                    style={{
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    borderRadius: 5,
                    }}
                />
                </ScrollView>
                <Button 
                    label="Register Restaurant"
                    onPress={handleRegistration}
                />
            </View>
            
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    input: {
        width: 300,
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 20,
    },
});