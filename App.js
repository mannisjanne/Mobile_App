import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListLocations from './screens/LocationList';
import AddLocation from './screens/AddLocation';
import MapViewScreen from './screens/MapViewScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListLocations" component={ListLocations} options={{ title: 'Sijainnit' }} />
        <Stack.Screen name="AddLocation" component={AddLocation} options={{ title: 'Lisää sijainti' }} />
        <Stack.Screen name="MapViewScreen" component={MapViewScreen} options={{ title: 'Kartta näkymä' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
