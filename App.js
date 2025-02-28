import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LocationList from './screens/LocationList';
import AddLocation from './screens/AddLocation';
import MapViewScreen from './screens/MapViewScreen';
import { useFireTodos } from './firebase/FirestoreController';

const Stack = createStackNavigator();

export default function App() {

    const todos = useFireTodos();

    console.log(todos);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LocationList" component={LocationList} options={{ title: 'Sijaintilista' }} />
        <Stack.Screen name="AddLocation" component={AddLocation} options={{ title: 'Lisää sijainti' }} />
        <Stack.Screen name="MapViewScreen" component={MapViewScreen} options={{ title: 'Kartta' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
