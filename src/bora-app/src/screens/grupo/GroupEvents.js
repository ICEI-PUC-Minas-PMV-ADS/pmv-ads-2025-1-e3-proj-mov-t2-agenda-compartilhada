import React, { useState, useRef, useEffect } from 'react';
import { Appbar, Avatar, Text, Card } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import GroupCalendar from './GroupCalendar'
import GroupMemberEvents from './GroupMemberEvents';
import axios from 'axios'
import { API_IP } from '@env';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GroupEvents = ({ navigation, route }) => {

    const [itemAtivo, setItemAtivo] = useState(0);
    const menuItems = ['Todos', 'Próximos', 'Passados'];

    const content = [
        <Text>Tela 1</Text>,

        <Text>Tela 2</Text>,

        <Text>Tela 3</Text>,
    ];

    const handleMenuItemPress = (index) => {
        setItemAtivo(index);
    };


    return (
        <View>


            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.menuContainer}>
                    {menuItems.map((item, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handleMenuItemPress(index)}>
                            <Text
                                style={
                                    itemAtivo === index
                                        ? [styles.menuText, styles.activeMenuText]
                                        : styles.menuText
                                }>
                                {item}
                            </Text>

                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>


            {content[itemAtivo]}

        </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16
    },
    menuText: {
        backgroundColor: '#F4F4F4',
        fontSize: 17,
        color: '#9A9A9D',
        borderRadius: 32,
        paddingHorizontal: 24,
        paddingVertical: 8
    },
    activeMenuText: {
        color: '#fff',
        backgroundColor: '#7839EE'
    },
    contentItem: {
        alignItems: 'center',
    },
});

export default GroupEvents;