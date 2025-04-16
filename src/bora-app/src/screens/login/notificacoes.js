import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Modal
} from 'react-native';
import { ModalNotificacoes } from '../../components/notificacoes_modal'; // seu componente personalizado

// Simulando notificações
const notifications = [
  {
    id: '1',
    titleCard: 'Convite de Grupo',
    message: 'Você foi convidado para o grupo ADS - PUC',
    time: '11/04/2025 - 16:23',
    grupo: 'Faculdade'
  },
  {
    id: '2',
    titleCard: 'Evento hoje!',
    message: 'Você possui o evento "Aniversário da Carlinha" hoje as 16:00 do grupo Família Souza',
    time: '12/04/2025 - 00:00',
    grupo: 'Faculdade'
  },
  {
    id: '3',
    titleCard: 'Convite de Evento',
    message: 'Você recebeu o convite para o evento "Happy Hour da firma" dia 18/04/2025 as 18:00 no grupo "Eventos Firma 008"',
    time: '13/04/2025 - 17:22',
    grupo: 'Faculdade'
  },
  {
    id: '4',
    titleCard: 'Lembrete de Evento',
    message: 'O evento "Reunião de Pais" começa em 1 hora no grupo Escola João XXIII',
    time: '14/04/2025 - 08:00',
    grupo: 'Faculdade'
  },
  {
    id: '5',
    titleCard: 'Convite de Grupo',
    message: 'Você foi adicionado ao grupo "Equipe de Projeto - Startup 2025"',
    time: '14/04/2025 - 13:45',
    grupo: 'Faculdade'
  },
  {
    id: '6',
    titleCard: 'Evento amanhã!',
    message: 'Não se esqueça do evento "Churrasco dos Amigos" amanhã às 12:00 no grupo Amigos de Verdade',
    time: '15/04/2025 - 09:10',
    grupo: 'Faculdade'
  },
  {
    id: '7',
    titleCard: 'Convite de Evento',
    message: 'Você foi convidado para "Aula de Dança Online" no grupo Fit & Dance',
    time: '15/04/2025 - 19:35',
    grupo: 'Faculdade'
  },
  {
    id: '8',
    titleCard: 'Alteração de Evento',
    message: 'O evento "Revisão do TCC" foi reagendado para 20/04/2025 às 14:00 no grupo ADS - PUC',
    time: '16/04/2025 - 10:22',
    grupo: 'Faculdade'
  },
];

const backgroundImage = require('../../assets/background.png');

// Item da lista com clique
const NotificationItem = ({ titleCard, message, time, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.notificationContainer}>
    <View style={styles.internalNotificationContainer}>
      <Text style={styles.titleCard}>{titleCard}</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  </TouchableOpacity>
);

// Componente principal da tela
const NotificacoesScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const openModal = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setModalVisible(false);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>Notificações</Text>
        </View>

        <SafeAreaView style={styles.container}>
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NotificationItem
                titleCard={item.titleCard}
                message={item.message}
                time={item.time}
                onPress={() => openModal(item)}
              />
            )}
          />
        </SafeAreaView>
      </View>

      {/* Modal visível ao clicar em uma notificação */}
      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedNotification && (
              <>
                <ModalNotificacoes
                  title={selectedNotification.titleCard}
                  message={selectedNotification.message}
                  date={selectedNotification.time}
                  handleClose={() => setModalVisible(false)}
                />
              </>
            )}
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default NotificacoesScreen;

// Estilos
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    marginTop: 10
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color: '#111',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 100
  },
  notificationContainer: {
    backgroundColor: '#cccccc',
    padding: 9,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 2,
  },
  titleCard: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111',
  },
  message: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'right',
  },
  title: {
    color: '#712fe5',
    fontWeight: 'bold',
    fontSize: 20
  },
  internalNotificationContainer: {
    backgroundColor: '#ffffffcc',
    padding: 10
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffffcc',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    width: '85%',
    borderRadius: 12,
    elevation: 5,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#712fe5',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
