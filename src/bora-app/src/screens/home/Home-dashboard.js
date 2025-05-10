import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    Dimensions,
} from 'react-native';

// Get screen width to calculate spacing
const { width } = Dimensions.get('window');

const HomeDashboard = ({ navigation }) => {
    // Mock data
    const upcomingEvents = [
        {
            id: 1,
            title: 'Happy Hour',
            group: 'Amigos do Trabalho',
            date: 'Hoje',
            time: '19:00',
            participants: 5,
            colorCode: '#7839EE',
        },
        {
            id: 2,
            title: 'Jantar em família',
            group: 'Família',
            date: 'Amanhã',
            time: '20:30',
            participants: 8,
            colorCode: '#53E88B',
        },
    ];

    const userGroups = [
        {
            id: 1,
            name: 'Amigos',
            initials: 'AT',
        },
        {
            id: 2,
            name: 'Família',
            initials: 'F',
        },
        {
            id: 3,
            name: 'Trabalho',
            initials: 'T',
        },
    ];

    // Event card component
    const EventCard = ({ event, onPress }) => (
        <TouchableOpacity
            style={styles.eventCard}
            onPress={onPress}
        >
            <View style={[styles.eventColorBar, { backgroundColor: event.colorCode }]} />
            <View style={styles.eventContent}>
                <Text style={styles.eventDateTime}>{event.date}, {event.time}</Text>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventGroup}>{event.group}</Text>
            </View>
            <View style={styles.participantsCircle}>
                <Text style={styles.participantsCount}>{event.participants}</Text>
            </View>
        </TouchableOpacity>
    );

    // Group circle component
    const GroupCircle = ({ group, onPress }) => (
        <View style={styles.groupCircleContainer}>
            <TouchableOpacity
                style={styles.groupCircle}
                onPress={onPress}
            >
                <Text style={styles.groupInitials}>{group.initials}</Text>
            </TouchableOpacity>
            <Text style={styles.groupName}>{group.name}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    {/* Header line */}
                    <View style={styles.headerLine} />

                    {/* Greeting */}
                    <Text style={styles.greeting}>Olá, Pedro!</Text>

                    {/* Upcoming events section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Próximos eventos</Text>
                        <View style={styles.eventsContainer}>
                            {upcomingEvents.map((event) => (
                                <EventCard
                                    key={event.id}
                                    event={event}
                                    onPress={() => navigation.navigate('GroupDetails', { groupId: event.id })}
                                />
                            ))}
                        </View>
                    </View>

                    {/* Groups section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Meus grupos</Text>
                        <View style={styles.groupsContainer}>
                            {userGroups.map((group) => (
                                <GroupCircle
                                    key={group.id}
                                    group={group}
                                    onPress={() => navigation.navigate(group.id === 1 ? {name: 'myGroups', params: {screen: 'GroupScreen'}} : 'GroupDetails', { groupId: group.id })}
                                />
                            ))}
                            <View style={styles.groupCircleContainer}>
                                <TouchableOpacity
                                    style={styles.addGroupButton}
                                    onPress={() => navigation.navigate('CreateGroup')}
                                >
                                    <Text style={styles.addGroupButtonText}>+</Text>
                                </TouchableOpacity>
                                <Text style={styles.groupName}></Text>
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
    eventsContainer: {
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 15,
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
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    groupCircleContainer: {
        alignItems: 'center',
        marginHorizontal: 5,
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
});

export default HomeDashboard;