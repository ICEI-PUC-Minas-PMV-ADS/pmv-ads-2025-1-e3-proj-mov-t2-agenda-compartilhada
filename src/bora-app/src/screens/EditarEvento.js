import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Platform,
  Alert,
  StyleSheet
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { API_IP } from '@env';
import { Ionicons } from '@expo/vector-icons';

function EditarEvento() {
  const route = useRoute();
  const navigation = useNavigation();
  const [token, setToken] = useState(null);

  // Log completo dos parâmetros recebidos
  console.log("route.params:", route.params);
  const id = route.params?.id;
  console.log("ID do evento recebido:", id);

  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    dataEvento: '',
    horaEvento: '',
    duration: '',
  });

  const [loading, setLoading] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date');

  useEffect(() => {
    const loadData = async () => {
      if (!id) {
        Alert.alert("Erro", "ID do evento não foi fornecido.");
        navigation.goBack();
        return;
      }

      const tokenStorage = await AsyncStorage.getItem('access_token');
      setToken(tokenStorage);

      try {
        const response = await axios.get(`${API_IP}/eventos/${id}`, {
          headers: { Authorization: `Bearer ${tokenStorage}` }
        });

        const event = response.data;

        const data = new Date(event.dataEvento);
        const fim = new Date(event.dataFimEvento);

        setForm({
          titulo: event.titulo,
          descricao: event.descricao,
          dataEvento: `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()}`,
          horaEvento: `${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}`,
          duration: ((fim - data) / 60000).toString(),
        });
      } catch (error) {
        console.error('Erro ao buscar evento:', error.response?.data || error.message);
        Alert.alert("Erro", "Não foi possível carregar o evento.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

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
      setForm({ ...form, dataEvento: `${day}/${month}/${year}` });
    } else {
      const hour = String(dt.getHours()).padStart(2, '0');
      const minute = String(dt.getMinutes()).padStart(2, '0');
      setForm({ ...form, horaEvento: `${hour}:${minute}` });
    }
  };

  const handleSubmit = async () => {
    const [day, month, year] = form.dataEvento.split('/');
    const [hour, minute] = form.horaEvento.split(':');
    const dataInicial = new Date(year, month - 1, day, hour, minute);
    const dataFinal = new Date(dataInicial.getTime() + parseInt(form.duration) * 60000);

    const payload = {
      titulo: form.titulo,
      descricao: form.descricao,
      dataEvento: dataInicial.toISOString(),
      dataFimEvento: dataFinal.toISOString()
    };

    try {
      await axios.put(`${API_IP}/eventos/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      Alert.alert("Sucesso!", "Evento atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Falha ao atualizar evento.");
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#7839EE" />
        <Text>Carregando evento...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Editar Evento</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.form} keyboardShouldPersistTaps="handled">
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título</Text>
          <TextInput style={styles.input} value={form.titulo} onChangeText={text => setForm({ ...form, titulo: text })} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={form.descricao}
            onChangeText={text => setForm({ ...form, descricao: text })}
            multiline
          />
        </View>

        <View style={styles.inputRow}>
          <View style={[styles.inputGroup, styles.inputHalf]}>
            <Text style={styles.label}>Data</Text>
            <TouchableOpacity style={styles.input} onPress={() => showMode('date')}>
              <Text style={form.dataEvento ? styles.inputText : styles.placeholderText}>{form.dataEvento || 'DD/MM/AAAA'}</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.inputGroup, styles.inputHalf, { marginLeft: 10 }]}>
            <Text style={styles.label}>Hora</Text>
            <TouchableOpacity style={styles.input} onPress={() => showMode('time')}>
              <Text style={form.horaEvento ? styles.inputText : styles.placeholderText}>{form.horaEvento || 'HH:MM'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duração (minutos)</Text>
          <TextInput
            style={styles.input}
            value={form.duration}
            keyboardType="numeric"
            onChangeText={text => setForm({ ...form, duration: text })}
          />
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

      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 15,
    backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#E0E0E0',
  },
  backButton: { padding: 5 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  form: { flex: 1, paddingHorizontal: 20, paddingTop: 10 },
  inputGroup: { marginBottom: 18 },
  inputRow: { flexDirection: 'row', justifyContent: 'space-between' },
  inputHalf: { flex: 1 },
  label: { fontSize: 14, color: '#4F4F4F', marginBottom: 8 },
  input: {
    backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#DEDEDE',
    borderRadius: 8, paddingHorizontal: 15, paddingVertical: 12,
    fontSize: 16, color: '#333', minHeight: 48, justifyContent: 'center',
  },
  inputText: { fontSize: 16, color: '#333' },
  placeholderText: { fontSize: 16, color: '#A0A0A0' },
  textArea: { minHeight: 100, textAlignVertical: 'top' },
  nextButton: {
    backgroundColor: '#7839EE', paddingVertical: 16, marginHorizontal: 20,
    marginBottom: Platform.OS === 'ios' ? 30 : 20, borderRadius: 8,
    alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 4, elevation: 3,
  },
  nextButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
});

export default EditarEvento;
