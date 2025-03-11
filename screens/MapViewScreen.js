import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapViewScreen({ route }) {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (route.params?.location) {
      setLocation(route.params.location);
    }
  }, [route.params]);
  

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location?.latitude || 60.1695,
            longitude: location?.longitude || 24.9354,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
          
        >
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="Selected Location" />
        </MapView>
      ) : (
        <Text style={styles.errorText}>No location data available.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  errorText: { textAlign: 'center', fontSize: 18, marginTop: 20, color: 'red' },
});
