import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { addTodo } from '../firebase/FirestoreController';

// Muista korvata YOUR_API_KEY omalla avaimellasi
const OPENCAGE_API_KEY = 'YOUR_API_KEY';

export default function AddLocation() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');

  // Hakee koordinaatit annetun osoitteen perusteella
  const getCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(address)}&key=${OPENCAGE_API_KEY}`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error('Sijaintia ei löytynyt.');
      }
    } catch (error) {
      console.error('Geokoodausvirhe:', error);
      Alert.alert('Virhe', 'Sijaintia ei voitu hakea.');
      return null;
    }
  };

  // Käsittelee sijainnin tallentamisen
  const handleSubmit = async () => {
    if (!name.trim() || !description.trim() || !rating.trim()) {
      Alert.alert('Virhe', 'Täytä kaikki kentät!');
      return;
    }

    try {
      const coords = await getCoordinates(name);
      if (!coords) return; // Lopeta, jos geokoodaus epäonnistui

      await addTodo({
        name,
        description,
        rating: parseFloat(rating),
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      Alert.alert('Onnistui', 'Sijainti lisätty!');
      navigation.goBack();
    } catch (error) {
      console.error('Firestore-virhe:', error);
      Alert.alert('Virhe', 'Tallennus epäonnistui.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nimi</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Paikan nimi" />

      <Text style={styles.label}>Kuvaus</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} placeholder="Lyhyt kuvaus" />

      <Text style={styles.label}>Arvio (1-5)</Text>
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={setRating}
        placeholder="Anna arvio (1-5)"
        keyboardType="numeric"
      />

      <Button title="Lisää sijainti" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9FAFB' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', padding: 10, borderRadius: 8, marginTop: 5 },
});
