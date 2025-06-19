// TabNavigation.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

import NotificacoesScreen from '../screens/login/notificacoes';
import HomeDashboard from "../screens/home/Home-dashboard";
import MyGroups from "../screens/home/MyGroups";
import GroupDetails from "../screens/home/GroupDetails";
import CreateGroup from "../screens/home/CreateGroup";


// Telas Daianne
import CalendarScreen from '../screens/CalendarScreen'
import CreateEventScreen from '../screens/CreateEventScreen'
import EventTimeScreen from '../screens/EventTimeScreen';

// Telas Grace
import ProfileScreen from '../screens/ProfileScreen'
import ConviteScreen from '../screens/ConviteScreen'

// Telas Letícia
import EventInfo from '../screens/EventInfo'
import EventList from '../screens/EventList';

// Telas Milton
import GroupScreen from "../screens/grupo/GroupScreen"
import CreateGroupEvent from '../screens/grupo/CreateGroupEvent';

// Criar um Stack Navigator para telas relacionadas a grupos
const GroupStack = createStackNavigator();

const GroupStackScreen = () => {
    
    return (
        <GroupStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="MyGroups">
            <GroupStack.Screen name="MyGroups" component={MyGroups} />
            <GroupStack.Screen name="GroupDetails" component={GroupDetails} />
            <GroupStack.Screen name="CreateGroup" component={CreateGroup} />
            <GroupStack.Screen name="GroupScreen" component={GroupScreen} />
            <GroupStack.Screen name="CreateGroupEvent" component={CreateGroupEvent} />
        </GroupStack.Navigator>
    );
};

const EventStack = createStackNavigator();

const CalendarEventStack = () => {
    return (
        <EventStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CalendarScreen">
            <EventStack.Screen name="CalendarScreen" component={CalendarScreen} />
            <EventStack.Screen name="CreateEventScreen" component={CreateEventScreen} />
            <EventStack.Screen name="EventList" component={EventList} />
        </EventStack.Navigator>
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

                    // Garante que "MyGroups" será acionado ao pressionar o botão na navbar
                    tabBarButton: (props) => {
                        const navigation = useNavigation();
                        return (
                            <TouchableOpacity
                                {...props}
                                onPress={() => {
                                    navigation.navigate('myGroups', {screen: 'MyGroups'})
                                }}
                            />
                        )
                    }
                }}
            />
            {/* <Tab.Screen
                name="notificacoesScreen"
                component={NotificacoesScreen}
                options={{
                    tabBarLabel: 'Notificações',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications-outline" size={size} color={color} />
                    ),
                }}
            /> */}
            {/*
            <Tab.Screen
                name="telaTesteScreen"
                component={TelaTesteScreen}
                options={{
                    tabBarLabel: 'Configurações',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings-outline" size={size} color={color} />
                    ),
                }}
            />*/}

            <Tab.Screen
                name="calendarEvent"
                component={CalendarEventStack}
                options={{
                    tabBarLabel: 'Calendário',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-number-outline" size={size} color={color} />
                    ),

                    // Garante que "CalendarScreen" será acionado ao pressionar o botão na navbar
                    tabBarButton: (props) => {
                        const navigation = useNavigation();
                        return (
                            <TouchableOpacity
                                {...props}
                                onPress={() => {
                                    navigation.navigate('calendarEvent', {screen: 'CalendarScreen'})
                                }}
                            />
                        )
                    }
                }}
            />

            {/* <Tab.Screen
                name="calendarScreen"
                component={CalendarScreen}
                options={{
                    tabBarLabel: 'Calendário',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar-number-outline" size={size} color={color} />
                    ),
                }}
            /> */}
            {/* <Tab.Screen
                name="conviteScreen"
                component={ConviteScreen}
                options={{
                    tabBarLabel: 'Convite',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="construct-outline" size={size} color={color} />
                    ),
                }}
            /> */}
            <Tab.Screen
                name="profileScreen"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons 
                            name={focused ? "person-circle" : "person-circle-outline"}
                            size={size} 
                            color={color} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="eventInfo"
                component={EventInfo}
                options={{
                    tabBarLabel: 'Info',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="construct-outline" size={size} color={color} />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
};

export default TabNavigation;