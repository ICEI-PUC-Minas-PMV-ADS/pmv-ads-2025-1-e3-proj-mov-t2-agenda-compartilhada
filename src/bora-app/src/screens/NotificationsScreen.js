import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    SectionList,
    Modal,
    Switch,
    Alert
} from 'react-native';

const NotificationsScreen = ({ navigation }) => {
    // Estados para gerenciar notificações
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState(['all']);
    const [notificationSettings, setNotificationSettings] = useState({
        events: true,
        groups: true,
        messages: true, // Note: Não há tipo 'message' nos dados mock
        friendRequests: true,
        systemUpdates: true,
        sound: true, // Note: Configuração de som não está implementada na UI do modal
        vibration: true // Note: Configuração de vibração não está implementada na UI do modal
    });

    // Simulação de notificações agrupadas por data
    const generateMockNotifications = () => {
        const today = [
            {
                id: '1',
                type: 'event_invitation',
                title: 'Convite para Happy Hour',
                message: 'João Silva convidou você para o evento Happy Hour na próxima sexta-feira às 19h.',
                group: 'Amigos do Trabalho',
                time: '2h atrás',
                read: false,
                actionable: true,
                actionText: 'Responder'
            },
            {
                id: '2',
                type: 'group_invitation',
                title: 'Convite para grupo',
                message: 'Maria Oliveira adicionou você ao grupo Clube de Corrida.',
                time: '5h atrás',
                read: false,
                actionable: true,
                actionText: 'Ver Grupo'
            },
        ];

        const yesterday = [
            {
                id: '3',
                type: 'event_reminder',
                title: 'Lembrete de evento',
                message: 'O evento Jantar em Família acontecerá amanhã às 20:30.',
                group: 'Família',
                time: '10:30',
                read: true,
                actionable: true,
                actionText: 'Ver Evento'
            },
        ];

        const thisWeek = [
            {
                id: '4',
                type: 'event_change',
                title: 'Alteração de evento',
                message: 'O local do evento Aniversário do Lucas foi alterado.',
                group: 'Amigos da Faculdade',
                time: 'Segunda, 14:20',
                read: true,
                actionable: true,
                actionText: 'Ver Alterações'
            },
            {
                id: '5',
                type: 'group_update',
                title: 'Atualização de grupo',
                message: 'Você foi promovido a administrador do grupo Clube de Corrida.',
                time: 'Terça, 09:45',
                read: true,
                actionable: false
            },
            {
                id: '6',
                type: 'friend_request',
                title: 'Solicitação de amizade',
                message: 'Carlos Mendes quer se conectar com você.',
                time: 'Quarta, 16:30',
                read: false,
                actionable: true,
                actionText: 'Responder'
            },
        ];

        const older = [
            {
                id: '7',
                type: 'system_update',
                title: 'Atualização do aplicativo',
                message: 'O Bora App foi atualizado com novos recursos!',
                time: '15/04/2025', // Data no futuro, talvez intencional para teste
                read: true,
                actionable: true,
                actionText: 'Ver Novidades'
            },
            {
                id: '8',
                type: 'event_feedback',
                title: 'Avalie o evento',
                message: 'O evento Churrasco de Domingo acabou. Conte-nos como foi sua experiência!',
                group: 'Família',
                time: '10/04/2025', // Data no futuro, talvez intencional para teste
                read: true,
                actionable: true,
                actionText: 'Avaliar'
            },
        ];

        return [
            { title: 'Hoje', data: today },
            { title: 'Ontem', data: yesterday },
            { title: 'Esta Semana', data: thisWeek },
            { title: 'Anteriores', data: older }
        ];
    };

    // Carregar notificações
    const loadNotifications = () => {
        setLoading(true);
        // Simulação de carregamento de dados do backend
        setTimeout(() => {
            const mockData = generateMockNotifications();
            setNotifications(mockData);
            setLoading(false);
        }, 1000);
    };

    // ----- BLOCO DUPLICADO REMOVIDO DAQUI -----

    // Carregar notificações ao iniciar o componente
    useEffect(() => {
        loadNotifications();
    }, []);

    // Função para atualizar as notificações (pull to refresh)
    const onRefresh = () => {
        setRefreshing(true);
        // Simulação de atualização de dados
        setTimeout(() => {
            const mockData = generateMockNotifications();
            setNotifications(mockData);
            setRefreshing(false);
        }, 1000);
    };

    // Função para marcar notificação como lida
    const markAsRead = (id) => {
        const updatedNotifications = notifications.map(section => ({
            ...section,
            data: section.data.map(notification =>
                notification.id === id ? { ...notification, read: true } : notification
            )
        }));
        setNotifications(updatedNotifications);
    };

    // Função para marcar todas como lidas
    const markAllAsRead = () => {
        const updatedNotifications = notifications.map(section => ({
            ...section,
            data: section.data.map(notification => ({ ...notification, read: true }))
        }));
        setNotifications(updatedNotifications);
        Alert.alert("Sucesso", "Todas as notificações foram marcadas como lidas.");
    };

    // Função para filtrar notificações
    const getFilteredNotifications = () => {
        if (selectedFilters.includes('all')) {
            return notifications;
        }

        return notifications.map(section => ({
            ...section,
            data: section.data.filter(notification =>
                selectedFilters.includes(notification.type.split('_')[0])
            )
        })).filter(section => section.data.length > 0);
    };

    // Função para alternar filtro
    const toggleFilter = (filter) => {
        if (filter === 'all') {
            // Se 'all' for clicado, seleciona apenas 'all'
            setSelectedFilters(['all']);
        } else {
            // Remove 'all' se estiver presente
            let newFilters = selectedFilters.filter(f => f !== 'all');

            if (newFilters.includes(filter)) {
                // Remove o filtro se já estiver selecionado
                newFilters = newFilters.filter(f => f !== filter);
            } else {
                // Adiciona o filtro
                newFilters.push(filter);
            }

            // Se nenhum filtro específico estiver selecionado, volta para 'all'
            // Caso contrário, mantém os filtros específicos selecionados
            setSelectedFilters(newFilters.length === 0 ? ['all'] : newFilters);
        }
    };


    // Função para lidar com o toque em uma notificação
    const handleNotificationPress = (notification) => {
        // Marcar como lida ao tocar
        markAsRead(notification.id);

        // Navegar para a tela correspondente com base no tipo
        switch (notification.type.split('_')[0]) { // Simplificado para verificar o prefixo
            case 'event':
                // Navegar para a tela de detalhes do evento
                navigation.navigate('EventList'); // Ou uma tela específica de detalhes do evento
                break;
            case 'group':
                // Navegar para a tela de detalhes do grupo
                navigation.navigate('MyGroups'); // Ou uma tela específica de detalhes do grupo
                break;
            case 'friend':
                // Navegar para a tela de contatos ou amigos
                Alert.alert("Solicitação de Amizade", "Funcionalidade de gerenciamento de amigos será implementada em breve.");
                break;
            case 'system':
                // Mostrar informações sobre a atualização
                Alert.alert("Atualização do App", "Novos recursos:\n• Compartilhamento de localização em tempo real\n• Temas personalizados\n• Melhorias de desempenho");
                break;
            default:
                console.warn("Tipo de notificação desconhecido para navegação:", notification.type);
                break;
        }
    };

    // Função para lidar com ações de notificações (botões dentro da notificação)
    const handleNotificationAction = (notification) => {
        // Marcar como lida ao interagir com a ação
        markAsRead(notification.id);

        // Executar ação baseada no tipo
        switch (notification.type) {
            case 'event_invitation':
                Alert.alert(
                    "Responder Convite",
                    `Deseja participar do evento "${notification.title}"?`,
                    [
                        {
                            text: "Recusar",
                            style: "cancel",
                            onPress: () => console.log("Convite recusado:", notification.id)
                        },
                        {
                            text: "Aceitar",
                            onPress: () => {
                                Alert.alert("Sucesso", "Você aceitou o convite para o evento!");
                                // Aqui você poderia adicionar lógica para confirmar a presença
                                // e talvez navegar para o evento
                                navigation.navigate('EventList');
                            }
                        }
                    ]
                );
                break;
            case 'group_invitation':
                 Alert.alert(
                    "Convite para Grupo",
                    `Deseja entrar no grupo "${notification.title}"?`,
                    [
                        { text: "Recusar", style: "cancel", onPress: () => console.log("Convite de grupo recusado:", notification.id)},
                        { text: "Aceitar", onPress: () => {
                            Alert.alert("Sucesso", "Você entrou no grupo!");
                             // Navegar para a tela de detalhes do grupo
                            navigation.navigate('MyGroups');
                          }
                        }
                    ]
                );
                break;
            case 'event_reminder':
            case 'event_change':
                navigation.navigate('EventList'); // Navegar para ver detalhes do evento
                break;
            case 'event_feedback':
                 Alert.alert("Avaliar Evento", "Navegando para tela de avaliação...");
                // navigation.navigate('EventFeedbackScreen', { eventId: notification.eventId }); // Exemplo
                break;
            case 'friend_request':
                Alert.alert(
                    "Solicitação de Amizade",
                    `${notification.message}`, // Mensagem já contém o nome
                    [
                        {
                            text: "Recusar",
                            style: "cancel",
                            onPress: () => console.log("Solicitação recusada:", notification.id)
                        },
                        {
                            text: "Aceitar",
                            onPress: () => {
                                Alert.alert("Sucesso", "Agora vocês estão conectados!");
                                // Adicionar lógica para aceitar amizade
                            }
                        }
                    ]
                );
                break;
             case 'system_update':
                Alert.alert("Novidades do App", notification.message);
                // Talvez navegar para uma tela de "Novidades"
                // navigation.navigate('WhatsNewScreen');
                break;
            default:
                console.warn("Ação desconhecida para o tipo:", notification.type);
                // Ação padrão, talvez navegar para a Home ou fazer nada
                // navigation.navigate('Home');
                break;
        }
    };

    // Função para excluir notificação
    const deleteNotification = (id) => {
        Alert.alert(
            "Excluir Notificação",
            "Tem certeza que deseja excluir esta notificação?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: () => {
                        const updatedNotifications = notifications.map(section => ({
                            ...section,
                            data: section.data.filter(notification => notification.id !== id)
                        // Filtrar seções vazias após a exclusão
                        })).filter(section => section.data.length > 0);

                        setNotifications(updatedNotifications);
                         Alert.alert("Excluída", "A notificação foi excluída.");
                    }
                }
            ]
        );
    };

    // Função para obter cor baseada no tipo de notificação
    const getNotificationColor = (type) => {
        const typePrefix = type.split('_')[0];

        switch (typePrefix) {
            case 'event':
                return '#7839EE'; // Roxo para eventos
            case 'group':
                return '#4CAF50'; // Verde para grupos
            case 'friend':
                return '#2196F3'; // Azul para amizades
            case 'system':
                return '#FFC107'; // Amarelo para atualizações do sistema
            default:
                return '#9E9E9E'; // Cinza para outros
        }
    };

    // Função para obter ícone baseado no tipo de notificação
    const getNotificationIcon = (type) => {
        const typePrefix = type.split('_')[0];

        switch (typePrefix) {
            case 'event':
                return '📅'; // Calendário
            case 'group':
                return '👥'; // Grupo de pessoas
            case 'friend':
                return '👤'; // Pessoa
            case 'system':
                return '⚙️'; // Engrenagem
            default:
                return '🔔'; // Sino (padrão)
        }
    };

    // Renderizar um item de notificação
    const renderNotificationItem = ({ item }) => (
        <View
            style={[
                styles.notificationItem,
                !item.read && styles.unreadNotification // Fundo diferente para não lidas
            ]}
        >
            {/* Área clicável principal */}
            <TouchableOpacity
                style={styles.notificationContent}
                onPress={() => handleNotificationPress(item)}
                activeOpacity={0.7}
            >
                {/* Indicador de notificação não lida (se aplicável) */}
                {!item.read && <View style={styles.unreadDot} />}

                {/* Ícone */}
                <View style={[
                    styles.notificationIconContainer,
                    { backgroundColor: getNotificationColor(item.type) + '20' } // Fundo leve da cor
                ]}>
                    <Text style={styles.notificationIconText}>
                        {getNotificationIcon(item.type)}
                    </Text>
                </View>

                {/* Conteúdo textual */}
                <View style={styles.notificationTextContainer}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    <Text style={styles.notificationMessage} numberOfLines={2}>
                        {item.message}
                    </Text>

                    {/* Informações adicionais (Grupo, Tempo) */}
                    {item.group && (
                        <Text style={[
                            styles.notificationMetaText,
                            { color: getNotificationColor(item.type) }
                        ]}>
                            Grupo: {item.group}
                        </Text>
                    )}
                    <Text style={styles.notificationMetaText}>{item.time}</Text>

                    {/* Botão de ação (se houver) */}
                    {item.actionable && item.actionText && (
                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                { backgroundColor: getNotificationColor(item.type) }
                            ]}
                            onPress={(e) => {
                                e.stopPropagation(); // Impede que o clique no botão acione o onPress do item inteiro
                                handleNotificationAction(item);
                            }}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Aumenta área de toque
                        >
                            <Text style={styles.actionButtonText}>{item.actionText}</Text>
                        </TouchableOpacity>
                    )}
                </View>

            </TouchableOpacity>
             {/* Botão de exclusão (separado para não conflitar com o clique principal) */}
             <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteNotification(item.id)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Aumenta área de toque
                >
                    <Text style={styles.deleteButtonText}>×</Text>
             </TouchableOpacity>
        </View>
    );


    // Renderizar o cabeçalho de seção
    const renderSectionHeader = ({ section }) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
        </View>
    );

    // Renderizar o conteúdo quando não há notificações
    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
                <Text style={styles.emptyIcon}>📭</Text>
            </View>
            <Text style={styles.emptyTitle}>Nenhuma notificação</Text>
            <Text style={styles.emptyText}>
                {selectedFilters.includes('all')
                    ? "Você está em dia! Novas notificações aparecerão aqui."
                    : "Nenhuma notificação encontrada para os filtros selecionados."}
            </Text>
             <TouchableOpacity onPress={loadNotifications} style={styles.refreshButtonEmpty}>
                <Text style={styles.refreshButtonEmptyText}>Atualizar</Text>
            </TouchableOpacity>
        </View>
    );


    // Renderizar o modal de filtros e configurações
    const renderFilterModal = () => (
        <Modal
            transparent={true}
            visible={filterModalVisible}
            animationType="fade" // 'fade' ou 'slide'
            onRequestClose={() => setFilterModalVisible(false)}
        >
            {/* Overlay semi-transparente */}
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPressOut={() => setFilterModalVisible(false)} // Fecha ao clicar fora
            >
                {/* Conteúdo do Modal (impede o fechamento ao clicar nele) */}
                <TouchableOpacity activeOpacity={1} style={styles.modalContent} onPress={() => {}}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Filtros e Configurações</Text>
                        <TouchableOpacity
                            style={styles.modalCloseButton}
                            onPress={() => setFilterModalVisible(false)}
                             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Text style={styles.modalCloseText}>×</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalBody}>
                        {/* --- Seção de Filtros --- */}
                        <Text style={styles.filterSectionTitle}>Filtrar por Tipo</Text>
                        <TouchableOpacity
                            style={[
                                styles.filterOption,
                                selectedFilters.includes('all') && styles.selectedFilterOption
                            ]}
                            onPress={() => toggleFilter('all')}
                        >
                            <Text style={styles.filterOptionText}>Todas</Text>
                            {selectedFilters.includes('all') && (
                                <Text style={styles.filterOptionCheckmark}>✓</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.filterOption,
                                selectedFilters.includes('event') && !selectedFilters.includes('all') && styles.selectedFilterOption
                            ]}
                            onPress={() => toggleFilter('event')}
                        >
                             <View style={styles.filterOptionLabel}>
                                <Text style={styles.filterOptionIcon}>📅</Text>
                                <Text style={styles.filterOptionText}>Eventos</Text>
                            </View>
                            {selectedFilters.includes('event') && !selectedFilters.includes('all') &&(
                                <Text style={styles.filterOptionCheckmark}>✓</Text>
                            )}
                        </TouchableOpacity>
                         <TouchableOpacity
                            style={[
                                styles.filterOption,
                                selectedFilters.includes('group') && !selectedFilters.includes('all') && styles.selectedFilterOption
                            ]}
                            onPress={() => toggleFilter('group')}
                        >
                             <View style={styles.filterOptionLabel}>
                                <Text style={styles.filterOptionIcon}>👥</Text>
                                <Text style={styles.filterOptionText}>Grupos</Text>
                            </View>
                            {selectedFilters.includes('group') && !selectedFilters.includes('all') &&(
                                <Text style={styles.filterOptionCheckmark}>✓</Text>
                            )}
                        </TouchableOpacity>
                          <TouchableOpacity
                            style={[
                                styles.filterOption,
                                selectedFilters.includes('friend') && !selectedFilters.includes('all') && styles.selectedFilterOption
                            ]}
                            onPress={() => toggleFilter('friend')}
                        >
                             <View style={styles.filterOptionLabel}>
                                <Text style={styles.filterOptionIcon}>👤</Text>
                                <Text style={styles.filterOptionText}>Amigos</Text>
                            </View>
                            {selectedFilters.includes('friend') && !selectedFilters.includes('all') &&(
                                <Text style={styles.filterOptionCheckmark}>✓</Text>
                            )}
                        </TouchableOpacity>
                           <TouchableOpacity
                            style={[
                                styles.filterOption,
                                selectedFilters.includes('system') && !selectedFilters.includes('all') && styles.selectedFilterOption
                            ]}
                            onPress={() => toggleFilter('system')}
                        >
                             <View style={styles.filterOptionLabel}>
                                <Text style={styles.filterOptionIcon}>⚙️</Text>
                                <Text style={styles.filterOptionText}>Sistema</Text>
                            </View>
                            {selectedFilters.includes('system') && !selectedFilters.includes('all') &&(
                                <Text style={styles.filterOptionCheckmark}>✓</Text>
                            )}
                        </TouchableOpacity>


                        {/* --- Divisor --- */}
                        <View style={styles.modalDivider} />

                        {/* --- Seção de Configurações --- */}
                        <Text style={styles.filterSectionTitle}>Configurações de Notificação</Text>
                        {/* Exemplo: Habilitar/Desabilitar tipos */}
                         <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Receber notificações de Eventos</Text>
                            <Switch
                                value={notificationSettings.events}
                                onValueChange={(value) =>
                                    setNotificationSettings({...notificationSettings, events: value})
                                }
                                trackColor={{ false: '#CED4DA', true: '#AE88FF' }} // Cores mais suaves
                                thumbColor={notificationSettings.events ? '#7839EE' : '#F8F9FA'}
                                ios_backgroundColor="#CED4DA"
                            />
                        </View>
                         <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Receber notificações de Grupos</Text>
                            <Switch
                                value={notificationSettings.groups}
                                onValueChange={(value) =>
                                    setNotificationSettings({...notificationSettings, groups: value})
                                }
                                trackColor={{ false: '#CED4DA', true: '#AE88FF' }}
                                thumbColor={notificationSettings.groups ? '#7839EE' : '#F8F9FA'}
                                ios_backgroundColor="#CED4DA"
                            />
                        </View>
                         <View style={styles.settingItem}>
                            <Text style={styles.settingText}>Receber Solicitações de Amizade</Text>
                            <Switch
                                value={notificationSettings.friendRequests}
                                onValueChange={(value) =>
                                    setNotificationSettings({...notificationSettings, friendRequests: value})
                                }
                                trackColor={{ false: '#CED4DA', true: '#AE88FF' }}
                                thumbColor={notificationSettings.friendRequests ? '#7839EE' : '#F8F9FA'}
                                ios_backgroundColor="#CED4DA"
                            />
                        </View>
                        {/* Adicionar mais switches para systemUpdates, sound, vibration se necessário */}

                    </View>

                     {/* Botão Aplicar/Fechar no rodapé */}
                    <TouchableOpacity
                        style={styles.applyButton}
                        onPress={() => setFilterModalVisible(false)}
                    >
                        <Text style={styles.applyButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );


    // Filtros rápidos horizontais
    const renderQuickFilters = () => {
        const filters = [
            { key: 'all', label: 'Todas' },
            { key: 'event', label: 'Eventos', icon: '📅' },
            { key: 'group', label: 'Grupos', icon: '👥' },
            { key: 'friend', label: 'Amigos', icon: '👤' },
            // { key: 'system', label: 'Sistema', icon: '⚙️' }, // Adicionar se relevante
        ];

        // Determina se um filtro específico está ativo (e não o 'all')
        const isSpecificFilterActive = (key) => selectedFilters.includes(key) && !selectedFilters.includes('all');

        return (
            <View style={styles.quickFiltersContainer}>
                <FlatList // Usar FlatList para rolagem horizontal se houver muitos filtros
                    data={filters}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => {
                        const isSelected = item.key === 'all' ? selectedFilters.includes('all') : isSpecificFilterActive(item.key);
                         return (
                            <TouchableOpacity
                                style={[
                                    styles.quickFilterButton,
                                    isSelected && styles.quickFilterButtonSelected
                                ]}
                                onPress={() => toggleFilter(item.key)}
                            >
                                {item.icon && <Text style={styles.quickFilterIcon}>{item.icon}</Text>}
                                <Text style={[
                                    styles.quickFilterText,
                                    isSelected && styles.quickFilterTextSelected
                                ]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                         );
                    }}
                    contentContainerStyle={{ paddingHorizontal: 16 }} // Espaçamento nas bordas da lista
                />
            </View>
        );
    };

    // Calcula o número total de notificações não lidas
    const unreadCount = notifications.reduce((count, section) => {
        return count + section.data.filter(item => !item.read).length;
    }, 0);


    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {/* Botão Voltar (opcional, depende da navegação) */}
                 <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Text style={styles.backButtonText}>←</Text>
                </TouchableOpacity>

                {/* Título com contador de não lidas */}
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Notificações</Text>
                     {unreadCount > 0 && (
                        <View style={styles.unreadBadge}>
                            <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
                        </View>
                    )}
                </View>


                {/* Ações do Header */}
                <View style={styles.headerActions}>
                     {/* Marcar todas como lidas (só mostra se houver não lidas) */}
                    {unreadCount > 0 && (
                         <TouchableOpacity
                            style={styles.headerActionButton}
                            onPress={markAllAsRead}
                             hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            <Text style={styles.headerActionText}>Marcar Lidas</Text>
                        </TouchableOpacity>
                    )}

                    {/* Botão de Filtros/Configurações */}
                    <TouchableOpacity
                        style={styles.headerActionButton}
                        onPress={() => setFilterModalVisible(true)}
                         hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                        {/* Ícone de Filtro ou Engrenagem */}
                        <Text style={styles.headerActionIcon}>⚙️</Text>
                        {/* Ou <Text style={styles.headerActionText}>Filtros</Text> */}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Filtros rápidos */}
            {renderQuickFilters()}

            {/* Lista de notificações ou estado de carregamento/vazio */}
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#7839EE" />
                    <Text style={styles.loadingText}>Carregando notificações...</Text>
                </View>
            ) : (
                <SectionList
                    sections={getFilteredNotifications()} // Usa as notificações filtradas
                    renderItem={renderNotificationItem}
                    renderSectionHeader={renderSectionHeader}
                    keyExtractor={(item, index) => item.id + index} // Chave única
                    ListEmptyComponent={renderEmptyComponent} // Componente para lista vazia
                    contentContainerStyle={styles.listContainer}
                    stickySectionHeadersEnabled={true} // Cabeçalhos ficam fixos no topo
                    refreshControl={ // Funcionalidade "Puxar para atualizar"
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#7839EE', '#A67CFF']} // Cores do indicador de refresh
                            tintColor={'#7839EE'} // Cor para iOS
                        />
                    }
                    initialNumToRender={10} // Otimização: renderiza itens iniciais
                    maxToRenderPerBatch={5} // Otimização: renderiza em lotes
                    windowSize={10} // Otimização: janela de renderização
                />
            )}

            {/* Modal de filtros (renderizado fora do fluxo principal) */}
            {renderFilterModal()}
        </SafeAreaView>
    );
};

// --- Estilos ---
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA', // Um cinza bem claro para o fundo geral
    },
    // --- Header ---
    header: {
        height: 60,
        backgroundColor: '#FFFFFF', // Fundo branco para o header
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF', // Linha divisória sutil
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between', // Espaça os itens
    },
     backButton: {
        padding: 5, // Área de toque um pouco maior
        marginRight: 10,
    },
    backButtonText: {
        fontSize: 28, // Maior para facilitar o toque
        color: '#495057', // Cor mais escura
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        // Ocupa o espaço central, mas permite que as ações à direita tenham espaço
        flexShrink: 1,
         marginLeft: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600', // Semi-bold
        color: '#212529', // Preto suave
    },
     unreadBadge: {
        backgroundColor: '#DC3545', // Vermelho para destaque
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        marginLeft: 8,
        minWidth: 20, // Largura mínima para números únicos
        justifyContent: 'center',
        alignItems: 'center',
    },
    unreadBadgeText: {
        color: '#FFFFFF',
        fontSize: 11,
        fontWeight: 'bold',
    },
    headerActions: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerActionButton: {
        marginLeft: 15, // Espaçamento entre botões de ação
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    headerActionText: {
        fontSize: 13,
        color: '#7839EE', // Cor principal da marca
        fontWeight: '500',
    },
     headerActionIcon: {
        fontSize: 22,
        color: '#495057',
    },
    // --- Filtros Rápidos ---
    quickFiltersContainer: {
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
    },
    quickFilterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 20, // Bordas arredondadas
        backgroundColor: '#E9ECEF', // Fundo cinza claro padrão
        marginRight: 10, // Espaçamento entre botões
        borderWidth: 1,
        borderColor: 'transparent', // Sem borda por padrão
    },
    quickFilterButtonSelected: {
        backgroundColor: '#E0DFFF', // Fundo roxo claro para selecionado
        borderColor: '#7839EE', // Borda roxa
    },
    quickFilterIcon: {
        fontSize: 14,
        marginRight: 5,
    },
    quickFilterText: {
        fontSize: 13,
        color: '#495057', // Cor de texto padrão
        fontWeight: '500',
    },
    quickFilterTextSelected: {
        color: '#7839EE', // Cor roxa para texto selecionado
        fontWeight: '600',
    },
    // --- Loading ---
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
    },
    loadingText: {
        marginTop: 15,
        fontSize: 15,
        color: '#6C757D', // Cinza médio
    },
    // --- Lista ---
    listContainer: {
        flexGrow: 1, // Permite que o container cresça para o conteúdo
        paddingBottom: 20, // Espaço no final da lista
    },
    sectionHeader: {
        backgroundColor: '#F1F3F5', // Fundo levemente diferente para cabeçalho de seção
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#DEE2E6', // Linha divisória um pouco mais escura
    },
    sectionHeaderText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#495057', // Cor de texto mais escura
        textTransform: 'uppercase', // Caixa alta para destaque
    },
    // --- Item da Notificação ---
    notificationItem: {
        backgroundColor: '#FFFFFF', // Fundo branco para itens
        // Não usar padding aqui, aplicar no content para clique funcionar melhor
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF', // Linha divisória entre itens
        position: 'relative', // Necessário para posicionar o deleteButton
    },
    unreadNotification: {
        backgroundColor: '#F7F3FF', // Fundo muito levemente roxo para não lidas
        borderLeftWidth: 3, // Indicador visual na esquerda
        borderLeftColor: '#7839EE',
    },
    notificationContent: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Alinha itens no início (vertical)
        paddingVertical: 14,
        paddingHorizontal: 16,
        paddingRight: 40, // Deixa espaço para o botão de excluir
    },
    unreadDot: { // Não mais usado, substituído por borderLeft
        // width: 8,
        // height: 8,
        // borderRadius: 4,
        // backgroundColor: '#7839EE',
        // marginRight: 8, // Espaço antes do ícone
        // marginTop: 5, // Ajuste vertical
    },
    notificationIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20, // Círculo perfeito
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        // backgroundColor é definido dinamicamente inline
    },
    notificationIconText: {
        fontSize: 18,
    },
    notificationTextContainer: {
        flex: 1, // Ocupa o espaço restante
    },
    notificationTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#343A40', // Preto um pouco mais suave
        marginBottom: 3,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#495057', // Cinza escuro
        marginBottom: 6,
        lineHeight: 19, // Espaçamento entre linhas
    },
     notificationMetaText: { // Estilo comum para grupo e tempo
        fontSize: 12,
        color: '#6C757D', // Cinza médio
        marginTop: 4, // Espaçamento antes dos metadados
    },
    actionButton: {
        alignSelf: 'flex-start', // Para não ocupar largura total
        marginTop: 10, // Espaço acima do botão
        paddingVertical: 7,
        paddingHorizontal: 14,
        borderRadius: 15, // Bordas arredondadas
        // backgroundColor definido dinamicamente
    },
    actionButtonText: {
        fontSize: 12,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    deleteButton: {
        position: 'absolute',
        right: 10, // Posição no canto direito
        top: 10, // Posição no canto superior
        width: 30, // Área de toque maior
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
         zIndex: 1, // Garante que fique sobre o conteúdo se necessário
    },
    deleteButtonText: {
        fontSize: 22,
        color: '#ADB5BD', // Cinza claro
        fontWeight: 'bold',
    },
    // --- Estado Vazio ---
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingBottom: 50, // Empurra um pouco para cima
        backgroundColor: '#F8F9FA',
    },
    emptyIconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#E9ECEF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    emptyIcon: {
        fontSize: 30,
        color: '#ADB5BD',
    },
    emptyTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 10,
        textAlign: 'center',
    },
    emptyText: {
        fontSize: 14,
        color: '#6C757D',
        textAlign: 'center',
        lineHeight: 20,
    },
    refreshButtonEmpty: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#7839EE',
        borderRadius: 20,
    },
    refreshButtonEmptyText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '500',
    },
    // --- Modal de Filtros ---
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Overlay mais escuro
        justifyContent: 'center', // Centraliza verticalmente
        alignItems: 'center', // Centraliza horizontalmente
    },
    modalContent: {
        width: '90%', // Modal um pouco mais largo
        maxWidth: 400, // Largura máxima para tablets
        backgroundColor: '#FFFFFF',
        borderRadius: 15, // Bordas mais arredondadas
        overflow: 'hidden', // Garante que o conteúdo não saia das bordas
        maxHeight: '80%', // Altura máxima para não ocupar a tela toda
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E9ECEF',
    },
    modalTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#343A40',
    },
    modalCloseButton: {
        padding: 5, // Área de toque
    },
    modalCloseText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ADB5BD',
    },
    modalBody: {
        paddingHorizontal: 20,
        paddingTop: 15,
         paddingBottom: 5, // Reduz padding inferior para dar espaço ao botão
        //ScrollView pode ser necessário se o conteúdo for muito grande
    },
    filterSectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        marginBottom: 10,
        marginTop: 5, // Espaço acima do título da seção
    },
    filterOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12, // Mais espaço vertical
        // borderBottomWidth: 1, // Remover bordas individuais
        // borderBottomColor: '#F1F3F5',
    },
    selectedFilterOption: {
        backgroundColor: '#F7F3FF', // Fundo roxo bem claro
        borderRadius: 8, // Arredonda a seleção
        marginHorizontal: -5, // Compensa o padding do body para tocar as bordas
        paddingHorizontal: 5, // Adiciona padding interno
    },
    filterOptionLabel: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    filterOptionIcon: {
        fontSize: 18, // Ícone um pouco maior
        marginRight: 10,
        color: '#495057',
    },
    filterOptionText: {
        fontSize: 15, // Texto maior
        color: '#343A40',
    },
    filterOptionCheckmark: {
        fontSize: 18,
        color: '#7839EE',
        fontWeight: 'bold',
    },
    modalDivider: {
        height: 1, // Linha fina
        backgroundColor: '#E9ECEF',
        marginVertical: 15, // Mais espaço vertical
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
    },
    settingText: {
        fontSize: 15,
        color: '#343A40',
        flexShrink: 1, // Permite que o texto quebre se necessário
        marginRight: 10,
    },
    applyButton: {
        margin: 20, // Margem ao redor do botão
        marginTop: 15, // Menos margem no topo
        backgroundColor: '#7839EE',
        borderRadius: 10, // Bordas arredondadas
        paddingVertical: 14, // Botão maior
        alignItems: 'center',
        justifyContent: 'center',
    },
    applyButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default NotificationsScreen;