import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import LocationList from './screens/LocationList';
import AddLocation from './screens/AddLocation';
import MapViewScreen from './screens/MapViewScreen';
import React from 'react';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LocationList">
        <Stack.Screen name="LocationList" component={LocationList} />
        <Stack.Screen name="AddLocation" component={AddLocation} />
        <Stack.Screen name="MapViewScreen" component={MapViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
