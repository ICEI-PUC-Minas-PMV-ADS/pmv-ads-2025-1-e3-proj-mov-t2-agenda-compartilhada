import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';
import { API_IP } from '@env';
import EventoModal from '../components/EventoModal'; // Importação do modal

const CalendarScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventos, setEventos] = useState({});
  const [loading, setLoading] = useState(true);
  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  // Busca eventos do backend
  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await fetch(`${API_IP}/eventos`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

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
    fetchEventos();
  }, []);

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

  // Função para lidar com o clique no evento
  const handleEventPress = (eventoClicado) => {
    setEventoSelecionado(eventoClicado);
    setModalVisivel(true);
  };

  // Função para deletar evento
  const handleDeleteEvento = async (eventoId) => {
    try {
      await fetch(`${API_IP}/eventos/${eventoId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
      // Remove o evento do estado local
      setEventos(prevEventos => {
        const novaLista = { ...prevEventos };
        Object.keys(novaLista).forEach(date => {
          novaLista[date] = novaLista[date].filter(ev => (ev._id || ev.id) !== eventoId);
          // Remove a data se não houver mais eventos
          if (novaLista[date].length === 0) delete novaLista[date];
        });
        return novaLista;
      });
      setModalVisivel(false);
      setEventoSelecionado(null);
    } catch (error) {
      console.error('Erro ao deletar evento:', error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.titulo}>Calendário</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#8e44ad" />
        ) : (
          <Calendar
            onDayPress={day => setSelectedDate(day.dateString)}
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
              <FlatList
                data={eventosDoDia}
                keyExtractor={item => item._id || item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleEventPress(item)}>
                    <View style={styles.card}>
                      <Text style={styles.cardTitulo}>{item.titulo}</Text>
                      <Text style={styles.cardHorario}>
                        {item.horario || item.dataEvento?.slice(11, 16)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}

        <TouchableOpacity style={styles.botaoAdd}
          onPress={() => navigation.navigate('CreateEventScreen')}>
          <AntDesign name="plus" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Renderize o modal FORA do container principal */}
      {eventoSelecionado && (
        <EventoModal
          titulo={eventoSelecionado.titulo}
          descricao={eventoSelecionado.descricao}
          dataEvento={eventoSelecionado.dataEvento}
          dataFimEvento={eventoSelecionado.dataFimEvento}
          tipo={eventoSelecionado.tipo}
          visibilidade={modalVisivel}
          onClose={() => {
            setModalVisivel(false);
            setEventoSelecionado(null);
          }}
          onDelete={() => handleDeleteEvento(eventoSelecionado._id || eventoSelecionado.id)}
        />
      )}
    </>
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
    color: '#333', // Adicionando cor para melhor contraste
  },
  subtitulo: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: '600',
    color: '#444', // Adicionando cor
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
    color: '#333', // Adicionando cor
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
    backgroundColor: '#f2f2f2', // Levemente diferente do fundo principal
    borderRadius: 8,
    padding: 12,
    flex: 1, // Para permitir scroll se a lista for grande
  },
});

export default CalendarScreen;