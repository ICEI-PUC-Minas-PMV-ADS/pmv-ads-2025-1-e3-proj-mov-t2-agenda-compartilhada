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
} from 'react-native';
import Constants from 'expo-constants';
import { API_IP } from '@env'

const BASE_URL =
    Constants?.expoConfig?.extra?.API_URL || 'http://localhost:3000';

const GroupDetails = ({ navigation, route }) => {
    const { groupId } = route.params;
    const [group, setGroup] = useState(null);
    const [membersList, setMembersList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [menuVisible, setMenuVisible] = useState(false);
    const [addMembersModalVisible, setAddMembersModalVisible] = useState(false);
    const [emailsText, setEmailsText] = useState('');

    // extrai iniciais do nome
    const getInitials = nome =>
        nome
            .split(' ')
            .map(w => w[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();

    /* ------------------------------------------------------------
       Helpers de busca
    ------------------------------------------------------------ */
    const fetchGroup = useCallback(async () => {
        setLoading(true);
        try {
            // 1) carrega dados do grupo
            const res = await fetch(`${API_IP}/grupos/${groupId}`);
            if (!res.ok) throw new Error('Não foi possível carregar o grupo');
            const grp = await res.json();
            setGroup(grp);

            // 2) carrega lista de membros com detalhe e flag isAdmin
            const rem = await fetch(`${API_IP}/grupos/${groupId}/membros`);
            if (!rem.ok) throw new Error('Não foi possível carregar os membros');
            const members = await rem.json();

            // monta array no formato esperado pelo componente
            const list = members.map(({ user, isAdmin }) => ({
                id: user._id,
                name: user.name,
                initials: getInitials(user.name),
                admin: isAdmin,
            }));
            setMembersList(list);
        } catch (err) {
            console.error(err);
            Alert.alert('Erro', err.message);
        } finally {
            setLoading(false);
        }
    }, [groupId]);

    useEffect(() => {
        fetchGroup();
    }, [fetchGroup]);

    /* ------------------------------------------------------------
       Adicionar membros
    ------------------------------------------------------------ */
    const handleSaveEmails = async () => {
        // Remove espaços, separa por vírgula e converte para minúsculas
        const emailsArray = emailsText
            .split(',')
            .map(email => email.trim().toLowerCase())
            .filter(email => email.length > 0);

        if (emailsArray.length === 0) {
            Alert.alert('Atenção', 'Digite ao menos um e-mail.');
            return;
        }

        try {
            // Opcional: se usar JWT, inclua o header abaixo
            // const token = await AsyncStorage.getItem('token');
            const res = await fetch(`${API_IP}/grupos/${groupId}/membros`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ members: emailsArray }),
            });

            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || 'Não foi possível adicionar membros');
            }

            // Recarrega grupo + membros
            await fetchGroup();

            // Fecha modal e limpa campo
            setAddMembersModalVisible(false);
            setEmailsText('');
            setMenuVisible(false);
        } catch (err) {
            console.error(err);
            Alert.alert('Erro', err.message);
        }
    };

    const handleAddMembersPress = () => {
        setMenuVisible(false);
        // Aguarda o modal do menu fechar completamente antes de abrir o próximo
        setTimeout(() => {
            setAddMembersModalVisible(true);
        }, 300);
    };

    /* ------------------------------------------------------------
       Renderização condicional
    ------------------------------------------------------------ */
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

    /* ------------------------------------------------------------
       Menus e modais
    ------------------------------------------------------------ */
    const ContextMenu = () => (
        <Modal
            transparent
            visible={menuVisible}
            animationType="fade"
            onRequestClose={() => setMenuVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={() => setMenuVisible(false)}
            >
                <View style={styles.contextMenu}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Editar grupo</Text>
                    </TouchableOpacity>
                    <View style={styles.menuDivider} />
                    <TouchableOpacity
                        style={styles.menuItem}
                        onPress={e => {
                            e.stopPropagation();
                            handleAddMembersPress();
                        }}
                    >
                        <Text style={styles.menuItemText}>Adicionar membros</Text>
                    </TouchableOpacity>
                    <View style={styles.menuDivider} />
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemText}>Silenciar notificações</Text>
                    </TouchableOpacity>
                    <View style={styles.menuDivider} />
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={styles.menuItemTextDanger}>Sair do grupo</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );

    /* ------------------------------------------------------------
       JSX principal
    ------------------------------------------------------------ */
    return (
        <SafeAreaView style={styles.container}>
            <ContextMenu />

            {/* Modal para adicionar membros */}
            {!menuVisible && (
                <Modal
                    transparent
                    visible={addMembersModalVisible}
                    animationType="slide"
                    onRequestClose={() => setAddMembersModalVisible(false)}
                >
                    <View style={styles.addMembersModalOverlay}>
                        <View style={styles.addMembersModalContent}>
                            <Text style={styles.addMembersTitle}>Adicione os novos membros</Text>

                            <TextInput
                                style={styles.emailsTextArea}
                                placeholder="Digite os emails separados por vírgula"
                                placeholderTextColor="#9A9A9D"
                                multiline
                                numberOfLines={4}
                                value={emailsText}
                                onChangeText={setEmailsText}
                                textAlignVertical="top"
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
            )}

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes do grupo</Text>
                <TouchableOpacity style={styles.menuButton} onPress={() => setMenuVisible(true)}>
                    <Text style={styles.menuButtonText}>⋮</Text>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content}>
                {/* Informações do grupo */}
                <View style={styles.groupInfoContainer}>
                    <View style={styles.groupAvatar}>
                        <Text style={styles.groupInitials}>{getInitials(group.nome)}</Text>
                    </View>
                    <Text style={styles.groupName}>{group.nome}</Text>
                    <Text style={styles.groupMembers}>{group.membros.length} membros</Text>
                </View>

                {/* Descrição */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Descrição</Text>
                    <Text style={styles.descriptionText}>
                        {group.descricao || '— Sem descrição —'}
                    </Text>
                </View>

                {/* Membros */}
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Membros</Text>
                    {membersList.map(member => (
                        <View key={member.id} style={styles.memberCard}>
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
                    ))}

                    <TouchableOpacity style={styles.seeAllBtn}>
                        <Text style={styles.seeAllText}>Ver todos os membros</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

/* ------------------------------------------------------------
   Styles
------------------------------------------------------------ */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    backButtonText: { fontSize: 20, color: '#9A9A9D' },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
    },
    menuButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    menuButtonText: { fontSize: 20, color: '#7839EE' },
    content: { flex: 1, padding: 16 },
    groupInfoContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
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
    },
    groupInitials: { fontSize: 24, color: '#9A9A9D' },
    groupName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 4,
    },
    groupMembers: { fontSize: 14, color: '#9A9A9D' },
    sectionContainer: { marginBottom: 20 },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 8,
    },
    descriptionText: {
        fontSize: 12,
        color: '#333333',
        lineHeight: 18,
    },
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
    memberName: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333333',
    },
    memberStatus: { fontSize: 10 },
    memberAdmin: { color: '#7839EE' },
    memberRegular: { color: '#9A9A9D' },
    seeAllBtn: { alignItems: 'center', paddingVertical: 8 },
    seeAllText: { fontSize: 12, color: '#7839EE' },
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
    // Estilos do modal de adicionar membros
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
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#F4F4F4',
        marginRight: 8,
    },
    saveButton: {
        backgroundColor: '#7839EE',
        marginLeft: 8,
    },
    cancelButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666666',
    },
    saveButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default GroupDetails;
