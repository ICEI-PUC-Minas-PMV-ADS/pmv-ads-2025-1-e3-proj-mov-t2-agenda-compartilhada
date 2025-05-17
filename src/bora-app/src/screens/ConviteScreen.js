import React, { useState, useEffect } from 'react';
import {
  Text,
  Provider,
  TextInput,
  Card,
  Modal,
  Portal,
} from 'react-native-paper';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_IP } from '@env';

export default function ConviteScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [grupos, setGrupos] = useState([]); // Lista de grupos do usuário [{ nome, idGrupo }]
  const [grupoSelecionado, setGrupoSelecionado] = useState(null); // objeto grupo completo
  const [idGrupoSelecionado, setIdGrupoSelecionado] = useState(null); // id do grupo selecionado
  const [modalVisible, setModalVisible] = useState(false);
  const [usuarioEmail, setUsuarioEmail] = useState('');

  // Função para carregar email e buscar grupos do usuário
  // 2. Atualize o useEffect para salvar o email do usuário logado
    useEffect(() => {
    const carregarDadosDoAsyncStorage = async () => {
        try {
        const usuarioRaw = await AsyncStorage.getItem('usuario');
        if (usuarioRaw) {
            const usuario = JSON.parse(usuarioRaw);
            const emailLogado = usuario.email;

            setUsuarioEmail(emailLogado);

            // Buscar grupos pela API usando o email
            fetch(`${API_IP}/grupos/usuario/${encodeURIComponent(emailLogado)}`)
            .then((response) => response.json())
            .then((data) => {
                const gruposFormatados = data.map((g) => ({
                nome: g.nome,
                idGrupo: g._id,
                }));
                setGrupos(gruposFormatados);
            })
            .catch((error) => {
                console.error('Erro ao buscar grupos:', error);
                Alert.alert('Erro ao buscar grupos do usuário.');
            });
        }
        } catch (error) {
        console.error('Erro ao buscar dados do AsyncStorage:', error);
        }
    };

    carregarDadosDoAsyncStorage();
    }, []);


  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  // Quando seleciona grupo, atualiza grupoSelecionado e idGrupoSelecionado
  const handleSelectGroup = (group) => {
    setGrupoSelecionado(group);
    setIdGrupoSelecionado(group.idGrupo);
    hideModal();
  };

  const handleEnviarConvite = async () => {
    if (!idGrupoSelecionado) {
        Alert.alert('Selecione um grupo');
        return;
    }
    if (email.trim() === '') {
        Alert.alert('Digite um email');
        return;
    }

    try {
        const response = await fetch(`${API_IP}/usuarios/email/${encodeURIComponent(email)}`);

        if (!response.ok) {
        throw new Error('Erro na requisição');
        }

        const text = await response.text();

        if (!text) {
            Alert.alert('Usuário não encontrado', 'Nenhum usuário com esse email foi encontrado.');
            return;
        }

        if (usuarioEmail == email){
            Alert.alert('Usuário inválido', 'Você não pode enviar convite para si mesmo.');
            return;
        }

        const user = JSON.parse(text);

        if (!user || Object.keys(user).length === 0) {
            Alert.alert('Usuário não encontrado', 'Nenhum usuário com esse email foi encontrado.');
            return;
        }

        // Exemplo:
        // await fetch(`${API_IP}/convites`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify({ email, idGrupo: idGrupoSelecionado }),
        // });

        Alert.alert('Convite enviado com sucesso!');
        setEmail('')
        setGrupoSelecionado(null)
    } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        Alert.alert('Erro', 'Não foi possível verificar o usuário. Tente novamente mais tarde.');
    }
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
                <Modal
                  visible={modalVisible}
                  onDismiss={hideModal}
                  contentContainerStyle={styles.modal}
                >
                  <FlatList
                    data={grupos}
                    keyExtractor={(item) => item.idGrupo}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleSelectGroup(item)}
                        style={styles.groupItem}
                      >
                        <Text style={styles.groupName}>{item.nome}</Text>
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
