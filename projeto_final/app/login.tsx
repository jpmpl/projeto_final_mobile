import { Text, View, StyleSheet, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "@/components/Button";
import { GestureHandlerRootView, TextInput } from "react-native-gesture-handler";
import React from "react";
import { Link } from "expo-router";
import { router } from "expo-router";

export default function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        let isAdmin = false;
        if (!username || !password) {
            Alert.alert('Error', 'Please enter both username and password.');
            return;
        }

        try {
            // Check if the username exists
            const existingUser = await AsyncStorage.getItem(`user@${username}`);
            if (!existingUser) {
                Alert.alert('Error', 'Username is not registered.');
                return;
            }

            const userData = JSON.parse(existingUser)
            if (password != userData.password) {
                Alert.alert('Error', 'Incorrect password.');
                return;
            }
            isAdmin = userData.isAdmin;

            // Clear the input fields
            setUsername('');
            setPassword('');
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert('Error', 'Log in failed: ' + error.message);
            } else {
                Alert.alert('Error', 'Log in failed: ' + String(error));
            }
        }
        
        if (isAdmin) {
            router.push("/(admin_tabs)");
            return;
        }
        router.push("/(user_page)");
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TextInput 
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={newText => setUsername(newText)}
                    value={username}
                >
                </TextInput>
                <TextInput 
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={newText => setPassword(newText)}
                    value={password}
                />
                <Button 
                    label="Log in"
                    onPress={handleLogin}
                />
                <Link href="/signin">
                    <Text style={{ color: "#000", fontSize: 16, marginVertical: 10, textDecorationLine: 'underline' }}>
                    Don't have an account? Sign in
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