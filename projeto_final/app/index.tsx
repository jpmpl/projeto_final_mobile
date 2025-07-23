import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { router } from "expo-router";

const PlaceholderImage = require("@/assets/images/menu_logo.jpg");

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button 
          label="Log in"
          onPress={() => router.push("/login")} // Navigate to login screen
          //onPress={() => alert('You pressed a button.')}
        />
        <Link href="/signin">
          <Text style={{ color: "#000", fontSize: 16, marginVertical: 10, textDecorationLine: 'underline' }}>
            Don't have an account? Sign in
          </Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
