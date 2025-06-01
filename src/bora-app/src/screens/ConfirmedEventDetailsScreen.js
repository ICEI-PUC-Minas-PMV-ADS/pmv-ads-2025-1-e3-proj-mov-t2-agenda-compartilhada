// src/bora-app/src/screens/ConfirmedEventDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
// Não vamos mais usar o NavBar global aqui, e sim um header customizado
// import NavBar from '../components/NavBar'; 
import { Ionicons } from '@expo/vector-icons'; // Para os ícones dos detalhes

const ConfirmedEventDetailsScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { event } = route.params;

    const currentEvent = event || {
        id: 'defaultId',
        name: 'Detalhes do Evento',
        time: 'Não definido',
        location: 'Não definido',
        group: 'Não definido',
        description: 'Não disponível.'
    };

    return (
        <SafeAreaView style={styles.screenContainer}>
            {/* Header Customizado - Similar ao ProfileScreen.js */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    {/* Usando Ionicons para a seta, mas pode ser <Text>←</Text> como no ProfileScreen */}
                    <Ionicons name="arrow-back" size={24} color="#333333" /> 
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Detalhes do Evento</Text>
                {/* Placeholder para ajudar a centralizar o título, igual no ProfileScreen */}
                <View style={styles.headerPlaceholder} /> 
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.contentCard}>
                    <Text style={styles.eventName}>{currentEvent.name}</Text>

                    <View style={styles.infoItem}>
                        <Ionicons name="time-outline" size={22} style={styles.icon} />
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.label}>Horário:</Text>
                            <Text style={styles.infoText}>{currentEvent.time}</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons name="location-outline" size={22} style={styles.icon} />
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.label}>Local:</Text>
                            <Text style={styles.infoText}>{currentEvent.location}</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons name="people-outline" size={22} style={styles.icon} />
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.label}>Grupo:</Text>
                            <Text style={styles.infoText}>{currentEvent.group}</Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <Ionicons name="document-text-outline" size={22} style={styles.icon} />
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.label}>Descrição:</Text>
                            <Text style={styles.infoText}>{currentEvent.description}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: Platform.OS === 'ios' ? '#F0F0F0' : '#FFFFFF', // Fundo da tela geral
    },
    // Estilos do Header (baseados no ProfileScreen.js)
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF', // Fundo branco para o header
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    backButton: {
        // Estilo do botão de voltar como no ProfileScreen
        width: 40, // Área de toque
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 17, // Tamanho do título do header
        fontWeight: '600', // Peso da fonte como no ProfileScreen
        color: '#333333',
    },
    headerPlaceholder: { // Para ajudar a centralizar o título
        width: 40, // Mesma largura do backButton para equilíbrio
    },
    // Restante dos estilos
    scrollView: {
        flex: 1,
        backgroundColor: '#F0F0F0', // Fundo do scrollview, se diferente do card
    },
    contentCard: {
        backgroundColor: '#FFFFFF',
        marginHorizontal: 15,
        marginTop: 15, // Espaço abaixo do header customizado
        marginBottom: 25,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingTop: 20, // Padding no topo do card
        paddingBottom: 10, // Menor padding na base do card se não houver mais elementos
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    eventName: { // Nome do evento (título principal dentro do card)
        fontSize: 22, 
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 25,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    icon: {
        marginRight: 15,
        color: '#5856D6', // Ajuste a cor do ícone conforme o print/sua paleta
        marginTop: 2,
    },
    infoTextContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#48484A',
        marginRight: 8,
    },
    infoText: {
        fontSize: 16,
        color: '#6B6B6B',
        flexShrink: 1,
        lineHeight: 22,
    },
});

export default ConfirmedEventDetailsScreen;