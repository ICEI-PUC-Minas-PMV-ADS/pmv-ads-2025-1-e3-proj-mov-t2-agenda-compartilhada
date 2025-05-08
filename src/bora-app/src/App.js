import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import EventList from './screens/EventList';
import Group from './screens/Group';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'Tela Inicial' }}
        />
        <Stack.Screen 
          name="EventList" 
          component={EventList} 
          options={{ title: 'Lista de Eventos' }}
        />
        <Stack.Screen 
          name="Group" 
          component={Group} 
          options={{ title: 'Tela do Grupo' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
