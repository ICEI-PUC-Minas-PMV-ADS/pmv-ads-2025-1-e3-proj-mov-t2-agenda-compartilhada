import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import NotificacoesScreen from '../screens/login/notificacoes';
import TelaTesteScreen from '../screens/login/tela_teste';
import NovaTelaScreen from '../screens/login/NovaTela';


const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="notificacoesScreen"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#9758c5',
        tabBarInactiveTintColor: '#2a2331',
        tabBarStyle: {
          backgroundColor: '#fcf6fd',
          height: 50,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen 
        name="notificacoesScreen" 
        component={NotificacoesScreen} 
        options={{
            tabBarLabel: 'Notificações',
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="notifications" size={size} color={color} />
          ),
        }}  
      />
      <Tab.Screen 
        name="telaTesteScreen" 
        component={TelaTesteScreen} 
        options={{
            tabBarLabel: 'Tela de Teste',
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="construct-outline" size={size} color={color} />
          ),
        }}  
      />
      <Tab.Screen 
        name="novaTelaScreen" 
        component={NovaTelaScreen} 
        options={{
            tabBarLabel: 'Nova Tela',
            tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}  
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
