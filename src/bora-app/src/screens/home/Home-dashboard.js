// src/screens/home/HomeDashboard.js
import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Dimensions,
    ActivityIndicator,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { API_IP } from '@env';

const { width } = Dimensions.get('window');

const HomeDashboard = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [userGroups, setUserGroups] = useState([]);
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUserData = useCallback(async () => {
        try {
            setLoading(true);
            const userJson = await AsyncStorage.getItem('usuario');
            if (!userJson) throw new Error('Usuário não encontrado no storage');

            const userData = JSON.parse(userJson);
            setUserName(userData.name);

            const groupsRes = await axios.get(`${API_IP}/dashboard/groups/${userData._id}`);
            setUserGroups(groupsRes.data || []);

            const eventsRes = await axios.get(`${API_IP}/dashboard/events/${userData._id}`);
            setUpcomingEvents(eventsRes.data || []);
        } catch (error) {
            console.error('Erro ao buscar dados do usuário:', error);
            Alert.alert('Erro', 'Não foi possível carregar seus dados');
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
        }, [fetchUserData])
    );

    if (loading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#7839EE" />
                <Text style={styles.loadingText}>Carregando...</Text>
            </View>
        );
    }

    const EventCard = ({ event, onPress }) => (
        <TouchableOpacity style={styles.eventCard} onPress={onPress}>
            <View style={[styles.eventColorBar, { backgroundColor: event.colorCode }]} />
            <View style={styles.eventContent}>
                <Text style={styles.eventDateTime}>
                    {typeof event.date === 'string'
                        ? event.date
                        : new Date(event.date).toLocaleDateString('pt-BR')}
                    {', '}
                    {typeof event.time === 'string'
                        ? event.time
                        : new Date(event.time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </Text>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventGroup}>{event.group}</Text>
            </View>
            <View style={styles.participantsCircle}>
                <Text style={styles.participantsCount}>{event.participants}</Text>
            </View>
        </TouchableOpacity>
    );

    const GroupCircle = ({ group, onPress }) => (
        <View style={styles.groupCircleContainer}>
            <TouchableOpacity style={styles.groupCircle} onPress={onPress}>
                <Text style={styles.groupInitials}>{group.initials}</Text>
            </TouchableOpacity>
            <Text style={styles.groupName}>{group.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.headerLine} />
                    <Text style={styles.greeting}>Olá, {userName}!</Text>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Próximos eventos</Text>
                        <View style={styles.eventsContainer}>
                            {upcomingEvents.length > 0 ? (
                                upcomingEvents.map(event => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        onPress={() =>
                                            navigation.navigate('myGroups', {
                                                screen: 'GroupDetails',
                                                params: { groupId: event.id }
                                            })
                                        }
                                    />
                                ))
                            ) : (
                                <Text style={styles.emptyStateText}>
                                    Nenhum evento próximo encontrado
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Meus grupos</Text>
                        <View style={styles.groupsContainer}>
                            {userGroups.map(group => (
                                <GroupCircle
                                    key={group.id}
                                    group={group}
                                    onPress={() =>
                                        navigation.navigate('myGroups', {
                                            screen: 'GroupDetails',
                                            params: { groupId: group.id }
                                        })
                                    }
                                />
                            ))}
                            <View style={styles.groupCircleContainer}>
                                <TouchableOpacity
                                    style={styles.addGroupButton}
                                    onPress={() =>
                                        navigation.navigate('myGroups', {
                                            screen: 'CreateGroupScreen'
                                        })
                                    }
                                >
                                    <Text style={styles.addGroupButtonText}>+</Text>
                                </TouchableOpacity>
                                <Text style={styles.groupName} />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: '#666',
    },
    safeArea: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    headerLine: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginTop: 20,
        marginBottom: 30,
    },
    greeting: {
        fontSize: 28,
        fontWeight: '600',
        color: '#7839EE',
        textAlign: 'center',
        marginBottom: 40,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 15,
    },
    eventsContainer: {
        marginTop: 10,
    },
    eventCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginBottom: 15,
        overflow: 'hidden',
        height: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    eventColorBar: {
        width: 8,
        height: '100%',
    },
    eventContent: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    eventDateTime: {
        fontSize: 12,
        color: '#9A9A9D',
        marginBottom: 4,
    },
    eventTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 4,
    },
    eventGroup: {
        fontSize: 12,
        color: '#9A9A9D',
    },
    participantsCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 15,
    },
    participantsCount: {
        fontSize: 12,
        color: '#9A9A9D',
        fontWeight: '500',
    },
    groupsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        paddingHorizontal: 10,
    },
    groupCircleContainer: {
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 15,
        width: 70,
    },
    groupCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    groupInitials: {
        fontSize: 14,
        color: '#9A9A9D',
        fontWeight: '500',
    },
    groupName: {
        fontSize: 12,
        color: '#333333',
        textAlign: 'center',
    },
    addGroupButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#7839EE',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    addGroupButtonText: {
        fontSize: 24,
        color: '#7839EE',
        fontWeight: '500',
    },
    emptyStateText: {
        textAlign: 'center',
        color: '#9A9A9D',
        fontStyle: 'italic',
        paddingVertical: 20,
    },
});

export default HomeDashboard;
