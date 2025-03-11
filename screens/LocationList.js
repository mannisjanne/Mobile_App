import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { listenToLocations } from '../firebase/FirestoreController';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Text key={i} style={i <= rating ? styles.starFilled : styles.starEmpty}>
        ★
      </Text>
    );
  }
  return <View style={styles.starContainer}>{stars}</View>;
};

export default function ListLocations() {
  const navigation = useNavigation();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const unsubscribe = listenToLocations(setLocations);
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📍 Sijaintilista</Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.locationCard}>
            <View style={styles.textContainer}>
              <Text style={styles.locationName}>{item.name}</Text>
              <Text style={styles.locationDescription}>{item.description}</Text>
              <StarRating rating={item.rating} />
            </View>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => navigation.navigate('MapViewScreen', { location: item })}

            >
              <Ionicons name="location-outline" size={24} color="#10B981" />
            </TouchableOpacity>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddLocation')}
      >
        <Text style={styles.addButtonText}>➕ Lisää sijainti</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9FAFB' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', marginBottom: 20, textAlign: 'center' },
  locationCard: { 
    backgroundColor: '#FFFFFF', 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 10, 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowRadius: 4, 
    elevation: 3, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  textContainer: { flex: 1 },
  locationName: { fontSize: 18, fontWeight: '600', color: '#374151' },
  locationDescription: { fontSize: 14, color: '#6B7280', marginTop: 4, marginBottom: 4 },
  starContainer: { flexDirection: 'row' },
  starFilled: { color: '#FACC15', fontSize: 20, marginRight: 2 },
  starEmpty: { color: '#D1D5DB', fontSize: 20, marginRight: 2 },
  iconButton: { padding: 8 }, // Ikonin painike
  addButton: { marginTop: 20, backgroundColor: '#2563EB', padding: 15, borderRadius: 12, alignItems: 'center' },
  addButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});
