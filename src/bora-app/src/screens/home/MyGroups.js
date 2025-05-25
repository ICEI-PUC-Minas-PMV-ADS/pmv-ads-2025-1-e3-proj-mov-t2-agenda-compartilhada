import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "expo-constants";

const BASE_URL =
    Constants?.expoConfig?.extra?.API_URL || 'http://localhost:3000';

const MyGroups = ({ navigation }) => {
    const [adminGroups, setAdminGroups] = useState([]);
    const [participantGroups, setParticipantGroups] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    // Gera iniciais
    const getInitials = nome =>
        nome
            .split(' ')
            .map(w => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

    useEffect(() => {
        const load = async () => {
            try {
                const raw = await AsyncStorage.getItem('usuario');
                if (!raw) throw new Error('Usuário não encontrado no storage');
                const parsed = JSON.parse(raw);
                const email = parsed.email.trim().toLowerCase();
                const userId = parsed._id || parsed.id; // ajuste se for outra key

                const res = await fetch(
                    `${BASE_URL}/grupos/usuario/${encodeURIComponent(email)}`
                );
                if (!res.ok) throw new Error('Falha ao carregar grupos');
                const data = await res.json();

                // separa em administrados x participados
                const admins = data.filter(g =>
                    Array.isArray(g.grupoAdmins) && g.grupoAdmins.includes(userId)
                );
                const participants = data.filter(
                    g =>
                        Array.isArray(g.membros) &&
                        g.membros.includes(userId) &&
                        !admins.some(a => a._id === g._id)
                );

                setAdminGroups(admins);
                setParticipantGroups(participants);
            } catch (err) {
                console.error(err);
                Alert.alert('Erro', err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#7839EE" />
            </View>
        );
    }

    // Aplica filtro de busca em cada lista
    const filterByName = list =>
        list.filter(g =>
            g.nome.toLowerCase().includes(search.trim().toLowerCase())
        );

    const GroupCard = ({ group, onPress }) => (
        <TouchableOpacity style={styles.groupCard} onPress={onPress}>
            <View style={styles.groupAvatar}>
                <Text style={styles.groupInitials}>{getInitials(group.nome)}</Text>
            </View>
            <View style={styles.groupInfo}>
                <Text style={styles.groupName}>{group.nome}</Text>
                <Text style={styles.groupMembers}>
                    {group.membros.length} membros
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderSection = (title, list) => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {list.length === 0 ? (
                <Text style={{ color: '#9A9A9D', fontStyle: 'italic' }}>
                    Nenhum grupo encontrado.
                </Text>
            ) : (
                list.map(group => (
                    <GroupCard
                        key={group._id}
                        group={group}
                        onPress={() =>
                            navigation.navigate('GroupDetails', { groupId: group._id })
                        }
                    />
                ))
            )}
        </View>
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
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar grupo"
                        placeholderTextColor="#9A9A9D"
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {renderSection('Grupos que administro', filterByName(adminGroups))}
                {renderSection('Grupos que participo', filterByName(participantGroups))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: { width: 30, height: 30, justifyContent: 'center', alignItems: 'center' },
    backButtonText: { fontSize: 20, color: '#9A9A9D' },
    headerTitle: { flex: 1, textAlign: 'center', fontSize: 16, fontWeight: '600', color: '#333333' },
    placeholder: { width: 30 },
    content: { flex: 1, padding: 16 },
    createGroupBtn: {
        backgroundColor: '#7839EE',
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    createGroupText: { color: '#FFFFFF', fontSize: 14, fontWeight: '500' },
    searchBar: {
        flexDirection: 'row',
        height: 40,
        backgroundColor: '#F4F4F4',
        borderRadius: 20,
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    searchInput: { flex: 1, fontSize: 12, color: '#333333' },
    sectionContainer: { marginBottom: 16 },
    sectionTitle: { fontSize: 14, fontWeight: '600', color: '#333333', marginBottom: 8 },
    groupCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginBottom: 8,
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
    groupInitials: { fontSize: 12, color: '#9A9A9D' },
    groupInfo: { flex: 1 },
    groupName: { fontSize: 14, fontWeight: '600', color: '#333333' },
    groupMembers: { fontSize: 12, color: '#9A9A9D' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default MyGroups;
