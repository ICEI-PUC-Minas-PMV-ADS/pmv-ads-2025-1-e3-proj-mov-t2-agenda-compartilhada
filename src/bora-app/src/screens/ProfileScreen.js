import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    TextInput,
    ScrollView,
    Modal,
    Alert
} from 'react-native';

const ProfileScreen = ({ navigation }) => {
    // Estado do usuário
    const [user, setUser] = useState({
        name: 'João Silva',
        email: 'joao.silva@email.com',
        phone: '(31) 98765-4321',
        bio: 'Entusiasta de tecnologia e amante de eventos sociais.',
        avatar: null, // No exemplo vamos usar um placeholder
        preferences: {
            theme: 'light',
            notifications: true,
            privacy: 'public'
        }
    });

    // Estados para controle da interface
    const [isEditing, setIsEditing] = useState(false);
    const [tempUser, setTempUser] = useState({ ...user });
    const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'activity', 'settings'
    const [settingsModalVisible, setSettingsModalVisible] = useState(false);
    
    // Dados simulados de atividades
    const activityHistory = [
        { id: 1, type: 'event_created', title: 'Criou o evento Happy Hour', date: '25/04/2025', time: '14:30' },
        { id: 2, type: 'group_joined', title: 'Entrou no grupo Clube de Corrida', date: '23/04/2025', time: '09:15' },
        { id: 3, type: 'event_attended', title: 'Participou do evento Jantar em Família', date: '20/04/2025', time: '20:30' },
        { id: 4, type: 'group_created', title: 'Criou o grupo Amigos do Trabalho', date: '15/04/2025', time: '11:45' },
        { id: 5, type: 'profile_updated', title: 'Atualizou a foto de perfil', date: '10/04/2025', time: '16:20' },
    ];

    // Função para salvar as alterações
    const handleSaveChanges = () => {
        // Aqui seria implementada a lógica para salvar no backend
        setUser({ ...tempUser });
        setIsEditing(false);
        Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
    };

    // Função para cancelar as alterações
    const handleCancelEdit = () => {
        setTempUser({ ...user });
        setIsEditing(false);
    };

    // Renderizar o formulário de edição
    const renderEditForm = () => (
        <View style={styles.editForm}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            
            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={tempUser.name}
                onChangeText={(text) => setTempUser({ ...tempUser, name: text })}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={tempUser.email}
                onChangeText={(text) => setTempUser({ ...tempUser, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <Text style={styles.label}>Telefone</Text>
            <TextInput
                style={styles.input}
                value={tempUser.phone}
                onChangeText={(text) => setTempUser({ ...tempUser, phone: text })}
                keyboardType="phone-pad"
            />

            <Text style={styles.sectionTitle}>Sobre Mim</Text>
            
            <Text style={styles.label}>Biografia</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={tempUser.bio}
                onChangeText={(text) => setTempUser({ ...tempUser, bio: text })}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                    <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    // Renderizar o perfil (visualização)
    const renderProfile = () => (
        <View style={styles.profileInfo}>
            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Informações Pessoais</Text>
                
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Nome:</Text>
                    <Text style={styles.infoValue}>{user.name}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email:</Text>
                    <Text style={styles.infoValue}>{user.email}</Text>
                </View>
                
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Telefone:</Text>
                    <Text style={styles.infoValue}>{user.phone}</Text>
                </View>
            </View>
            
            <View style={styles.bioContainer}>
                <Text style={styles.sectionTitle}>Sobre Mim</Text>
                <Text style={styles.bioText}>{user.bio}</Text>
            </View>

            <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
            >
                <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
            
            {/* Estatísticas do usuário */}
            <View style={styles.statsContainer}>
                <View style={styles.statsItem}>
                    <Text style={styles.statsNumber}>12</Text>
                    <Text style={styles.statsLabel}>Eventos</Text>
                </View>
                <View style={styles.statsItem}>
                    <Text style={styles.statsNumber}>5</Text>
                    <Text style={styles.statsLabel}>Grupos</Text>
                </View>
                <View style={styles.statsItem}>
                    <Text style={styles.statsNumber}>28</Text>
                    <Text style={styles.statsLabel}>Conexões</Text>
                </View>
            </View>
        </View>
    );
    
    // Renderizar o histórico de atividades
    const renderActivityHistory = () => (
        <View style={styles.activityContainer}>
            <Text style={styles.sectionTitle}>Histórico de Atividades</Text>
            
            {activityHistory.map((activity, index) => (
                <View 
                    key={activity.id} 
                    style={[
                        styles.activityItem, 
                        index < activityHistory.length - 1 && styles.activityItemWithBorder
                    ]}
                >
                    <View style={styles.activityIcon}>
                        <Text style={styles.activityIconText}>
                            {activity.type.includes('event') ? '📅' : 
                             activity.type.includes('group') ? '👥' : '👤'}
                        </Text>
                    </View>
                    <View style={styles.activityInfo}>
                        <Text style={styles.activityTitle}>{activity.title}</Text>
                        <Text style={styles.activityTime}>
                            {activity.date} às {activity.time}
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
    
    // Renderizar as configurações do usuário
    const renderSettings = () => (
        <View style={styles.settingsContainer}>
            <Text style={styles.sectionTitle}>Configurações da Conta</Text>
            
            <TouchableOpacity style={styles.settingsItem}>
                <View style={styles.settingsItemLeft}>
                    <Text style={styles.settingsItemIcon}>🔒</Text>
                    <Text style={styles.settingsItemText}>Alterar Senha</Text>
                </View>
                <Text style={styles.settingsItemArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingsItem}>
                <View style={styles.settingsItemLeft}>
                    <Text style={styles.settingsItemIcon}>🔔</Text>
                    <Text style={styles.settingsItemText}>Preferências de Notificação</Text>
                </View>
                <Text style={styles.settingsItemArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingsItem}>
                <View style={styles.settingsItemLeft}>
                    <Text style={styles.settingsItemIcon}>👁️</Text>
                    <Text style={styles.settingsItemText}>Privacidade</Text>
                </View>
                <Text style={styles.settingsItemArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.settingsItem}>
                <View style={styles.settingsItemLeft}>
                    <Text style={styles.settingsItemIcon}>🌙</Text>
                    <Text style={styles.settingsItemText}>Tema do Aplicativo</Text>
                </View>
                <Text style={styles.settingsItemArrow}>›</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.settingsItem, styles.lastSettingsItem]}
                onPress={() => {
                    Alert.alert(
                        "Sair da Conta",
                        "Tem certeza que deseja sair da sua conta?",
                        [
                            { text: "Cancelar", style: "cancel" },
                            { 
                                text: "Sair", 
                                style: "destructive",
                                onPress: () => navigation.navigate('Home')
                            }
                        ]
                    );
                }}
            >
                <View style={styles.settingsItemLeft}>
                    <Text style={styles.logoutIcon}>🚪</Text>
                    <Text style={styles.logoutText}>Sair da Conta</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
    
    // Renderizar as guias
    const renderTabs = () => (
        <View style={styles.tabBar}>
            <TouchableOpacity 
                style={[styles.tabItem, activeTab === 'profile' && styles.activeTab]}
                onPress={() => setActiveTab('profile')}
            >
                <Text style={[styles.tabText, activeTab === 'profile' && styles.activeTabText]}>
                    Perfil
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.tabItem, activeTab === 'activity' && styles.activeTab]}
                onPress={() => setActiveTab('activity')}
            >
                <Text style={[styles.tabText, activeTab === 'activity' && styles.activeTabText]}>
                    Atividades
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
                style={[styles.tabItem, activeTab === 'settings' && styles.activeTab]}
                onPress={() => setActiveTab('settings')}
            >
                <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
                    Configurações
                </Text>
            </TouchableOpacity>
        </View>
    );

    // Modal de configurações
    const renderSettingsModal = () => (
        <Modal
            transparent={true}
            visible={settingsModalVisible}
            animationType="fade"
            onRequestClose={() => setSettingsModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Configurações</Text>
                    
                    <TouchableOpacity style={styles.modalOption}>
                        <Text style={styles.modalOptionText}>Alterar senha</Text>
                    </TouchableOpacity>
                    <View style={styles.menuDivider} />

                    <TouchableOpacity style={styles.modalOption}>
                        <Text style={styles.modalOptionText}>Preferências de notificação</Text>
                    </TouchableOpacity>
                    <View style={styles.menuDivider} />

                    <TouchableOpacity style={styles.modalOption}>
                        <Text style={styles.modalOptionText}>Privacidade</Text>
                    </TouchableOpacity>
                    <View style={styles.menuDivider} />

                    <TouchableOpacity style={[styles.modalOption, styles.dangerOption]}>
                        <Text style={styles.dangerOptionText}>Sair da conta</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.closeModalButton}
                        onPress={() => setSettingsModalVisible(false)}
                    >
                        <Text style={styles.closeModalButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Meu Perfil</Text>
                <TouchableOpacity
                    style={styles.settingsButton}
                    onPress={() => setSettingsModalVisible(true)}
                >
                    <Text style={styles.settingsButtonText}>⚙️</Text>
                </TouchableOpacity>
            </View>
            
            {/* Avatar */}
            <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
                </View>
                <Text style={styles.userName}>{user.name}</Text>
                {!isEditing && (
                    <TouchableOpacity style={styles.changeAvatarButton}>
                        <Text style={styles.changeAvatarText}>Alterar foto</Text>
                    </TouchableOpacity>
                )}
            </View>
            
            {/* Guias */}
            {renderTabs()}

            <ScrollView 
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.content}>
                    {/* Conteúdo da guia ativa */}
                    {activeTab === 'profile' && (
                        isEditing ? renderEditForm() : renderProfile()
                    )}
                    
                    {activeTab === 'activity' && renderActivityHistory()}
                    
                    {activeTab === 'settings' && renderSettings()}
                </View>
            </ScrollView>
            
            {/* Modal de configurações */}
            {renderSettingsModal()}
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
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    backButtonText: {
        fontSize: 24,
        color: '#9A9A9D',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
    },
    settingsButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    settingsButtonText: {
        fontSize: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 24,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#7839EE',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    avatarText: {
        fontSize: 40,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 4,
    },
    changeAvatarButton: {
        marginTop: 8,
    },
    changeAvatarText: {
        fontSize: 14,
        color: '#7839EE',
    },
    // Guias
    tabBar: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    tabItem: {
        flex: 1,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    activeTab: {
        borderBottomColor: '#7839EE',
    },
    tabText: {
        fontSize: 14,
        color: '#9A9A9D',
    },
    activeTabText: {
        color: '#7839EE',
        fontWeight: '600',
    },
    // ScrollView
    scrollView: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    // Profile Info
    profileInfo: {
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        overflow: 'hidden',
    },
    infoSection: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: '#333333',
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    infoLabel: {
        width: 80,
        fontSize: 14,
        fontWeight: '500',
        color: '#333333',
    },
    infoValue: {
        flex: 1,
        fontSize: 14,
        color: '#333333',
    },
    bioContainer: {
        padding: 16,
    },
    bioText: {
        fontSize: 14,
        color: '#333333',
        lineHeight: 20,
    },
    editButton: {
        backgroundColor: '#7839EE',
        height: 44,
        margin: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    // Stats
    statsContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#F9F9F9',
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },
    statsItem: {
        flex: 1,
        alignItems: 'center',
    },
    statsNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#7839EE',
        marginBottom: 4,
    },
    statsLabel: {
        fontSize: 12,
        color: '#9A9A9D',
    },
    // Edit Form
    editForm: {
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        padding: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 14,
        marginBottom: 16,
    },
    textArea: {
        height: 100,
        paddingTop: 12,
        textAlignVertical: 'top',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    cancelButton: {
        flex: 1,
        height: 44,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#7839EE',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    cancelButtonText: {
        color: '#7839EE',
        fontSize: 16,
        fontWeight: '500',
    },
    saveButton: {
        flex: 1,
        height: 44,
        backgroundColor: '#7839EE',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    // Activity History
    activityContainer: {
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        padding: 16,
    },
    activityItem: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    activityItemWithBorder: {
        borderBottomWidth: 1,
    },
    activityIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(120, 57, 238, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    activityIconText: {
        fontSize: 16,
    },
    activityInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    activityTitle: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333333',
        marginBottom: 4,
    },
    activityTime: {
        fontSize: 12,
        color: '#9A9A9D',
    },
    // Settings
    settingsContainer: {
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
        overflow: 'hidden',
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    lastSettingsItem: {
        borderBottomWidth: 0,
    },
    settingsItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    settingsItemIcon: {
        fontSize: 20,
        marginRight: 12,
        color: '#7839EE',
    },
    settingsItemText: {
        fontSize: 14,
        color: '#333333',
    },
    settingsItemArrow: {
        fontSize: 16,
        color: '#9A9A9D',
    },
    logoutIcon: {
        fontSize: 20,
        marginRight: 12,
        color: '#FF4B4B',
    },
    logoutText: {
        fontSize: 14,
        color: '#FF4B4B',
    },
    // Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 24,
    },
    modalOption: {
        width: '100%',
        paddingVertical: 12,
    },
    modalOptionText: {
        fontSize: 16,
        color: '#333333',
        textAlign: 'center',
    },
    menuDivider: {
        height: 1,
        width: '100%',
        backgroundColor: '#EEEEEE',
    },
    dangerOption: {
        marginTop: 8,
    },
    dangerOptionText: {
        color: '#FF4B4B',
        fontSize: 16,
        textAlign: 'center',
    },
    closeModalButton: {
        marginTop: 24,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#7839EE',
        borderRadius: 8,
    },
    closeModalButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    }
});

export default ProfileScreen;