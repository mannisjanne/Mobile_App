import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function LocationList({ navigation }) {
  // Esimerkkidata (päivitetään myöhemmin Firestoreen)
  const locations = [
    { id: '1', name: 'Oulu', description: 'Pohjoinen kaupunki', rating: 5 },
    { id: '2', name: 'New York', description: 'Suuri metropoli', rating: 4 },
  ];

  // Siirtyminen karttanäkymään
  const openMap = (location) => {
    navigation.navigate('MapViewScreen', { location });
  };

  return (
    <View style={styles.container}>
      <Button title="Add new location" onPress={() => navigation.navigate('AddLocation')} />
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => openMap(item)}>
            <Text style={styles.title}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>⭐ {item.rating} / 5</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
