import { ImageSourcePropType, StyleSheet, View, Text } from 'react-native';
import { Image } from 'expo-image';
import React, { use, useEffect } from 'react';

type Props = {
  imgSource: ImageSourcePropType;
  name: string;
  description: string;
  price: string;
};

export default function ItemViewer({ imgSource, name, description, price }: Props) {
  
  return (
    <View style={styles.container}>
      <View style={ styles.item }>
        <Image source={imgSource} style={styles.image} />
        <View style={styles.profile}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.price}>R$ {price}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 300,
    marginBottom: 20,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 18,
  },
  profile: {
    height: 100,
    flex: 1,
    justifyContent: 'center',
    borderRadius: 18,
    padding: 10,
    flexDirection: 'column',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 18,
  },
  text: {
    fontSize: 16,
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: 'black',
  },
  price: {
    fontSize: 18,
    color: 'black',
    marginTop: 10,
    alignContent: 'flex-end',
    textAlign: 'right',
  },
});
