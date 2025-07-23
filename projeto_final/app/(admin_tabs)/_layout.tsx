import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Menu' }} />
      <Tabs.Screen name="register_restaurant" options={{ title: 'Register Restaurant' }} />
      <Tabs.Screen name="register_item" options={{ title: 'Register Item' }} />
    </Tabs>
  );
}
