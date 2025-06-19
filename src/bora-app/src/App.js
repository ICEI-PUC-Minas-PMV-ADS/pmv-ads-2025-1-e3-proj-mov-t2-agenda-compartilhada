import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import EventList from './screens/EventList';
import Group from './screens/Group';
import CalendarScreen from './screens/CalendarScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import EventTimeScreen from './screens/EventTimeScreen';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import EventInfo from './screens/EventInfo';
import AppRoutes from './src/routes'; // substitua pelo seu componente principal


export default function App() {
  return (
    <PaperProvider>
      <AppRoutes />
    </PaperProvider>
  );
}


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
        <Stack.Screen
          name="EventInfo"
          component={EventInfo}
          options={{ title: 'Informações de Eventos' }}
        />
        <Stack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
          options={{ title: 'Calendário' }}
        />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}
