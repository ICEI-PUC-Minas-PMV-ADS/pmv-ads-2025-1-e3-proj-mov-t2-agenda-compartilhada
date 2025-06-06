// src/screens/home/GroupDetails.js
import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    ActivityIndicator,
    Alert,
    Modal,
    TextInput,
    LayoutAnimation,
    Platform,
    UIManager,
    Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer'; // decodificar JWT sem libs externas
import Constants from 'expo-constants';
import { API_IP } from '@env';

const BASE_URL =
    Constants?.expoConfig?.extra?.API_URL || 'http://localhost:3000';

// Habilita animações no Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

/* ------------------------------------------------------------------
   Decodifica payload do JWT (base64 → JSON)
------------------------------------------------------------------ */
const decodeJwtPayload = token => {
    try {
        const [, payloadBase64] = token.split('.');
        const json = Buffer.from(payloadBase64, 'base64').toString('utf8');
        return JSON.parse(json);
    } catch {
        return null;
    }
};

/* ------------------------------------------------------------------
   Cartão para 1 membro
------------------------------------------------------------------ */
const MemberRow = ({ member }) => (
    <View style={styles.memberCard}>
        <View style={styles.memberAvatar}>
            <Text style={styles.memberInitials}>{member.initials}</Text>
        </View>
        <View style={styles.memberInfo}>
            <Text style={styles.memberName}>{member.name}</Text>
            <Text
                style={[
                    styles.memberStatus,
                    member.admin ? styles.memberAdmin : styles.memberRegular,
                ]}
            >
                {member.admin ? 'Administrador' : 'Membro'}
            </Text>
        </View>
    </View>
);

const GroupDetails = ({ navigation, route }) => {
    /* ------------- parâmetros recebidos ------------- */
    const { groupId, currentUserRef } = route.params ?? {};

    /* ------------- estado ------------- */
    const [group, setGroup] = useState(null);
    const [membersList, setMembersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const [addMembersModalVisible, setAddMembersModalVisible] = useState(false);
    const [emailsText, setEmailsText] = useState('');
    const [showAllMembers, setShowAllMembers] = useState(false);
    const DEFAULT_VISIBLE = 2;

    /* ------------- helpers ------------- */
    const getInitials = name =>
        name
            .split(' ')
            .map(w => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

    /* ------------- carrega grupo + membros ------------- */
    const fetchGroup = useCallback(async () => {
        setLoading(true);
        try {
            const resGrp = await fetch(`${API_IP}/grupos/${groupId}`);
            if (!resGrp.ok) throw new Error('Não foi possível carregar o grupo');
            const grp = await resGrp.json();
            setGroup(grp);

            const resMem = await fetch(`${API_IP}/grupos/${groupId}/membros`);
            if (!resMem.ok) throw new Error('Não foi possível carregar os membros');
            const members = await resMem.json();

            // deduplica pelo nome (lower-case) e prioriza admin
            const unique = new Map();
            members.forEach(({ user, isAdmin }) => {
                const key = user.name.trim().toLowerCase();
                const stored = unique.get(key);
                if (!stored || (isAdmin && !stored.admin)) {
                    unique.set(key, {
                        id: user._id ?? key,
                        name: user.name,
                        initials: getInitials(user.name),
                        admin: isAdmin,
                    });
                }
            });
            setMembersList(Array.from(unique.values()));
        } catch (err) {
            Alert.alert('Erro', err.message);
        } finally {
            setLoading(false);
        }
    }, [groupId]);

    useEffect(() => {
        fetchGroup();
    }, [fetchGroup]);

    /* ------------- adiciona membros ------------- */
    const handleSaveEmails = async () => {
        const arr = emailsText
            .split(',')
            .map(e => e.trim().toLowerCase())
            .filter(Boolean);
        if (!arr.length) {
            Alert.alert('Atenção', 'Digite ao menos um e-mail.');
            return;
        }

        try {
            const res = await fetch(`${API_IP}/grupos/${groupId}/membros`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ members: arr }),
            });
            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || 'Erro ao adicionar membros');
            }
            await fetchGroup();
            setAddMembersModalVisible(false);
            setEmailsText('');
            setMenuVisible(false);
        } catch (err) {
            Alert.alert('Erro', err.message);
        }
    };

    /* ------------- sair do grupo ------------- */
    const leaveGroup = async () => {
        try {
            let ref = null;

            // Debug: Log para verificar currentUserRef
            console.log('currentUserRef:', currentUserRef);

            // 0) parâmetro recebido ao navegar
            if (currentUserRef) {
                ref = typeof currentUserRef === 'string' ? currentUserRef.toLowerCase() : currentUserRef;
            }

            // 1) cache simples - userEmail
            if (!ref) {
                const userEmail = await AsyncStorage.getItem('userEmail');
                console.log('userEmail from AsyncStorage:', userEmail);
                if (userEmail) {
                    ref = userEmail.toLowerCase();
                }
            }

            // 2) objeto user salvo - usando a chave correta 'usuario'
            if (!ref) {
                const userStr = await AsyncStorage.getItem('usuario');
                console.log('usuario object from AsyncStorage:', userStr);
                if (userStr) {
                    try {
                        const u = JSON.parse(userStr);
                        ref = u?.email?.toLowerCase() || u?._id || u?.id || null;
                        console.log('extracted ref from usuario object:', ref);
                    } catch (parseErr) {
                        console.log('Error parsing usuario object:', parseErr);
                    }
                }
            }

            // 2.1) Tenta também com a chave 'user' (fallback)
            if (!ref) {
                const userStr = await AsyncStorage.getItem('user');
                console.log('user object from AsyncStorage:', userStr);
                if (userStr) {
                    try {
                        const u = JSON.parse(userStr);
                        ref = u?.email?.toLowerCase() || u?._id || u?.id || null;
                        console.log('extracted ref from user object:', ref);
                    } catch (parseErr) {
                        console.log('Error parsing user object:', parseErr);
                    }
                }
            }

            // 3) decodifica JWT
            if (!ref) {
                const token = await AsyncStorage.getItem('token');
                console.log('token from AsyncStorage:', token ? 'exists' : 'not found');
                if (token) {
                    const p = decodeJwtPayload(token);
                    console.log('decoded JWT payload:', p);
                    if (p) {
                        ref = p?.email?.toLowerCase() || p?.userId || p?._id || p?.sub || p?.id || null;
                        console.log('extracted ref from JWT:', ref);
                    }
                }
            }

            // 4) Tenta obter do cache com outras chaves possíveis
            if (!ref) {
                const possibleKeys = ['currentUser', 'loggedUser', 'authUser', 'userInfo', 'userData'];
                for (const key of possibleKeys) {
                    const value = await AsyncStorage.getItem(key);
                    if (value) {
                        try {
                            const parsed = JSON.parse(value);
                            ref = parsed?.email?.toLowerCase() || parsed?._id || parsed?.id || null;
                            if (ref) {
                                console.log(`Found ref in ${key}:`, ref);
                                break;
                            }
                        } catch (err) {
                            // Se não for JSON, talvez seja uma string simples
                            if (value.includes('@') || value.length === 24) { // email ou ObjectId
                                ref = value.toLowerCase();
                                console.log(`Found ref as string in ${key}:`, ref);
                                break;
                            }
                        }
                    }
                }
            }

            // 5) Última tentativa: buscar usuário atual via API
            if (!ref) {
                console.log('Tentando buscar usuário atual via API...');
                try {
                    const token = await AsyncStorage.getItem('token');
                    if (token) {
                        const response = await fetch(`${API_IP}/auth/me`, {
                            method: 'GET',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                        });

                        if (response.ok) {
                            const currentUser = await response.json();
                            console.log('Current user from API:', currentUser);
                            ref = currentUser?.email?.toLowerCase() || currentUser?._id || currentUser?.id || null;
                            console.log('extracted ref from API:', ref);
                        } else {
                            console.log('Failed to get current user from API, status:', response.status);
                        }
                    }
                } catch (apiError) {
                    console.log('Error getting current user from API:', apiError);
                }
            }

            // 6) Se ainda não encontrou, tenta fazer logout e pedir para fazer login novamente
            if (!ref) {
                Alert.alert(
                    'Sessão Expirada',
                    'Sua sessão expirou. Por favor, faça login novamente.',
                    [
                        {
                            text: 'OK',
                            onPress: async () => {
                                // Limpa o AsyncStorage
                                await AsyncStorage.clear();
                                // Navega para a tela de login
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'loginScreen' }],
                                });
                            }
                        }
                    ]
                );
                return;
            }

            console.log('Final ref value:', ref);

            console.log('Making DELETE request to:', `${API_IP}/grupos/${groupId}/membros/${encodeURIComponent(ref)}`);

            const res = await fetch(
                `${API_IP}/grupos/${groupId}/membros/${encodeURIComponent(ref)}`,
                { method: 'DELETE' },
            );

            console.log('Response status:', res.status);

            if (!res.ok) {
                const errorText = await res.text();
                console.log('Error response:', errorText);
                let message = 'Falha ao sair do grupo';
                try {
                    const errorJson = JSON.parse(errorText);
                    message = errorJson.message || message;
                } catch (parseErr) {
                    message = errorText || message;
                }
                throw new Error(message);
            }

            Alert.alert('Você saiu do grupo.');
            // Navega para a tela Home-dashboard
            navigation.navigate('homeDashboard');
        } catch (err) {
            console.error('Error in leaveGroup:', err);
            Alert.alert('Erro', err.message);
        }
    };

    /* ------------- loaders ------------- */
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#7839EE" />
            </View>
        );
    }
    if (!group) {
        return (
            <View style={styles.center}>
                <Text>Grupo não encontrado.</Text>
            </View>
        );
    }

    /* ------------- visíveis / ocultos ------------- */
    const baseMembers = membersList.slice(0, DEFAULT_VISIBLE);
    const hiddenMembers = membersList.slice(DEFAULT_VISIBLE);

    /* ------------- JSX ------------- */
    return (
        <SafeAreaView style={styles.container}>
            {/* ---------- MENU ---------- */}
            <Modal visible={menuVisible} transparent animationType="fade">
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setMenuVisible(false)}
                >
                    <View style={styles.contextMenu}>
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() => {
                                setMenuVisible(false);
                                setTimeout(() => setAddMembersModalVisible(true), 200);
                            }}
                        >
                            <Text style={styles.menuItemText}>Adicionar membros</Text>
                        </TouchableOpacity>
                        <View style={styles.menuDivider} />
                        <TouchableOpacity
                            style={styles.menuItem}
                            onPress={() =>
                                Alert.alert('Confirmar', 'Sair do grupo?', [
                                    { text: 'Cancelar', style: 'cancel' },
                                    {
                                        text: 'Sair',
                                        style: 'destructive',
                                        onPress: leaveGroup,
                                    },
                                ])
                            }
                        >
                            <Text style={styles.menuItemTextDanger}>Sair do grupo</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            {/* ---------- HEADER ---------- */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes do grupo</Text>
                <TouchableOpacity onPress={() => setMenuVisible(true)} style={styles.menuButton}>
                    <Text style={styles.menuButtonText}>⋮</Text>
                </TouchableOpacity>
            </View>

            {/* ---------- CONTEÚDO ---------- */}
            <ScrollView style={styles.content}>
                {/* info grupo */}
                <View style={styles.groupInfoContainer}>
                    <View style={styles.groupAvatar}>
                        {group.foto ? (
                            <Image
                                source={{ uri: group.foto }}
                                style={styles.groupAvatarImage}
                                onError={() => console.log('Erro ao carregar imagem do grupo')}
                            />
                        ) : (
                            <Text style={styles.groupInitials}>{getInitials(group.nome)}</Text>
                        )}
                    </View>
                    <Text style={styles.groupName}>{group.nome}</Text>
                    <Text style={styles.groupMembers}>{group.membros.length} membros</Text>
                </View>

                {/* descrição */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Descrição</Text>
                    <Text style={styles.descriptionText}>
                        {group.descricao || '— Sem descrição —'}
                    </Text>
                </View>

                {/* membros */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Membros</Text>
                    {baseMembers.map(m => (
                        <MemberRow key={m.id} member={m} />
                    ))}
                    {showAllMembers &&
                        hiddenMembers.map(m => <MemberRow key={m.id} member={m} />)}
                    {hiddenMembers.length > 0 && (
                        <TouchableOpacity
                            style={styles.seeAllBtn}
                            onPress={() => {
                                LayoutAnimation.configureNext(
                                    LayoutAnimation.Presets.easeInEaseOut,
                                );
                                setShowAllMembers(prev => !prev);
                            }}
                        >
                            <Text style={styles.seeAllText}>
                                {showAllMembers ? 'Mostrar menos' : 'Ver todos os membros'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>

            {/* ---------- MODAL ADICIONAR MEMBROS ---------- */}
            <Modal
                visible={addMembersModalVisible}
                transparent
                animationType="slide"
                onRequestClose={() => setAddMembersModalVisible(false)}
            >
                <View style={styles.addMembersModalOverlay}>
                    <View style={styles.addMembersModalContent}>
                        <Text style={styles.addMembersTitle}>Adicione os novos membros</Text>
                        <TextInput
                            style={styles.emailsTextArea}
                            placeholder="Emails separados por vírgula"
                            placeholderTextColor="#9A9A9D"
                            multiline
                            value={emailsText}
                            onChangeText={setEmailsText}
                        />
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => {
                                    setAddMembersModalVisible(false);
                                    setEmailsText('');
                                }}
                            >
                                <Text style={styles.cancelButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleSaveEmails}
                            >
                                <Text style={styles.saveButtonText}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

/* ------------------------------------------------------------------
   STYLES
------------------------------------------------------------------ */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },

    /* HEADER */
    header: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start' },
    backButtonText: { fontSize: 20, color: '#9A9A9D' },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
    },
    menuButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-end' },
    menuButtonText: { fontSize: 20, color: '#7839EE' },

    /* CONTEÚDO */
    content: { flex: 1, padding: 16 },

    /* INFO GRUPO */
    groupInfoContainer: { alignItems: 'center', marginBottom: 24 },
    groupAvatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        marginBottom: 12,
        overflow: 'hidden',
    },
    groupAvatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
    },
    groupInitials: { fontSize: 24, color: '#9A9A9D' },
    groupName: { fontSize: 18, fontWeight: '600', color: '#333333', marginBottom: 4 },
    groupMembers: { fontSize: 14, color: '#9A9A9D' },

    /* SEÇÕES */
    sectionContainer: { marginBottom: 20 },
    sectionTitle: { fontSize: 14, fontWeight: '600', color: '#333333', marginBottom: 8 },
    descriptionText: { fontSize: 12, color: '#333333', lineHeight: 18 },

    /* MEMBRO */
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#EEEEEE',
        padding: 12,
        marginBottom: 8,
    },
    memberAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    memberInitials: { fontSize: 8, color: '#9A9A9D' },
    memberInfo: { flex: 1 },
    memberName: { fontSize: 12, fontWeight: '600', color: '#333333' },
    memberStatus: { fontSize: 10 },
    memberAdmin: { color: '#7839EE' },
    memberRegular: { color: '#9A9A9D' },

    /* "VER TODOS" */
    seeAllBtn: { alignItems: 'center', paddingVertical: 8 },
    seeAllText: { fontSize: 12, color: '#7839EE' },

    /* CONTEXT MENU */
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    contextMenu: {
        width: 180,
        backgroundColor: '#FFF',
        borderRadius: 8,
        marginTop: 60,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuItem: { paddingVertical: 12, paddingHorizontal: 16 },
    menuItemText: { fontSize: 12, color: '#333333' },
    menuItemTextDanger: { fontSize: 12, color: '#FF4B4B' },
    menuDivider: { height: 1, backgroundColor: '#EEEEEE' },

    /* MODAL ADICIONAR MEMBROS */
    addMembersModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addMembersModalContent: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    addMembersTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 16,
        textAlign: 'center',
    },
    emailsTextArea: {
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        fontSize: 14,
        color: '#333333',
        marginBottom: 20,
    },
    modalButtons: { flexDirection: 'row', justifyContent: 'space-between' },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: { backgroundColor: '#F4F4F4', marginRight: 8 },
    saveButton: { backgroundColor: '#7839EE', marginLeft: 8 },
    cancelButtonText: { fontSize: 14, fontWeight: '600', color: '#666666' },
    saveButtonText: { fontSize: 14, fontWeight: '600', color: '#FFFFFF' },
});

export default GroupDetails;