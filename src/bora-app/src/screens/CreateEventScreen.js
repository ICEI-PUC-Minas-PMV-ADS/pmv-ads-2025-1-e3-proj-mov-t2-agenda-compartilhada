import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,  Platform} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Nota: Você precisará instalar expo/vector-icons

const CreateEventScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('02/04/2025');
  const [duration, setDuration] = useState('');
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text>←</Text>
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
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            value={date}
            onChangeText={setDate}
            keyboardType="numeric"
          />
        </View>

        {/* Duração */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Duração</Text>
          <TextInput
            style={styles.input}
            placeholder="2h"
            value={duration}
            onChangeText={setDuration}
          />
        </View>

        {/* Seleção de Grupo */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Criar evento no Grupo:</Text>
          <TouchableOpacity style={styles.groupSelector}>
            <Text style={styles.groupSelectorText}>
              {selectedGroup || 'Selecione um grupo'}
            </Text>
            <Ionicons name="chevron-down" size={24} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Botão Próximo */}
      <TouchableOpacity 
        style={styles.nextButton}
        onPress={() => navigation.navigate('EventTime', { title })}
      >
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
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  groupSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    padding: 10,
  },
  groupSelectorText: {
    fontSize: 16,
    color: '#666',
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