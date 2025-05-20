import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(null);

  const eventos = {
    '2025-04-02': [
      { id: '1', titulo: 'Reunião de Equipe', horario: '12:00 - 13:00' },
      { id: '2', titulo: 'Happy Hour', horario: '19:00 - 21:00' },
    ],
    // adicione mais datas/eventos se quiser
  };

  const eventosDoDia = selectedDate ? eventos[selectedDate] || [] : [];

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calendário</Text>

      <Calendar
        onDayPress={day => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: '#8e44ad',
          },
        }}
        theme={{
          todayTextColor: '#8e44ad',
          selectedDayBackgroundColor: '#8e44ad',
          arrowColor: '#8e44ad',
          monthTextColor: '#333',
        }}
      />

      <Text style={styles.subtitulo}>
        Eventos de hoje ({selectedDate || '---'})
      </Text>

      <FlatList
        data={eventosDoDia}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>{item.titulo}</Text>
            <Text style={styles.cardHorario}>{item.horario}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.botaoAdd}>
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.footer}>
        <MaterialIcons name="home" size={28} color="#8e44ad" />
        <FontAwesome name="calendar" size={28} color="#8e44ad" />
        <MaterialIcons name="notifications" size={28} color="#8e44ad" />
        <FontAwesome name="user" size={28} color="#8e44ad" />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitulo: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardHorario: {
    fontSize: 14,
    color: '#555',
  },
  botaoAdd: {
    backgroundColor: '#8e44ad',
    position: 'absolute',
    bottom: 70,
    right: 20,
    padding: 14,
    borderRadius: 50,
    elevation: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 14,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
});
