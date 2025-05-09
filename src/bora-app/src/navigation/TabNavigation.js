// TabNavigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import NotificacoesScreen from '../screens/login/notificacoes';
import TelaTesteScreen from '../screens/login/tela_teste';
import HomeDashboard from "../screens/home/Home-dashboard";
import MyGroups from "../screens/home/MyGroups";
import GroupDetails from "../screens/home/GroupDetails";
import CreateGroup from "../screens/home/CreateGroup";

// Criar um Stack Navigator para telas relacionadas a grupos
const GroupStack = createStackNavigator();

const GroupStackScreen = () => {
    return (
        <GroupStack.Navigator screenOptions={{ headerShown: false }}>
            <GroupStack.Screen name="MyGroups" component={MyGroups} />
            <GroupStack.Screen name="GroupDetails" component={GroupDetails} />
            <GroupStack.Screen name="CreateGroup" component={CreateGroup} />
        </GroupStack.Navigator>
    );
};

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName="homeDashboard"
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#7839EE',
                tabBarInactiveTintColor: '#9A9A9D',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    height: 60,
                    paddingBottom: 8,
                    borderTopWidth: 1,
                    borderTopColor: '#EEEEEE',
                },
            }}
        >
            <Tab.Screen
                name="homeDashboard"
                component={HomeDashboard}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="myGroups"
                component={GroupStackScreen}
                options={{
                    tabBarLabel: 'Meus Grupos',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="notificacoesScreen"
                component={NotificacoesScreen}
                options={{
                    tabBarLabel: 'Notificações',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications-outline" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="telaTesteScreen"
                component={TelaTesteScreen}
                options={{
                    tabBarLabel: 'Configurações',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigation;