import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/navigation/routes'; // Importa suas rotas

export default function App() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}