import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/login/login';
import RecuperarSenhaScreen from '../screens/login/recuperar_senha';
import CadastroScreen from '../screens/login/cadastro';
import TabNavigation from './TabNavigation';
import EventList from '../screens/EventList';
import CreateEventScreen from '../screens/CreateEventScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ConfirmedEventDetailsScreen from '../screens/ConfirmedEventDetailsScreen'; // Verifique o caminho

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator initialRouteName="loginScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="loginScreen" component={LoginScreen} />
            <Stack.Screen name="recuperarSenhaScreen" component={RecuperarSenhaScreen} />
            <Stack.Screen name="cadastroScreen" component={CadastroScreen} />
            <Stack.Screen name="mainTab" component={TabNavigation} />
            <Stack.Screen name="EventList" component={EventList} options={{ title: 'Lista de Eventos' }} />
            <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
            <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
            <Stack.Screen name="ConfirmedEventDetailsScreen" component={ConfirmedEventDetailsScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default Routes;