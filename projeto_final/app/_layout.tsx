import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="signin" options={{ title: 'Signin' }} />
      <Stack.Screen name="(admin_tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="(user_page)" options={{ headerShown: false }}/>
    </Stack>
  );
}
