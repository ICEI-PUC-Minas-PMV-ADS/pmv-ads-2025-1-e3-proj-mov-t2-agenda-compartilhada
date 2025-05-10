import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Modal,
} from 'react-native';
import {
  Text,
  Button,
  TextInput,
  Surface,
  Avatar,
  Chip,
  Divider,
  IconButton,
  Title,
  Subheading,
  useTheme,
  Card,
  List,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// Componente principal da tela de convite
const ConviteScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [mode, setMode] = useState('username'); // 'username' ou 'email'
  const [searchResults, setSearchResults] = useState([]);
  const [groupModalVisible, setGroupModalVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  // Lista simulada de grupos do usuário
  const [userGroups, setUserGroups] = useState([
    { id: 'g123', nome: 'Amigos da PUC', descricao: 'Grupo para organizar os encontros da turma', membros: 5, imagem: null },
    { id: 'g124', nome: 'Família', descricao: 'Eventos familiares', membros: 8, imagem: null },
    { id: 'g125', nome: 'Amigos do Trabalho', descricao: 'Happy hours e encontros', membros: 12, imagem: null },
    { id: 'g126', nome: 'Clube de Corrida', descricao: 'Para organizar treinos e corridas', membros: 15, imagem: null },
  ]);

  // Dados do grupo selecionado
  const grupo = selectedGroup || (route?.params?.grupo);

  // Simular a busca de usuários
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    // Simulação de resultados de busca
    if (query.length > 2) {
      // Em um app real, essa seria uma chamada à API
      const mockResults = [
        { id: 'u1', nome: 'Maria Silva', username: 'mariasilva', email: 'maria@email.com', avatar: null },
        { id: 'u2', nome: 'João Pereira', username: 'joaop', email: 'joao@email.com', avatar: null },
        { id: 'u3', nome: 'Ana Costa', username: 'anac', email: 'ana@email.com', avatar: null },
        { id: 'u4', nome: 'Carlos Santos', username: 'carloss', email: 'carlos@email.com', avatar: null },
        { id: 'u5', nome: 'Lucia Ferreira', username: 'luciaf', email: 'lucia@email.com', avatar: null },
      ];
      
      // Filtra baseado no modo (username ou email)
      const filtrados = mockResults.filter(user => {
        if (mode === 'username') {
          return user.username.toLowerCase().includes(query.toLowerCase()) ||
                 user.nome.toLowerCase().includes(query.toLowerCase());
        } else {
          return user.email.toLowerCase().includes(query.toLowerCase());
        }
      });
      
      setSearchResults(filtrados);
    } else {
      setSearchResults([]);
    }
  };

  // Adicionar/remover usuário da lista de selecionados
  const toggleUserSelection = (user) => {
    if (selectedUsers.some(u => u.id === user.id)) {
      setSelectedUsers(selectedUsers.filter(u => u.id !== user.id));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  // Alternar entre busca por username ou email
  const toggleSearchMode = () => {
    setMode(mode === 'username' ? 'email' : 'username');
    setSearchQuery('');
    setSearchResults([]);
  };

  // Selecionar um grupo
  const selectGroup = (group) => {
    setSelectedGroup(group);
    setGroupModalVisible(false);
  };

  // Enviar convites para os usuários selecionados
  const enviarConvites = () => {
    // Aqui seria implementada a lógica para enviar convites via API
    console.log('Enviando convites para:', selectedUsers);
    console.log('Para o grupo:', selectedGroup);
    
    // Feedback ao usuário
    alert('Convites enviados com sucesso!');
    
    // Limpar seleção e voltar para a tela anterior
    setSelectedUsers([]);
    navigation.goBack();
  };

  // Componente do modal de seleção de grupo
  const renderGroupSelectionModal = () => (
    <Modal
      visible={groupModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setGroupModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Title style={styles.modalTitle}>Selecione um Grupo</Title>
          
          <ScrollView style={styles.groupListContainer}>
            {userGroups.map(group => (
              <TouchableOpacity 
                key={group.id}
                style={styles.groupItem}
                onPress={() => selectGroup(group)}
              >
                <Avatar.Text 
                  size={40} 
                  label={group.nome.substring(0, 2).toUpperCase()} 
                  backgroundColor={theme.colors.primary}
                />
                <View style={styles.groupItemInfo}>
                  <Text style={styles.groupItemTitle}>{group.nome}</Text>
                  <Text style={styles.groupItemSubtitle}>{group.membros} membros</Text>
                </View>
                <IconButton
                  icon="chevron-right"
                  size={20}
                  color={theme.colors.placeholder}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <Button 
            mode="outlined" 
            onPress={() => setGroupModalVisible(false)}
            style={styles.modalCancelButton}
          >
            Cancelar
          </Button>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Seleção de grupo */}
          <Card style={styles.groupSelectionCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Grupo para Convite</Title>
              
              {selectedGroup ? (
                <Surface style={styles.selectedGroupContainer}>
                  <View style={styles.selectedGroupInfo}>
                    <Avatar.Text 
                      size={40} 
                      label={selectedGroup.nome.substring(0, 2).toUpperCase()} 
                      backgroundColor={theme.colors.primary}
                    />
                    <View style={styles.selectedGroupDetails}>
                      <Text style={styles.selectedGroupName}>{selectedGroup.nome}</Text>
                      <Text style={styles.selectedGroupDescription}>{selectedGroup.descricao}</Text>
                    </View>
                  </View>
                  <Button 
                    mode="text" 
                    onPress={() => setGroupModalVisible(true)}
                    style={styles.changeGroupButton}
                  >
                    Trocar
                  </Button>
                </Surface>
              ) : (
                <Button 
                  mode="contained" 
                  onPress={() => setGroupModalVisible(true)}
                  style={styles.selectGroupButton}
                  icon="account-group"
                >
                  Selecionar Grupo
                </Button>
              )}
            </Card.Content>
          </Card>

          {/* Busca de usuários para convidar */}
          <Card style={styles.inviteCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Convidar Pessoas</Title>
              
              {/* Toggle entre busca por username ou email */}
              <View style={styles.toggleContainer}>
                <Chip 
                  selected={mode === 'username'} 
                  onPress={() => setMode('username')}
                  style={styles.toggleChip}
                >
                  Por nome ou username
                </Chip>
                <Chip 
                  selected={mode === 'email'} 
                  onPress={() => setMode('email')}
                  style={styles.toggleChip}
                >
                  Por e-mail
                </Chip>
              </View>

              {/* Campo de busca */}
              <TextInput
                label={mode === 'username' ? "Buscar por nome ou username" : "Buscar por e-mail"}
                value={searchQuery}
                onChangeText={handleSearch}
                mode="outlined"
                left={<TextInput.Icon name="magnify" />}
                style={styles.searchInput}
                placeholder={mode === 'username' ? "Ex: Maria ou mariasilva" : "Ex: maria@email.com"}
                autoCapitalize="none"
              />

              {/* Resultados da busca */}
              {searchResults.length > 0 && (
                <View style={styles.resultsContainer}>
                  <Text style={styles.resultCount}>
                    {searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                  </Text>
                  
                  {searchResults.map((user) => (
                    <TouchableOpacity 
                      key={user.id}
                      onPress={() => toggleUserSelection(user)}
                      style={[
                        styles.userItem,
                        selectedUsers.some(u => u.id === user.id) && styles.selectedUserItem
                      ]}
                    >
                      <View style={styles.userInfo}>
                        <Avatar.Text 
                          size={40} 
                          label={user.nome.substring(0, 2).toUpperCase()} 
                        />
                        <View style={styles.userDetails}>
                          <Text style={styles.userName}>{user.nome}</Text>
                          <Text style={styles.userUsername}>
                            {mode === 'username' ? `@${user.username}` : user.email}
                          </Text>
                        </View>
                      </View>
                      
                      <IconButton
                        icon={selectedUsers.some(u => u.id === user.id) ? "check-circle" : "plus-circle-outline"}
                        color={selectedUsers.some(u => u.id === user.id) ? theme.colors.primary : theme.colors.placeholder}
                        size={24}
                        onPress={() => toggleUserSelection(user)}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Mensagem quando não há resultados */}
              {searchQuery.length > 2 && searchResults.length === 0 && (
                <View style={styles.noResults}>
                  <Text>Nenhum usuário encontrado</Text>
                </View>
              )}
            </Card.Content>
          </Card>

          {/* Lista de usuários selecionados */}
          {selectedUsers.length > 0 && (
            <Card style={styles.selectedUsersCard}>
              <Card.Content>
                <Title style={styles.sectionTitle}>Selecionados ({selectedUsers.length})</Title>
                <View style={styles.selectedChipsContainer}>
                  {selectedUsers.map((user) => (
                    <Chip
                      key={user.id}
                      style={styles.selectedChip}
                      onClose={() => toggleUserSelection(user)}
                      avatar={
                        <Avatar.Text 
                          size={24} 
                          label={user.nome.substring(0, 2).toUpperCase()} 
                        />
                      }
                    >
                      {user.nome}
                    </Chip>
                  ))}
                </View>
              </Card.Content>
            </Card>
          )}
        </ScrollView>

        {/* Barra de ações fixa no final da tela */}
        <Surface style={styles.actionBar}>
          <Button 
            mode="outlined" 
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            Cancelar
          </Button>
          <Button 
            mode="contained" 
            onPress={enviarConvites}
            disabled={!selectedGroup || selectedUsers.length === 0}
            style={styles.inviteButton}
          >
            Enviar Convites
          </Button>
        </Surface>
      </KeyboardAvoidingView>
      
      {/* Modal de seleção de grupo */}
      {renderGroupSelectionModal()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Espaço para a barra de ações
  },
  groupSelectionCard: {
    margin: 8,
    elevation: 2,
    backgroundColor: '#fff',
  },
  selectedGroupContainer: {
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  selectedGroupInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedGroupDetails: {
    marginLeft: 12,
    flex: 1,
  },
  selectedGroupName: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedGroupDescription: {
    fontSize: 14,
    color: '#757575',
  },
  changeGroupButton: {
    marginLeft: 8,
  },
  selectGroupButton: {
    marginTop: 8,
  },
  inviteCard: {
    margin: 8,
    marginTop: 0,
    elevation: 2,
    backgroundColor: '#fff',
  },
  selectedUsersCard: {
    margin: 8,
    marginTop: 0,
    elevation: 2,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  toggleChip: {
    marginRight: 8,
  },
  searchInput: {
    marginBottom: 8,
  },
  resultsContainer: {
    marginTop: 16,
  },
  resultCount: {
    marginBottom: 8,
    color: '#757575',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
  },
  selectedUserItem: {
    backgroundColor: 'rgba(98, 0, 238, 0.05)',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDetails: {
    marginLeft: 16,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
  userUsername: {
    color: '#757575',
  },
  noResults: {
    padding: 24,
    alignItems: 'center',
  },
  selectedChipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedChip: {
    margin: 4,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 4,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  cancelButton: {
    flex: 1,
    marginRight: 8,
  },
  inviteButton: {
    flex: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  groupListContainer: {
    maxHeight: 300,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  groupItemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  groupItemTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  groupItemSubtitle: {
    fontSize: 14,
    color: '#757575',
  },
  modalCancelButton: {
    marginTop: 20,
  },
});

export default ConviteScreen;