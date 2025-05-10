import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import CalendarDay from '../components/CalendarDay';
import EventItem from '../components/EventItem';
import NavBar from '../components/NavBar';

// Dados de exemplo
const daysOfWeek = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const currentMonth = 'Abril 2025';

// Eventos de exemplo
const events = [
  {
    id: 1,
    title: 'Reunião de Equipe',
    time: '14:00 - 16:00',
    color: '#8A2BE2',
  },
  {
    id: 2,
    title: 'Happy Hour',
    time: '18:00 - 20:00',
    color: '#8A2BE2',
  }
];

// Gera dias do mês (exemplo para Abril 2025)
const generateDays = () => {
  const days = [];
  // Abril 2025 começa em uma terça (índice 2)
  for (let i = 0; i < 2; i++) {
    days.push({ day: '', empty: true });
  }
  
  // 30 dias para Abril
  for (let i = 1; i <= 30; i++) {
    let special = null;
    // Destacar dias com eventos (conforme mostrado no design)
    if (i === 9) special = { color: '#8A2BE2' };      // Dia com evento (roxo)
    if (i === 14) special = { color: '#2ABB7F' };     // Dia com evento (verde)
    if (i === 24) special = { color: '#2ABB7F' };     // Dia com evento (verde)
    days.push({ day: i, special });
  }
  
  return days;
};

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(2); // O dia 2 está selecionado por padrão
  const days = generateDays();

  return (
    <View style={styles.container}>
      {/* Cabeçalho do Calendário */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calendário</Text>
        <Text style={styles.monthTitle}>{currentMonth}</Text>
      </View>

      {/* Grid do Calendário */}
      <View style={styles.calendarContainer}>
        {/* Dias da semana */}
        <View style={styles.weekDaysRow}>
          {daysOfWeek.map((day, index) => (
            <View key={index} style={styles.weekDayCell}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>

        {/* Dias do mês */}
        <View style={styles.daysGrid}>
          {days.map((item, index) => (
            <CalendarDay 
              key={index}
              day={item.day}
              empty={item.empty}
              special={item.special}
              isSelected={item.day === selectedDate}
              onPress={() => item.day && setSelectedDate(item.day)}
            />
          ))}
        </View>
      </View>

      {/* Lista de eventos */}
      <View style={styles.eventsSection}>
        <Text style={styles.eventsTitle}>Eventos de hoje (2 Abr)</Text>
        <ScrollView style={styles.eventsList}>
          {events.map(event => (
            <EventItem 
              key={event.id}
              title={event.title}
              time={event.time}
              color={event.color}
            />
          ))}
        </ScrollView>
      </View>

      {/* Botão de adicionar */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateEvent')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Barra de navegação inferior */}
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  calendarContainer: {
    paddingHorizontal: 20,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  weekDayCell: {
    width: 30,
    alignItems: 'center',
  },
  weekDayText: {
    fontSize: 14,
    color: '#666',
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  eventsSection: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  eventsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  eventsList: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 90,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    fontSize: 28,
    color: '#FFFFFF',
  },
});

export default CalendarScreen;