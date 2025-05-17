import React, { useState } from 'react';
import {
  Text,
  Provider,
  TextInput,
  Card,
  Modal,
  Portal,
} from 'react-native-paper';
import { View, TouchableOpacity, StyleSheet, ImageBackground, FlatList, Pressable, Alert } from 'react-native';

export default function ConviteScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [grupoSelecionado, setGrupoSelecionado] = useState(null);  // objeto ou null
  const [modalVisible, setModalVisible] = useState(false);

  const userGroups = [
    { id: '1', nome: 'Grupo A', membros: 10 },
    { id: '2', nome: 'Grupo B', membros: 8 },
    { id: '3', nome: 'Grupo C', membros: 15 },
    { id: '4', nome: 'Grupo A', membros: 10 },
    { id: '5', nome: 'Grupo B', membros: 8 },
    { id: '6', nome: 'Grupo C', membros: 15 },
    { id: '7', nome: 'Grupo A', membros: 10 },
    { id: '8', nome: 'Grupo B', membros: 8 },
    { id: '9', nome: 'Grupo C', membros: 15 },
    { id: '10', nome: 'Grupo A', membros: 10 },
    { id: '11', nome: 'Grupo B', membros: 8 },
    { id: '12', nome: 'Grupo C', membros: 15 },
    { id: '13', nome: 'Grupo A', membros: 10 },
    { id: '14', nome: 'Grupo B', membros: 8 },
    { id: '15', nome: 'Grupo C', membros: 15 },
    { id: '16', nome: 'Grupo A', membros: 10 },
    { id: '17', nome: 'Grupo B', membros: 8 },
    { id: '18', nome: 'Grupo C', membros: 15 },
    { id: '19', nome: 'Grupo A', membros: 10 },
    { id: '20', nome: 'Grupo B', membros: 8 },
    { id: '21', nome: 'Grupo C', membros: 15 },
  ];

  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const handleSelectGroup = (group) => {
    setGrupoSelecionado(group);  // salva o objeto completo
    hideModal();
  };

  const handleEnviarConvite = async () => {
    if(!grupoSelecionado){
      Alert.alert('Selecione um grupo');
      return;
    }
    if(email.trim() === ''){
      Alert.alert('Digite um email');
      return;
    }
    // lógica para enviar convite aqui...
  };

  return (
    <Provider>
      <ImageBackground
        source={require('../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <View style={styles.mainTextContainer}>
            <Text style={styles.mainText}>Convite para Grupo</Text>
          </View>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.sectionTitle}>Grupo</Text>

              <Pressable onPress={showModal}>
                <TextInput
                  placeholder="Selecione um grupo"
                  value={grupoSelecionado ? grupoSelecionado.nome : ''}
                  editable={false}
                  pointerEvents="none"
                  style={{ backgroundColor: '#F4F4F4', marginBottom: 15 }}
                  right={<TextInput.Icon icon="menu-down" />}
                />
              </Pressable>

              <Portal>
                <Modal visible={modalVisible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                  <FlatList
                    data={userGroups}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleSelectGroup(item)}
                        style={styles.groupItem}
                      >
                        <Text style={styles.groupName}>{item.nome}</Text>
                        <Text style={styles.groupMembers}>{item.membros} membros</Text>
                      </TouchableOpacity>
                    )}
                  />
                </Modal>
              </Portal>

              <Text style={styles.sectionTitle}>Email</Text>
              <TextInput
                style={styles.input}
                underlineColor="transparent"
                mode="outlined"
                placeholder="Digite um email..."
                placeholderTextColor="#757575"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button} onPress={handleEnviarConvite}>
                  <Text style={styles.buttonText}>Enviar convite</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonCancel}>
                  <Text style={styles.buttonCancelText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </Card.Content>
          </Card>
        </View>
      </ImageBackground>
    </Provider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    elevation: 2,
    backgroundColor: '#fff',
  },
  input: {
    height: 60,
    backgroundColor: '#F4F4F4',
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  buttonCancel: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#712fe5',
    flex: 1,
  },
  buttonCancelText: {
    color: '#712fe5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#712fe5',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    flex: 1,
  },
  mainTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  mainText: {
    color: '#712fe5',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 100,
  },
  sectionTitle: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  modal: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 16,
    maxHeight: '60%',
  },
  groupItem: {
    paddingVertical: 12,
    borderBottomColor: '#DDD',
    borderBottomWidth: 1,
  },
  groupName: {
    fontSize: 16,
    fontWeight: '600',
  },
  groupMembers: {
    fontSize: 12,
    color: '#666',
  },
});
