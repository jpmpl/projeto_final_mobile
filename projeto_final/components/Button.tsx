import { StyleSheet, View, Pressable, Text } from 'react-native';

type Props = {
  label: string;
    onPress?: () => void; // Optional onPress function
};

export default function Button({ label, onPress }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderBlockColor: '#000',
    backgroundColor: '#25292e',
    borderWidth: 1,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
