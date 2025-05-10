import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import EventList from './screens/EventList';
<<<<<<< HEAD
import Group from './screens/Group';
import CalendarScreen from './screens/CalendarScreen';
import CreateEventScreen from './screens/CreateEventScreen';
import EventTimeScreen from './screens/EventTimeScreen';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppRoutes from './src/routes'; // substitua pelo seu componente principal

export default function App() {
  return (
    <PaperProvider>
      <AppRoutes />
    </PaperProvider>
  );
}

=======
// import MyGroups from './screens/MyGroups';
// import CreateGroup from './screens/CreateGroup';
// import GroupDetails from './screens/GroupDetails';
import ProfileScreen from './screens/ProfileScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ConviteScreen from './screens/ConviteScreen';
>>>>>>> feature/profile_notifications

const Stack = createStackNavigator();

export default function App() {
<<<<<<< HEAD
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
=======
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
                {/* <Stack.Screen
                    name="MyGroups"
                    component={MyGroups}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CreateGroup"
                    component={CreateGroup}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="GroupDetails"
                    component={GroupDetails}
                    options={{ headerShown: false }}
                /> */}
                <Stack.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Notifications"
                    component={NotificationsScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Convite" 
                    component={ConviteScreen}
                    options={{
                        title: 'Convidar Pessoas',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
>>>>>>> feature/profile_notifications
