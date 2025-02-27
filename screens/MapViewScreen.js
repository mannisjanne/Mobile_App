import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MapViewScreen() {
  return (
    <View style={styles.container}>
      <Text>Map View Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
