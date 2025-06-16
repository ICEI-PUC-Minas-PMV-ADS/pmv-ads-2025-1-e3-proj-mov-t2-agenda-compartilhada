import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { API_IP } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CreateEventScreen = ({ navigation, route }) => {
  const groupId = route.params?.groupId ?? null; // <--- Utilizado para receber o Id de um grupo que solicita a criação de evento
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [token, setToken] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateText, setDateText] = useState('');
  const [timeText, setTimeText] = useState('');
  const [duration, setDuration] = useState('');

  const [selectedGroupId, setSelectedGroupId] = useState(''); // <<<<<<< ALTERADO para string vazia
  const [userGroups, setUserGroups] = useState([]);
  const [loadingGroups, setLoadingGroups] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');

  useEffect(() => {
    const loadInitialData = async () => {
      setLoadingUser(true);
      try {
        const userString = await AsyncStorage.getItem('usuario');
        const storedToken = await AsyncStorage.getItem('access_token');

        if (userString && storedToken) {
          const loadedUser = JSON.parse(userString);
          setUser(loadedUser);
          setToken(storedToken);
        } else {
          Alert.alert("Autenticação Necessária", "Por favor, faça login novamente.");
          navigation.replace('loginScreen');
        }
      } catch (error) {
        console.error('Erro ao carregar dados iniciais: ', error);
        Alert.alert("Erro", "Não foi possível carregar dados do usuário.");
      } finally {
        setLoadingUser(false);
      }
    };
    loadInitialData();
  }, []);

  useEffect(() => {
    if (user && user.email && token) {
      const fetchUserGroups = async () => {
        setLoadingGroups(true);
        try {
          const response = await axios.get(`${API_IP}/grupos/usuario/${user.email}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data && Array.isArray(response.data)) {
            const verificaAdmin = response.data.filter(grupo =>
              grupo.grupoAdmins.includes(user._id)
            )
            setUserGroups(verificaAdmin);
            console.log(groupId)
          } else {
            setUserGroups([]);
          }
        } catch (error) {
          console.error('Erro ao buscar grupos do usuário:', error.response?.data || error.message);
          setUserGroups([]);
        } finally {
          setLoadingGroups(false);
        }
      };
      fetchUserGroups();
    }
  }, [user, token]);

  // useEffect para selecionar o valor inicial no Picker caso seja passado algum grupoId como parâmetro
  useEffect(() => {
    const initialValue = (groupId === null || groupId === undefined)
      ? ""
      : String(groupId);
    setSelectedGroupId(initialValue);
  }, [groupId])

  const showMode = mode => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  const onChange = (event, selected) => {
    setShowPicker(Platform.OS === 'ios');
    if (!selected) return;
    const dt = new Date(selected);
    if (pickerMode === 'date') {
      const day = String(dt.getDate()).padStart(2, '0');
      const month = String(dt.getMonth() + 1).padStart(2, '0');
      const year = dt.getFullYear();
      setDateText(`${day}/${month}/${year}`);
    } else {
      const hour = String(dt.getHours()).padStart(2, '0');
      const minute = String(dt.getMinutes()).padStart(2, '0');
      setTimeText(`${hour}:${minute}`);
    }
  };

  const criaEvento = async (payload) => {
    if (!user || !user._id || !token) {
      Alert.alert('Erro', 'Autenticação ou informações do usuário ausentes.');
      return;
    }
    // const finalPayload = { ...payload, donoId: user._id };

    try {
      const response = await axios.post(`${API_IP}/eventos`, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      });
      Alert.alert('Sucesso!', 'Evento cadastrado com sucesso!');
      navigation.navigate('CalendarScreen');
    } catch (error) {
      console.error('Erro no cadastro de Evento:', error.response?.data || error.message);
      Alert.alert('Erro ao Cadastrar Evento', error.response?.data?.message || 'Verifique os dados ou sua conexão.');
    }
  };

  const handleNext = async () => {
    if (!title.trim() || !dateText || !timeText) {
      Alert.alert('Campos Obrigatórios', 'Por favor, preencha título, data e hora.');
      return;
    }
    if (loadingUser || !user) {
      Alert.alert('Aguarde', 'Carregando informações do usuário...');
      return;
    }

    const [day, month, year] = dateText.split('/');
    const [hour, minute] = timeText.split(':');
    const localDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute));
    const isoDateString = localDate.toISOString();

    let dataFimEventoISO = isoDateString;
    if (duration && !isNaN(parseInt(duration)) && parseInt(duration) > 0) {
      const durationMs = parseInt(duration) * 60000;
      const dataFim = new Date(localDate.getTime() + durationMs);
      dataFimEventoISO = dataFim.toISOString();
    }

    const payload = {
      titulo: title,
      descricao: description,
      dataEvento: isoDateString,
      dataFimEvento: dataFimEventoISO,
      tipo: selectedGroupId && selectedGroupId !== "" ? 'grupo' : 'individual', // <<<< ALTERADO para verificar string vazia 
      donoId: selectedGroupId && selectedGroupId !== "" ? selectedGroupId : user._id
    };

    await criaEvento(payload);
  };

  if (loadingUser) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#7839EE" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Evento</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.form} keyboardShouldPersistTaps="handled">
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título*</Text>
          <TextInput style={styles.input} placeholder="Ex: Reunião de Projeto" value={title} onChangeText={setTitle} />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput style={[styles.input, styles.textArea]} placeholder="Detalhes sobre o evento..." value={description} onChangeText={setDescription} multiline />
        </View>
        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, styles.inputHalf]}>
            <Text style={styles.label}>Data*</Text>
            <TouchableOpacity style={styles.input} onPress={() => showMode('date')}>
              <Text style={dateText ? styles.inputText : styles.placeholderText}>{dateText || 'DD/MM/AAAA'}</Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.inputGroup, styles.inputHalf, { marginLeft: 10 }]}>
            <Text style={styles.label}>Hora*</Text>
            <TouchableOpacity style={styles.input} onPress={() => showMode('time')}>
              <Text style={timeText ? styles.inputText : styles.placeholderText}>{timeText || 'HH:MM'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duração (minutos)</Text>
          <TextInput style={styles.input} placeholder="Ex: 60 para 1 hora" keyboardType="numeric" value={duration} onChangeText={setDuration} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Grupo Associado (Opcional)</Text>
          {loadingGroups ? (
            <ActivityIndicator size="small" color="#7839EE" style={{ marginTop: 10 }} />
          ) : (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedGroupId}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedGroupId(itemValue === null || itemValue === undefined ? "" : String(itemValue));
                }}
                style={styles.picker}
                prompt="Selecione um grupo"
              >
                {/* Item padrão para "Nenhum" */}
                <Picker.Item label={"Nenhum (Evento Individual)"} value="" style={styles.pickerItemBase} />

                {/* Mapeia os grupos do usuário, garantindo dados válidos */}
                {userGroups && userGroups
                  .filter(g => g && g._id !== null && g._id !== undefined && String(g._id).trim() !== "") // Filtra grupos inválidos
                  .map((g, index) => ( // <<< FUNÇÃO MAP PARA GERAR PICKER.ITEM
                    <Picker.Item
                      key={String(g._id)}
                      label={String(g.nome || `Grupo ${index + 1}`)} // Fallback para nome
                      value={String(g._id)}
                      style={styles.pickerItem}
                    />
                  ))
                }

                {/* Item para quando não há grupos (opcional, se o filtro acima já não cobrir) */}
                {!loadingGroups && (!userGroups || userGroups.filter(g => g && g._id !== null && g._id !== undefined && String(g._id).trim() !== "").length === 0) && (
                  <Picker.Item label="Nenhum grupo disponível" value="NO_GROUPS_PLACEHOLDER" enabled={false} style={styles.pickerItemDisabled} />
                )}

              </Picker>
            </View>
          )}
        </View>
      </ScrollView>

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode={pickerMode}
          display={Platform.OS === 'android' ? 'default' : 'spinner'}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext} disabled={loadingUser || loadingGroups}>
        <Text style={styles.nextButtonText}>Criar Evento</Text>
      </TouchableOpacity>
    </View>
  );
};

// Seus estilos (styles) permanecem os mesmos da sugestão anterior.
// Cole-os aqui se precisar da definição completa novamente.
// ... (copie os styles da resposta anterior aqui)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 15, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E0E0E0', },
  backButton: { padding: 5, },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', },
  form: { flex: 1, paddingHorizontal: 20, paddingTop: 10, },
  inputGroup: { marginBottom: 18, },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between', },
  inputHalf: { flex: 1, },
  label: { fontSize: 14, color: '#4F4F4F', marginBottom: 8, },
  input: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DEDEDE', borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12, fontSize: 16, color: '#333', minHeight: 48, justifyContent: 'center', },
  inputText: { fontSize: 16, color: '#333', },
  placeholderText: { fontSize: 16, color: '#A0A0A0', },
  textArea: { minHeight: 100, textAlignVertical: 'top', },
  pickerContainer: { borderWidth: 1, borderColor: '#DEDEDE', borderRadius: 8, backgroundColor: '#FFFFFF', minHeight: 48, justifyContent: 'center', },
  picker: { height: Platform.OS === 'ios' ? undefined : 55, width: '100%', color: '#333', },
  pickerItemBase: { fontSize: 16, },
  pickerItem: { fontSize: 16, color: '#333', },
  pickerItemDisabled: { fontSize: 16, color: '#A0A0A0', },
  nextButton: { backgroundColor: '#7839EE', paddingVertical: 16, marginHorizontal: 20, marginBottom: Platform.OS === 'ios' ? 30 : 20, borderRadius: 8, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, },
  nextButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600', },
});

export default CreateEventScreen;