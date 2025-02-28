import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function AddLocation({ navigation, route }) {
  if (!route?.params?.addLocation) {
    console.error('❌ Virhe: addLocation-funktio puuttuu route.params-objektista.');
    return null;
  }

  const { addLocation } = route.params;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);

  const handleStarPress = (star) => {
    console.log('⭐ Valittu tähtimäärä:', star);
    setRating(star);
  };

  const handleSubmit = () => {
    if (!name.trim() || !description.trim()) {
      alert('Täytä nimi ja kuvaus!');
      return;
    }

    const newLocation = {
      name,
      description,
      rating: rating || 0,
    };

    console.log('✅ Uusi sijainti lisätään:', newLocation);
    addLocation(newLocation);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Lisää uusi sijainti</Text>
      <Text style={styles.label}>Sijainnin nimi:</Text>
      <TextInput style={styles.input} placeholder="Esim. Helsinki" value={name} onChangeText={setName} />
      <Text style={styles.label}>Kuvaus:</Text>
      <TextInput style={styles.input} placeholder="Kuvaile paikkaa lyhyesti" value={description} onChangeText={setDescription} multiline />
      <Text style={styles.label}>Arvostelu (0-5 tähteä):</Text>
      <View style={styles.starContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
            <Text style={star <= rating ? styles.starFilled : styles.starEmpty}>★</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
        <Text style={styles.saveButtonText}>💾 Tallenna sijainti</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9FAFB' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#1F2937', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#D1D5DB', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: 16, backgroundColor: '#FFFFFF' },
  starContainer: { flexDirection: 'row', marginBottom: 20 },
  starFilled: { color: '#FACC15', fontSize: 32, marginRight: 5 },
  starEmpty: { color: '#D1D5DB', fontSize: 32, marginRight: 5 },
  saveButton: { backgroundColor: '#2563EB', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  saveButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' },
});
