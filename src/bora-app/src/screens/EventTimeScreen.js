import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import NavBar from '../components/NavBar';
import TimeSlot from '../components/TimeSlot';

const EventTimeScreen = ({ route, navigation }) => {
  const { title = 'Happy Hour com Amigos' } = route.params || {};
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);

  const timeSlots = [
    { id: 1, startTime: '18:00', endTime: '20:00' },
    { id: 2, startTime: '19:00', endTime: '21:00' },
    { id: 3, startTime: '20:00', endTime: '22:00' }
  ];

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
        <Text style={styles.headerTitle}>Escolha os horários</Text>
      </View>

      {/* Conteúdo do Evento */}
      <View style={styles.eventDetails}>
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventDate}>02/04/2025</Text>
      </View>

      {/* Seleção de Horários */}
      <View style={styles.timeSelectionContainer}>
        <Text style={styles.timeSelectionTitle}>Escolha os horários disponíveis</Text>
        
        <ScrollView style={styles.timeSlotsList}>
          {timeSlots.map(slot => (
            <TimeSlot
              key={slot.id}
              startTime={slot.startTime}
              endTime={slot.endTime}
              selected={selectedTimeSlot === slot.id}
              onPress={() => setSelectedTimeSlot(slot.id)}
            />
          ))}
        </ScrollView>

        {/* Botão para adicionar mais horários */}
        <TouchableOpacity style={styles.addTimeButton}>
          <Text style={styles.addTimeButtonText}>+ Adicionar horário</Text>
        </TouchableOpacity>
      </View>

      {/* Botão Finalizar */}
      <TouchableOpacity 
        style={styles.finishButton}
        onPress={() => navigation.navigate('Calendar')}
      >
        <Text style={styles.finishButtonText}>Finalizar</Text>
      </TouchableOpacity>

      {/* Barra de navegação inferior */}
      <NavBar navigation={navigation} />
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
  eventDetails: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 5,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  timeSelectionContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  timeSelectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  timeSlotsList: {
    flex: 1,
  },
  addTimeButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  addTimeButtonText: {
    color: '#8A2BE2',
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: '#8A2BE2',
    paddingVertical: 15,
    marginHorizontal: 20,
    marginBottom: 80,
    borderRadius: 5,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EventTimeScreen;