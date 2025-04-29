import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import EventList from './screens/EventList';
import CalendarScreen from './screens/CalendarScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import EventTimeScreen from './screens/EventTimeScreen';

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
          name="CalendarScreen" 
          component={CalendarScreen} 
          options={{ title: 'Calendário' }}
          />
        <Stack.Screen
          name="CreateEventScreen" 
          component={CreateEventScreen} 
          options={{ title: 'Criar Evento' }} 
          />
        <Stack.Screen
          name="EventTimeScreen" 
          component={EventTimeScreen} 
          options={{ title: 'Horário do Evento' }} 
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
