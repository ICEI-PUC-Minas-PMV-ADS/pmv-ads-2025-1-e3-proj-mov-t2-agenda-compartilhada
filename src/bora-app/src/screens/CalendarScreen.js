import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';
import { API_IP } from '@env';

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventos, setEventos] = useState({});
  const [loading, setLoading] = useState(true);

  // Busca eventos do backend
  useEffect(() => {
    fetchEventos();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await fetch(`${API_IP}/eventos`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response)

      const data = await response.json();

      // Organiza eventos por data no formato YYYY-MM-DD
      const eventosPorData = {};
      data.forEach(ev => {
        // Ajuste conforme o nome do campo de data no seu backend
        const dataEvento = ev.dataEvento?.slice(0, 10); // 'YYYY-MM-DD'
        if (dataEvento) {
          if (!eventosPorData[dataEvento]) eventosPorData[dataEvento] = [];
          eventosPorData[dataEvento].push(ev);
        }
      });
      setEventos(eventosPorData);
    } catch (error) {
      console.error('Erro ao buscar eventos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Marca os dias com eventos em verde, o selecionado em roxo
  const markedDates = {};
  Object.keys(eventos).forEach(date => {
    markedDates[date] = {
      marked: true,
      dotColor: '#27ae60', // verde
      selected: selectedDate === date,
      selectedColor: selectedDate === date ? '#8e44ad' : undefined,
    };
  });
  if (selectedDate && !markedDates[selectedDate]) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: '#8e44ad',
    };
  }

  const eventosDoDia = selectedDate ? eventos[selectedDate] || [] : [];
  console.log(eventosDoDia)

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calendário</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#8e44ad" />
      ) : (
        <Calendar
          onDayPress={day => { 
            fetchEventos()
            setSelectedDate(day.dateString)
          }}
          markedDates={markedDates}
          theme={{
            todayTextColor: '#8e44ad',
            selectedDayBackgroundColor: '#8e44ad',
            arrowColor: '#8e44ad',
            monthTextColor: '#333',
          }}
        />
      )}

      {selectedDate && (
        <View style={styles.eventosContainer}>
          <Text style={styles.subtitulo}>
            Eventos de {selectedDate}
          </Text>
          {eventosDoDia.length === 0 ? (
            <Text style={{ color: '#888', marginTop: 8 }}>Nenhum evento.</Text>
          ) : (
            <ScrollView style={styles.scrollContainer}>
              {eventosDoDia .map((evento) => (
                <View key={evento._id} style={styles.eventoContainer}>
                  <View style={[styles.colorIndicator, { backgroundColor: evento.cor }]} />
                  <View style={styles.eventoInfo}>
                    <Text style={styles.eventoData}>{evento.data}</Text>
                    <Text style={styles.eventoTitulo}>{evento.titulo}</Text>
                    <Text style={styles.eventoSubtitulo}>{evento.subtitulo}</Text>
                    <Text style={styles.eventoTipo}>
                      {evento.tipo === 'grupo' ? '👥 Grupo' : '👤 Individual'}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.eventoArrow}>
                    <Text style={styles.arrowText}>›</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}

      <TouchableOpacity style={styles.botaoAdd}
        onPress={() => navigation.navigate('eventStack', { screen: 'createEventScreen' })}>
        <AntDesign name="plus" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

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
  eventosContainer: {
    marginTop: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    padding: 12,
  },
  scrollContainer: {
    // flex: 1,
    maxHeight: 340
  },
  eventoContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  colorIndicator: {
    width: 6,
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#8e44ad',
    marginRight: 12,
  },
  eventoInfo: {
    flex: 1,
  },
  eventoData: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 4,
  },
  eventoTitulo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  eventoSubtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  eventoTipo: {
    fontSize: 13,
    color: '#8e44ad',
    fontWeight: '500',
  },
  eventoArrow: {
    paddingHorizontal: 8,
  },
  arrowText: {
    fontSize: 22,
    color: '#ccc',
  },
});

export default CalendarScreen;