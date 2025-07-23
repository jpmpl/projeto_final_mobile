import { Text, View, StyleSheet, Alert } from "react-native";
import { Checkbox } from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "@/components/Button";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import React from "react";
import { Link } from "expo-router";

export default function SignIn() {
    const [fisrtname, setFirstName] = React.useState('');
    const [lastname, setLastName] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmpassword, setConfirmPassword] = React.useState('');
    const [isAdmin, setIsAdmin] = React.useState(false);
    
    const handleRegistration = async () => {
        if (!username || !password || !fisrtname || !lastname || !confirmpassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmpassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
        // Check if the username already exists
        const existingUser = await AsyncStorage.getItem(`user@${username}`);
        if (existingUser) {
            Alert.alert('Error', 'Username already exists');
            return;
        }

        // Save user data to AsyncStorage
        await AsyncStorage.setItem(`user@${username}`, JSON.stringify({ password, fisrtname, lastname, isAdmin }));
        Alert.alert('Success', 'Registration successful!');

        // Clear the input fields
        setUsername('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setConfirmPassword('');
        setIsAdmin(false);

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
                <TextInput 
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={newText => setUsername(newText)}
                    value={username}
                />
                <TextInput
                    style={styles.input}
                    placeholder="First Name"
                    onChangeText={newText => setFirstName(newText)}
                    value={fisrtname}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Last Name"
                    onChangeText={newText => setLastName(newText)}
                    value={lastname}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={newText => setPassword(newText)}
                    value={password}
                />
                <TextInput 
                    style={styles.input}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    onChangeText={newText => setConfirmPassword(newText)}
                    value={confirmpassword}
                />
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginVertical: 15}}>
                    <Checkbox
                        style={{ marginRight: 10 }}
                        value={isAdmin}
                        onValueChange={setIsAdmin}
                    />
                    <Text>Register as admin</Text>
                </View>
                <Button 
                    label="Sign in"
                    onPress={handleRegistration}
                />
                <Link href="/login">
                    <Text style={{ color: "#000", fontSize: 16, marginVertical: 10, textDecorationLine: 'underline' }}>
                    Already have an account? Log in
                    </Text>
                </Link>
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