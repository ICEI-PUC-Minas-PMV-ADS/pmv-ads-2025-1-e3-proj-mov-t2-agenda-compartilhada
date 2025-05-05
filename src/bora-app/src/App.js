import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import HomeDashboard from './screens/Home-dashboard'; // Corrected import name and path
import EventList from './screens/EventList';
import MyGroups from './screens/MyGroups';
import CreateGroup from './screens/CreateGroup';
import GroupDetails from './screens/GroupDetails';

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
                    name="Dashboard"
                    component={HomeDashboard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EventList"
                    component={EventList}
                    options={{ title: 'Lista de Eventos' }}
                />
                <Stack.Screen
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
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}