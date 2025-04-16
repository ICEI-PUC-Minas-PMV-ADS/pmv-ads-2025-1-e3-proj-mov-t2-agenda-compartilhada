// src/navigation/routes.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importe suas telas
import LoginScreen from '../screens/login/login';
import RecuperarSenhaScreen from '../screens/login/recuperar_senha';
import CadastroScreen from '../screens/login/cadastro';
import NotificacoesScreen from '../screens/login/notificacoes';

const Stack = createStackNavigator();

// Este é o componente Routes que você vai usar no App.js
const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="loginScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="loginScreen" component={LoginScreen} />
      <Stack.Screen name="recuperarSenhaScreen" component={RecuperarSenhaScreen} screenOptions={{ headerShown: false }}/>
      <Stack.Screen name="cadastroScreen" component={CadastroScreen} screenOptions={{ headerShown: false }}/>
      <Stack.Screen name="notificacoesScreen" component={NotificacoesScreen } screenOptions={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default Routes;