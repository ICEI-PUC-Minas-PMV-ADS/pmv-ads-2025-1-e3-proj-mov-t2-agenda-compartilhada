import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { API_IP } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EventoModal from '../components/EventoModal'; // Importação do modal

const EventList = ({ navigation }) => {
  useEffect(() => {
    const carregarDados = async () => {
      try {
        const userString = await AsyncStorage.getItem('usuario');
        console.log('AsyncStorage:', userString);

        if (!userString) {
          throw new Error('Usuário não encontrado no AsyncStorage');
        }

        const parsedUser = JSON.parse(userString);
        console.log('Usuário carregado:', parsedUser);

        if (!parsedUser._id) {
          throw new Error('Usuário inválido (sem _id)');
        }

        setUser(parsedUser); // atualiza estado (para renderização)
        await fetchEventos(parsedUser._id); // ✅ CHAMA AQUI DIRETO

      } catch (error) {
        setLoading(false);
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar usuário ou eventos');
      }
    };
    
    carregarDados();
  }, []);

  const[user, setUser] = useState(null)
  const[eventos, setEventos] = useState([]);
  const[loading, setLoading] = useState(true);
  const[error, setError] = useState(null);
  const[modalVisivel, setModalVisivel] = useState(false);

  // Função para buscar eventos do backend
  const fetchEventos = async (userId) => {
    try {
      const responseEventosIndividuais = await fetch(`${API_IP}/eventos/donoId/${userId}`);
      const responseEventosGrupos = await fetch(`${API_IP}/eventos/grupo/usuario/${userId}`);

      if (!responseEventosIndividuais.ok) {
        throw new Error(`Erro na requisição: ${responseEventosIndividuais.status}`);
      }

      const dataIndividuais = await responseEventosIndividuais.json();
      const dataGrupos = await responseEventosGrupos.json();
      
      const eventosIndividuaisProcessados = dataIndividuais.map(evento => ({
        key: evento._id,
        id: evento._id,
        donoId: evento.donoId,
        data: formatarData(evento.dataEvento),
        titulo: evento.titulo,
        subtitulo: evento.descricao || (evento.tipo === 'grupo' ? 'Evento em grupo' : 'Evento individual'),
        cor: gerarCorPorTipo(evento.tipo, evento.grupoId),
        tipo: evento.tipo,
        grupoId: evento.grupoId || null
      }));

      const eventosGruposProcessados = dataGrupos.map(evento => ({
        key: evento._id,
        id: evento._id,
        grupoId: evento.donoId,
        data: formatarData(evento.dataEvento),
        titulo: evento.titulo,
        subtitulo: evento.descricao || (evento.tipo === 'grupo' ? 'Evento em grupo' : 'Evento individual'),
        cor: gerarCorPorTipo(evento.tipo, evento.grupoId),
        tipo: evento.tipo,
        grupoId: evento.grupoId || null
      }));

      const eventosProcessados = [
        ...eventosIndividuaisProcessados,
        ...eventosGruposProcessados
      ]

      setEventos(eventosProcessados);
      setError(null);
    } catch (err) {
      console.error('Erro ao buscar eventos:', err);
      setError('Não foi possível carregar os eventos');
      Alert.alert('Erro', 'Não foi possível carregar os eventos. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  // Função para recarregar dados
  const handleRefresh = () => {
    fetchEventos();
  };

  // Função para formatar a data
  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    const agora = new Date();
    const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
    const amanha = new Date(hoje.getTime() + 24 * 60 * 60 * 1000);
    const dataEvento = new Date(data.getFullYear(), data.getMonth(), data.getDate());
    
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const horario = `${horas}:${minutos}`;
    
    if (dataEvento.getTime() === hoje.getTime()) {
      return `Hoje, ${horario}`;
    } else if (dataEvento.getTime() === amanha.getTime()) {
      return `Amanhã, ${horario}`;
    } else {
      const dia = data.getDate().toString().padStart(2, '0');
      const mes = (data.getMonth() + 1).toString().padStart(2, '0');
      const ano = data.getFullYear();
      const diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
      const diaSemana = diasSemana[data.getDay()];
      
      return `${dia}/${mes}/${ano} - ${horario} - ${diaSemana}`;
    }
  };

  // Função para gerar cor baseada no tipo e grupo
  const gerarCorPorTipo = (tipo, grupoId) => {
    if (tipo === 'individual') {
      return '#e8433d'; // Vermelho para eventos individuais
    }
    
    // Cores para diferentes grupos
    const coresGrupos = {
      'equipe-dev': '#6a3de8',      // Roxo
      'empresa-tech': '#3de86a',    // Verde
      'amigos-faculdade': '#e8d43d', // Amarelo
      'familia': '#3de8e8',         // Ciano
      'default': '#888888'          // Cinza padrão
    };
    
    return coresGrupos[grupoId] || coresGrupos.default;
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#6a3de8" />
        <Text style={styles.loadingText}>Carregando eventos...</Text>
      </SafeAreaView>
    );
  }

  if (error && eventos.length === 0) {
    return (
      <SafeAreaView style={[styles.container, styles.centerContent]}>
        <StatusBar style="dark" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
          <Text style={styles.retryButtonText}>Tentar novamente</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
    
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Título fora do card */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Lista de Eventos</Text>
        <TouchableOpacity onPress={handleRefresh} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>↻</Text>
        </TouchableOpacity>
      </View>
      
      {/* Card principal */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Lista de Eventos</Text>
          {eventos.length > 0 && (
            <Text style={styles.eventCount}>{eventos.length} evento(s)</Text>
          )}
        </View>
        
        {eventos.length > 0 ? (
          <ScrollView style={styles.scrollContainer}>
            {eventos.map((evento) => (
              <View key={evento.id} style={styles.eventoContainer}>
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
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum evento encontrado</Text>
            <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
              <Text style={styles.refreshButtonText}>Recarregar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  centerContent: {
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  refreshButton: {
    backgroundColor: '#7839EE',
    borderRadius: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    width: '90%',
    height: '75%',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 15,
    alignItems: 'center',
  },
  cardHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  eventCount: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  scrollContainer: {
    flex: 1,
  },
  eventoContainer: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  colorIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 15,
  },
  eventoInfo: {
    flex: 1,
  },
  eventoData: {
    fontSize: 14,
    color: '#9A9A9D',
    marginBottom: 2,
  },
  eventoTitulo: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  eventoSubtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  eventoTipo: {
    fontSize: 14,
    color: '#7839EE',
  },
  eventoArrow: {
    paddingHorizontal: 10,
  },
  arrowText: {
    fontSize: 20,
    color: '#ccc',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
  errorText: {
    fontSize: 16,
    color: '#e8433d',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#7839EE',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default EventList;