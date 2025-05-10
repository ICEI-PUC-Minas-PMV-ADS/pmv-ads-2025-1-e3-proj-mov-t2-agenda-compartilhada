import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaView,
} from 'react-native';

const MyGroups = ({ navigation }) => {
    const managedGroups = [
        { id: 1, name: 'Amigos do Trabalho', members: 5, initials: 'AT' },
        { id: 2, name: 'Família', members: 8, initials: 'F' },
    ];

    const participantGroups = [
        { id: 3, name: 'Clube de Corrida', members: 12, initials: 'CC' },
    ];

    const GroupCard = ({ group, onPress }) => (
        <TouchableOpacity
            style={styles.groupCard}
            onPress={onPress}
        >
            <View style={styles.groupAvatar}>
                <Text style={styles.groupInitials}>{group.initials}</Text>
            </View>
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.name}</Text>
                <Text style={styles.groupMembers}>{group.members} membros</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meus Grupos</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView style={styles.content}>
                <TouchableOpacity
                    style={styles.createGroupBtn}
                    onPress={() => navigation.navigate('CreateGroup')}
                >
                    <Text style={styles.createGroupText}>Criar Grupo</Text>
                </TouchableOpacity>

                <View style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar grupo"
                        placeholderTextColor="#9A9A9D"
                    />
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Grupos que administro</Text>
                    <View style={styles.cardsContainer}>
                        {managedGroups.map((group) => (
                            <GroupCard
                                key={group.id}
                                group={group}
                                onPress={() => navigation.navigate(group.id === 1 ? 'GroupScreen' : 'GroupDetails', { groupId: group.id })}
                            />
                        ))}
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Grupos que participo</Text>
                    <View style={styles.cardsContainer}>
                        {participantGroups.map((group) => (
                            <GroupCard
                                key={group.id}
                                group={group}
                                onPress={() => navigation.navigate('GroupDetails', { groupId: group.id })}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    createGroupBtn: {
        backgroundColor: '#7839EE',
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    createGroupText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    searchBar: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#F4F4F4',
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 12,
        color: '#333333',
    },
    sectionContainer: {
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
    },
    cardsContainer: {
        gap: 8,
    },
    groupCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    groupAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    groupInitials: {
        fontSize: 12,
        color: '#9A9A9D',
    },
    groupInfo: {
        flex: 1,
    },
    groupName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
    },
    groupMembers: {
        fontSize: 12,
        color: '#9A9A9D',
    },
    backButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: {
        fontSize: 20,
        color: '#9A9A9D',
    },
});

export default MyGroups;