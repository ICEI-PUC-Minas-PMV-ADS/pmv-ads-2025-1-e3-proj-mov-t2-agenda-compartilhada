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
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { API_IP } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateEventScreen = ({ navigation }) => {

  //Carrega informações do usuário
  const[user, setUser] = useState('')
  useEffect(() => {
    const loadUser = async () => {
      try {
        const userString = await AsyncStorage.getItem('usuario')
        if (userString) {
          const user = JSON.parse(userString)
          setUser(user)
        }
      } catch (error) {
        console.error('Error ao puxar user: ', error)
      } finally {
        setLoadingUser(false)
      }
    }
    loadUser();
  }, [])

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateText, setDateText] = useState('');    // DD/MM/YYYY
  const [timeText, setTimeText] = useState('');    // HH:MM
  const [duration, setDuration] = useState('');

  // Controle do picker
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState('date'); // 'date' ou 'time'

  const showMode = mode => {
    setPickerMode(mode);
    setShowPicker(true);
  };

  const onChange = (event, selected) => {
    setShowPicker(false);
    if (!selected) return;
    const dt = new Date(selected);
    if (pickerMode === 'date') {
      const day   = String(dt.getDate()).padStart(2, '0');
      const month = String(dt.getMonth() + 1).padStart(2, '0');
      const year  = dt.getFullYear();
      setDateText(`${day}/${month}/${year}`);
    } else {
      const hour   = String(dt.getHours()).padStart(2, '0');
      const minute = String(dt.getMinutes()).padStart(2, '0');
      setTimeText(`${hour}:${minute}`);
    }
  };

  const criaEvento = async (payload) => {
    try {
      const response = await fetch(`${API_IP}/eventos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: payload.titulo,
          descricao: payload.descricao,
          dataEvento: payload.dataEvento,
          tipo: payload.tipo,
          donoId: payload.donoId,
          dataFimEvento: payload.dataFimEvento,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Cadastro de Evento realizado com sucesso!');
        navigation.navigate('EventList');
      } else {
        Alert.alert('Erro ao cadastrar Evento', data.message || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro no cadastro de Evento:', error.message || error);
      Alert.alert('Erro de conexão com o servidor', error.message || 'Verifique sua rede');
    }
  }

  const handleNext = async () => {
    // Concatena no formato YYYY/MM/DDTHH:MM:SS
    const TIME_ZONE_BRAZIL = 3;
    const [day, month, year] = dateText.split('/');
    const [hour, minute]     = timeText.split(':');
    const strDate = `${year}/${month}/${day}T${hour-TIME_ZONE_BRAZIL}:${minute}:00`;
    const isoDate = new Date(strDate.replace(/\//g, '-'));

    console.log(isoDate)

    const payload = {
      titulo: title,
      descricao: description,
      dataEvento: isoDate,
      duration: duration,
      tipo: 'individual',
      donoId: user._id
    }

    console.log(payload)

    const response = await criaEvento(payload)
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Evento</Text>
      </View>

      {/* Formulário */}
      <ScrollView style={styles.form}>
        {/* Título */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Título</Text>
          <TextInput
            style={styles.input}
            placeholder="Título do evento"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        {/* Descrição */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva o evento"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Data */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => showMode('date')}
          >
            <Text>{dateText || 'Selecione a data'}</Text>
          </TouchableOpacity>
        </View>

        {/* Hora */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Hora</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => showMode('time')}
          >
            <Text>{timeText || 'Selecione a hora'}</Text>
          </TouchableOpacity>
        </View>

        {/* Duração */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duração (min)</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 60"
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
          />
        </View>
      </ScrollView>

      {/* DateTimePicker modal */}
      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode={pickerMode}
          display={Platform.OS === 'android' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      {/* Botão Próximo */}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Próximo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  backButton: {
    marginRight: 10,
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  form: {
    flex: 1,
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    textAlign: 'right',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    justifyContent: 'center',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  nextButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 80,
    borderRadius: 5,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CreateEventScreen;
