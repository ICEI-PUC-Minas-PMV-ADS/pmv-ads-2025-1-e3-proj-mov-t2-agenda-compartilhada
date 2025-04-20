import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Modal,
  Alert,
  BackHandler,
  AppState,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { ModalNotificacoes } from '../../components/notificacoes_modal';
import axios from 'axios';
import { API_IP } from '@env';

const backgroundImage = require('../../assets/background.png');

const NotificationItem = ({ titleCard, message, time, lido, onPress }) => {
  const notificationStyle = lido
    ? { backgroundColor: '#cccccc', borderColor: '#BDBDBD' }
    : { backgroundColor: '#4CAF50', borderColor: '#388E3C' };

  return (
    <TouchableOpacity onPress={onPress} style={[styles.notificationContainer, notificationStyle]}>
      <View style={styles.internalNotificationContainer}>
        <Text style={styles.titleCard}>{titleCard}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const NotificacoesScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const openModal = async (notification) => {
    try {
      await axios.patch(
        `http://192.168.0.253:3000/notificacoes/${notification.id}/marcar-como-lida`,
        { lido: true }
      );
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
      Alert.alert('Erro', 'Não foi possível marcar a notificação como lida');
    }

    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setModalVisible(false);
    carregarNotificacoes();

  };

  function formatarDataHora(dateString) {
    const date = new Date(dateString);

    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const ano = date.getFullYear();

    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} - ${horas}:${minutos}`;
  }

  const carregarNotificacoes = async () => {
    try {
      const usuarioJson = await AsyncStorage.getItem('usuario');
      const usuario = JSON.parse(usuarioJson);
      const response = await axios.get(
        `${API_IP}/notificacoes/usuario/${usuario._id}`
      );
      const dataTransformada = response.data.map((item) => ({
        id: item._id,
        titleCard: item.titulo,
        message: item.mensagem,
        time: formatarDataHora(item.data),
        lido: item.lido,
      }));
      setNotificacoes(dataTransformada);
    } catch (error) {
      console.error('Erro ao buscar notificações:', error);
      Alert.alert('Erro', 'Não foi possível carregar notificações');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarNotificacoes();

      const onBackPress = () => {
        Alert.alert(
          'Sair',
          'Você realmente deseja sair?',
          [
            { text: 'Não', style: 'cancel' },
            {
              text: 'Sim',
              onPress: async () => {
                await AsyncStorage.removeItem('token');
                navigation.navigate('loginScreen');
              },
            },
          ],
          { cancelable: false }
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, [])
  );

  useEffect(() => {
    const subscription = AppState.addEventListener('change', async (state) => {
      if (state === 'inactive' || state === 'background') {
        await AsyncStorage.removeItem('token');
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>Notificações</Text>
        </View>

        <SafeAreaView style={styles.container}>
          {loading ? (
            <ActivityIndicator size="large" color="#712fe5" />
          ) : (
            <FlatList
              data={notificacoes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <NotificationItem
                  titleCard={item.titleCard}
                  message={item.message}
                  time={item.time}
                  lido={item.lido}
                  onPress={() => openModal(item)}
                />
              )}
            />
          )}
        </SafeAreaView>
      </View>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedNotification && (
              <ModalNotificacoes
                title={selectedNotification.titleCard}
                message={selectedNotification.message}
                date={selectedNotification.time}
                handleClose={closeModal}
              />
            )}
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default NotificacoesScreen;

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
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
    borderRadius: 100,
  },
  notificationContainer: {
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
  internalNotificationContainer: {
    backgroundColor: '#ffffffcc',
    padding: 10,
  },
  title: {
    color: '#712fe5',
    fontWeight: 'bold',
    fontSize: 20,
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
})
