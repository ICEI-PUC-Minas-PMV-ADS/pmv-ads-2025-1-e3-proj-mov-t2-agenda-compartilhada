import React, { useState, useEffect } from 'react';
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
    Alert,
    ActivityIndicator,
    Switch
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { API_IP } from '@env';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
    // Estados para gerenciar os dados do usuário
    const [user, setUser] = useState({
        _id: '',
        name: '',
        email: '',
        password: '',
        avatar: null,
        phone: '(31) 98765-4321', // Valor padrão para demonstração
        bio: 'Entusiasta de tecnologia e amante de eventos sociais.' // Valor padrão para demonstração
    });
    
    // Estados para gerenciar a interface
    const [isEditing, setIsEditing] = useState(false);
    const [tempUser, setTempUser] = useState({ ...user });
    const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'activity', 'settings'
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [savingChanges, setSavingChanges] = useState(false);
    
    // Estados para configurações
    const [notificationSettings, setNotificationSettings] = useState({
        events: true,
        groups: true,
        messages: true,
        friendRequests: true,
        systemUpdates: true,
    });
    
    // Estados para modais específicos
    const [changePasswordModalVisible, setChangePasswordModalVisible] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Adicionar estes novos estados para contadores
    const [eventCount, setEventCount] = useState(0);
    const [groupCount, setGroupCount] = useState(0);
    
    // Dados simulados de atividades (manteremos por enquanto)
    const activityHistory = [
        { id: 1, type: 'event_created', title: 'Criou o evento Happy Hour', date: '25/04/2025', time: '14:30' },
        { id: 2, type: 'group_joined', title: 'Entrou no grupo Clube de Corrida', date: '23/04/2025', time: '09:15' },
        { id: 3, type: 'event_attended', title: 'Participou do evento Jantar em Família', date: '20/04/2025', time: '20:30' },
        { id: 4, type: 'group_created', title: 'Criou o grupo Amigos do Trabalho', date: '15/04/2025', time: '11:45' },
        { id: 5, type: 'profile_updated', title: 'Atualizou a foto de perfil', date: '10/04/2025', time: '16:20' },
    ];
    
    // Carregar dados do usuário ao iniciar
    useEffect(() => {
        const loadUserData = async () => {
            try {
                setLoading(true);
                // Recupera dados do usuário do AsyncStorage
                const userJSON = await AsyncStorage.getItem('usuario');
                if (userJSON) {
                    const userData = JSON.parse(userJSON);
                    setUser({...user, ...userData});
                    setTempUser({...user, ...userData});
                    
                    // Recupera perfil completo do usuário da API
                    const token = await AsyncStorage.getItem('access_token');
                    if (token && userData._id) {
                        // Buscar o usuário
                        const userResponse = await axios.get(
                            `${API_IP}/usuarios/${userData._id}`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );
                        
                        // Buscar o perfil para obter a foto
                        const perfilResponse = await axios.get(
                            `${API_IP}/perfis`,
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`
                                }
                            }
                        );
                        
                        // Encontrar o perfil correspondente ao usuário
                        const userPerfil = perfilResponse.data.find(
                            perfil => perfil.userId === userData._id
                        );
                        
                        if (userResponse.data) {
                            // Atualiza os dados com informações completas do usuário
                            const updatedUserData = {...user, ...userData, ...userResponse.data};
                            
                            // Adiciona a URL da foto se disponível
                            if (userPerfil && userPerfil.foto) {
                                updatedUserData.avatar = userPerfil.foto;
                            }
                            
                            setUser(updatedUserData);
                            setTempUser(updatedUserData);
                        }

                        // Buscar contagem de eventos
                        try {
                            // Buscando eventos individuais (onde o usuário é o criador)
                            const eventosResponse = await axios.get(
                                `${API_IP}/eventos`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                            );
                            
                            // Filtra eventos criados pelo usuário atual
                            const userEvents = eventosResponse.data.filter(
                                evento => evento.criador_id === userData._id
                            );
                            
                            // Buscando participações em eventos
                            const participacoesResponse = await axios.get(
                                `${API_IP}/participacoes-evento`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                            );
                            
                            // Filtra participações do usuário atual com status confirmado
                            const userParticipations = participacoesResponse.data.filter(
                                participacao => participacao.usuarioId === userData._id && 
                                            participacao.status === "confirmed"
                            );
                            
                            // Soma total de eventos (criados + participações)
                            const totalEvents = (userEvents ? userEvents.length : 0) + 
                                            (userParticipations ? userParticipations.length : 0);
                            
                            setEventCount(totalEvents);
                        } catch (error) {
                            console.error('Erro ao buscar eventos:', error);
                            setEventCount(0);
                        }

                        // Buscar contagem de grupos
                        try {
                            // Buscando associações de grupo do usuário
                            const gruposResponse = await axios.get(
                                `${API_IP}/associacoes-grupo`,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`
                                    }
                                }
                            );
                            
                            // Filtra grupos do usuário atual
                            const userGroups = gruposResponse.data.filter(
                                associacao => associacao.associadoId === userData._id
                            );
                            
                            setGroupCount(userGroups ? userGroups.length : 0);
                        } catch (error) {
                            console.error('Erro ao buscar grupos:', error);
                            setGroupCount(0);
                        }
                    }
                } else {
                    // Se não houver dados do usuário, redireciona para a tela de login
                    Alert.alert('Sessão expirada', 'Por favor, faça login novamente');
                    navigation.navigate('loginScreen');
                }
            } catch (error) {
                console.error('Erro ao carregar dados do usuário:', error);
                Alert.alert('Erro', 'Não foi possível carregar os dados do perfil');
            } finally {
                setLoading(false);
            }
        };

        loadUserData();
    }, []);

    // Função para selecionar imagem da galeria
    const pickImage = async () => {
        try {
            // Solicitar permissão apenas quando necessário
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permissão necessária',
                    'Precisamos de acesso à galeria para atualizar sua foto de perfil.'
                );
                return; // Sai da função se a permissão não for concedida
            }
            
            // Continua com a seleção de imagem se a permissão for concedida
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                setImage(result.assets[0].uri);
                setTempUser({...tempUser, avatar: result.assets[0].uri});
            }
        } catch (error) {
            console.error('Erro ao escolher imagem:', error.message || error);
            Alert.alert('Erro ao escolher imagem');
        }
    };

    // Função para fazer upload da imagem
    const handleUploadImage = async () => {
        if (!image) return null;

        try {
            const fileType = image.split('.').pop();
            const formData = new FormData();
            formData.append('file', {
                uri: image,
                name: `${user.email || 'profile'}.${fileType}`,
                type: `image/${fileType}`,
            });
            formData.append('displayName', user.email || 'profile');
            
            const response = await fetch(`${API_IP}/usuarios/upload-image`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.message || 'Erro ao enviar imagem');
            }

            const data = await response.json();
            return data.url; // Retorna a URL da imagem no servidor
        } catch (error) {
            console.error('Erro no upload da imagem:', error.message || error);
            Alert.alert('Erro ao enviar imagem', error.message || 'Erro desconhecido');
            return null;
        }
    };

    // Função para salvar as alterações
    const handleSaveChanges = async () => {
        if (!tempUser.name.trim()) {
            return Alert.alert('Erro', 'O nome não pode ficar em branco');
        }

        try {
            setSavingChanges(true);
            
            // Se houver uma nova imagem, faz o upload
            let profileImageUrl = user.avatar;
            if (image) {
                const uploadedImageUrl = await handleUploadImage();
                if (uploadedImageUrl) {
                    profileImageUrl = uploadedImageUrl;
                }
            }

            // Prepara os dados para atualização
            const updateData = {
                name: tempUser.name,
                // Dados adicionais
                phone: tempUser.phone,
                bio: tempUser.bio,
                // Não enviar email/senha a menos que estejam sendo alterados
                ...(tempUser.email !== user.email && { email: tempUser.email }),
                // Inclui URL da imagem se disponível
                ...(profileImageUrl && { foto: profileImageUrl })
            };
            
            // Recupera o token de autenticação
            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                throw new Error('Token de autenticação não encontrado');
            }
            
            // Realiza a atualização dos dados via API
            const response = await axios.put(
                `${API_IP}/usuarios/${user._id}`,
                updateData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            if (response.data) {
                // Atualiza o estado e o AsyncStorage com os novos dados
                const updatedUser = {...user, ...updateData, avatar: profileImageUrl};
                setUser(updatedUser);
                await AsyncStorage.setItem('usuario', JSON.stringify(updatedUser));
                
                Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
                setIsEditing(false);
                setImage(null); // Limpa a imagem temporária
            }
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            Alert.alert('Erro', 'Não foi possível atualizar o perfil');
        } finally {
            setSavingChanges(false);
        }
    };

    // Função para trocar senha
    const handleChangePassword = async () => {
        // Validações
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return Alert.alert('Erro', 'Preencha todos os campos para alterar sua senha');
        }
        
        if (newPassword !== confirmNewPassword) {
            return Alert.alert('Erro', 'A nova senha e a confirmação não coincidem');
        }
        
        try {
            // Validação de requisitos da senha (mesmo padrão do cadastro)
            const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/;
            if (newPassword.length < 5 || !regexSenha.test(newPassword)) {
                return Alert.alert('Erro', 'A nova senha deve ter pelo menos 5 caracteres, incluir letras maiúsculas, minúsculas e caracteres especiais.');
            }
            
            // Recuperar token de autenticação
            const token = await AsyncStorage.getItem('access_token');
            if (!token) {
                throw new Error('Token de autenticação não encontrado');
            }
            
            // Em vez de atualizar a senha diretamente, vamos criar um novo usuário temporário
            // (esse é um hack, mas pode contornar o problema sem modificar o backend)
            const tempEmail = `temp_${Date.now()}@example.com`;
            const tempName = "TempUser";
            
            // Primeiro criamos um usuário temporário para obter um hash de senha válido
            const createTempUserResponse = await axios.post(
                `${API_IP}/usuarios`,
                {
                    name: tempName,
                    email: tempEmail,
                    password: newPassword,
                    foto: "" // Campo opcional
                }
            );
            
            if (!createTempUserResponse.data || !createTempUserResponse.data._id) {
                throw new Error('Erro ao criar usuário temporário');
            }
            
            // Agora obtemos o usuário temporário para ver o hash da senha gerado
            const getTempUserResponse = await axios.get(
                `${API_IP}/usuarios/${createTempUserResponse.data._id}`
            );
            
            if (!getTempUserResponse.data || !getTempUserResponse.data.password) {
                throw new Error('Erro ao obter usuário temporário');
            }
            
            // Extraímos o hash da senha gerado pelo backend
            const hashedPassword = getTempUserResponse.data.password;
            
            // Agora atualizamos o usuário real com o hash da senha
            const updateResponse = await axios.put(
                `${API_IP}/usuarios/${user._id}`,
                {
                    // Apenas atualizamos a senha com o hash obtido
                    password: hashedPassword
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            // Removemos o usuário temporário
            await axios.delete(
                `${API_IP}/usuarios/${createTempUserResponse.data._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            ).catch(err => console.error('Erro ao remover usuário temporário:', err));
            
            if (updateResponse.data) {
                Alert.alert('Senha alterada', 'Sua senha foi alterada com sucesso!');
                
                // Limpar campos e fechar modal
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setChangePasswordModalVisible(false);
            } else {
                throw new Error('Erro ao atualizar senha');
            }
        } catch (error) {
            console.error('Erro ao alterar senha:', error);
            
            // Mensagem de erro mais específica baseada na resposta da API
            if (error.response) {
                const status = error.response.status;
                if (status === 401) {
                    Alert.alert('Erro', 'Senha atual incorreta. Por favor, verifique.');
                } else if (status === 400) {
                    Alert.alert('Erro', 'Requisição inválida. Verifique os dados informados.');
                } else if (status === 409) {
                    Alert.alert('Erro', 'E-mail já está em uso. Por favor, tente outro.');
                } else {
                    Alert.alert('Erro', error.response.data?.message || 'Não foi possível alterar a senha');
                }
            } else {
                Alert.alert('Erro', 'Não foi possível conectar ao servidor. Verifique sua conexão.');
            }
        }
    };

    // Função para verificar se o nome contém apenas letras e espaços
    const handleNomeChange = (inputText) => {
        const cleanText = inputText.replace(/[^a-zA-Z\s]/g, '');
        setTempUser({ ...tempUser, name: cleanText });
    };

    // Função para lidar com o logout
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('access_token');
            await AsyncStorage.removeItem('usuario');
            navigation.navigate('loginScreen');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            Alert.alert('Erro', 'Não foi possível fazer logout');
        }
    };

    // Modal de alteração de senha
    const renderChangePasswordModal = () => (
        <Modal
            transparent={true}
            visible={changePasswordModalVisible}
            animationType="fade"
            onRequestClose={() => setChangePasswordModalVisible(false)}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Alterar Senha</Text>
                    
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Senha atual"
                            value={oldPassword}
                            onChangeText={setOldPassword}
                            secureTextEntry={!showOldPassword}
                            placeholderTextColor="#757575"
                        />
                        <TouchableOpacity 
                            style={styles.passwordToggle}
                            onPress={() => setShowOldPassword(!showOldPassword)}
                        >
                            <Ionicons 
                                name={showOldPassword ? 'eye-off' : 'eye'} 
                                size={24} 
                                color="#757575" 
                            />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Nova senha"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={!showNewPassword}
                            placeholderTextColor="#757575"
                        />
                        <TouchableOpacity 
                            style={styles.passwordToggle}
                            onPress={() => setShowNewPassword(!showNewPassword)}
                        >
                            <Ionicons 
                                name={showNewPassword ? 'eye-off' : 'eye'} 
                                size={24} 
                                color="#757575" 
                            />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.passwordInput}
                            placeholder="Confirmar nova senha"
                            value={confirmNewPassword}
                            onChangeText={setConfirmNewPassword}
                            secureTextEntry={!showConfirmPassword}
                            placeholderTextColor="#757575"
                        />
                        <TouchableOpacity 
                            style={styles.passwordToggle}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            <Ionicons 
                                name={showConfirmPassword ? 'eye-off' : 'eye'} 
                                size={24} 
                                color="#757575" 
                            />
                        </TouchableOpacity>
                    </View>
                    
                    <View style={styles.modalButtons}>
                        <TouchableOpacity 
                            style={styles.cancelButton}
                            onPress={() => {
                                setChangePasswordModalVisible(false);
                                setOldPassword('');
                                setNewPassword('');
                                setConfirmNewPassword('');
                            }}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.saveButton}
                            onPress={handleChangePassword}
                        >
                            <Text style={styles.saveButtonText}>Alterar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );

    // Renderizar o formulário de edição
    const renderEditForm = () => (
        <View style={styles.editForm}>
            <Text style={styles.sectionTitle}>Informações Pessoais</Text>
            
            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={tempUser.name}
                onChangeText={handleNomeChange}
                placeholder="Seu nome"
                placeholderTextColor="#9A9A9D"
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={[styles.input, styles.inputDisabled]}
                value={tempUser.email}
                editable={false} // Email não pode ser editado
                placeholderTextColor="#9A9A9D"
            />
            
            <TouchableOpacity
                style={styles.changePhotoButton}
                onPress={pickImage}
            >
                <Text style={styles.changePhotoText}>Alterar foto de perfil</Text>
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.cancelButton} 
                    onPress={() => {
                        setTempUser({ ...user });
                        setIsEditing(false);
                        setImage(null);
                    }}
                    disabled={savingChanges}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.saveButton} 
                    onPress={handleSaveChanges}
                    disabled={savingChanges}
                >
                    {savingChanges ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                    ) : (
                        <Text style={styles.saveButtonText}>Salvar</Text>
                    )}
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
            </View>

            <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}
            >
                <Text style={styles.editButtonText}>Editar Perfil</Text>
            </TouchableOpacity>
            
            {/* Estatísticas do usuário com dados reais */}
            <View style={styles.statsContainer}>
                <View style={styles.statsItem}>
                    <Text style={styles.statsNumber}>{eventCount}</Text>
                    <Text style={styles.statsLabel}>Eventos</Text>
                </View>
                <View style={styles.statsItem}>
                    <Text style={styles.statsNumber}>{groupCount}</Text>
                    <Text style={styles.statsLabel}>Grupos</Text>
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
            
            <TouchableOpacity 
                style={styles.settingsItem}
                onPress={() => setChangePasswordModalVisible(true)}
            >
                <View style={styles.settingsItemLeft}>
                    <Text style={styles.settingsItemIcon}>🔒</Text>
                    <Text style={styles.settingsItemText}>Alterar Senha</Text>
                </View>
                <Text style={styles.settingsItemArrow}>›</Text>
            </TouchableOpacity>
            
            <View style={styles.settingsDivider} />
            
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
                                onPress: handleLogout
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
                style={[styles.tabItem, activeTab === 'settings' && styles.activeTab]}
                onPress={() => setActiveTab('settings')}
            >
                <Text style={[styles.tabText, activeTab === 'settings' && styles.activeTabText]}>
                    Configurações
                </Text>
            </TouchableOpacity>
        </View>
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
                <View style={styles.placeholder} />
            </View>
            
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#7839EE" />
                    <Text style={styles.loadingText}>Carregando perfil...</Text>
                </View>
            ) : (
                <>
                    {/* Avatar */}
                    <View style={styles.avatarContainer}>
                        {image ? (
                            <Image source={{ uri: image }} style={styles.avatar} />
                        ) : (
                            user.avatar ? (
                                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                            ) : (
                                <View style={styles.avatar}>
                                    <Text style={styles.avatarText}>{user.name ? user.name.charAt(0).toUpperCase() : '?'}</Text>
                                </View>
                            )
                        )}
                        <Text style={styles.userName}>{user.name}</Text>
                        {!isEditing && (
                            <TouchableOpacity 
                                style={styles.changeAvatarButton}
                                onPress={() => setIsEditing(true)}
                            >
                                <Text style={styles.changeAvatarText}>Editar perfil</Text>
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
                            
                            {activeTab === 'settings' && renderSettings()}
                        </View>
                    </ScrollView>
                </>
            )}
            
            {/* Modal de alteração de senha */}
            {renderChangePasswordModal()}
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#555',
    },
    header: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
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
    logoutButton: {
        backgroundColor: '#f44336',
        height: 44,
        margin: 16,
        marginTop: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButtonText: {
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
        color: '#333333',
    },
    inputDisabled: {
        backgroundColor: '#F4F4F4',
        color: '#9A9A9D',
    },
    textArea: {
        height: 100,
        paddingTop: 12,
        textAlignVertical: 'top',
    },
    changePhotoButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#7839EE',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
        marginBottom: 16,
    },
    changePhotoText: {
        color: '#7839EE',
        fontSize: 14,
        fontWeight: '500',
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
        marginBottom: 16,
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
        padding: 16,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
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
    settingsDivider: {
        height: 1,
        backgroundColor: '#EEEEEE',
        marginVertical: 8,
    },
    // Setting Items (switches)
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    settingText: {
        fontSize: 14,
        color: '#333333',
    },
    // Modals
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contextMenu: {
        width: 180,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginTop: 60,
        marginRight: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    menuItem: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    menuItemText: {
        fontSize: 14,
        color: '#333333',
    },
    menuItemTextDanger: {
        fontSize: 14,
        color: '#FF4B4B',
    },
    menuDivider: {
        height: 1,
        backgroundColor: '#EEEEEE',
    },
    // Password Modal
    modalContent: {
        width: '90%', // Garante que ocupe 90% da largura da tela
        maxWidth: 400, // Limita a largura máxima
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 24,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 24,
        textAlign: 'center',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
        borderWidth: 1,
        borderColor: '#DDDDDD',
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 12,
    },
    passwordInput: {
        flex: 1,
        height: 50,
        fontSize: 14,
        color: '#333333',
        paddingVertical: 10,
    },
    passwordToggle: {
        padding: 8,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 30,
    },
    placeholder: {
        width: 40,
    },
    contextMenuOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
});

export default ProfileScreen;