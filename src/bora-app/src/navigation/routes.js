import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../screens/login/login';
import RecuperarSenhaScreen from '../screens/login/recuperar_senha';
import CadastroScreen from '../screens/login/cadastro';
import TabNavigation from './TabNavigation';
import ConfirmedEventDetailsScreen from '../screens/ConfirmedEventDetailsScreen'; // Verifique o caminho
import EditarEvento from '../screens/EditarEvento'; // Adicione este import

const Stack = createStackNavigator();

const Routes = () => {
    return (
        <Stack.Navigator initialRouteName="loginScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="loginScreen" component={LoginScreen} />
            <Stack.Screen name="recuperarSenhaScreen" component={RecuperarSenhaScreen} />
            <Stack.Screen name="cadastroScreen" component={CadastroScreen} />
            <Stack.Screen name="mainTab" component={TabNavigation} />
            <Stack.Screen name="ConfirmedEventDetailsScreen" component={ConfirmedEventDetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="EditarEvento" component={EditarEvento} />
        </Stack.Navigator>
    );
};

export default Routes;