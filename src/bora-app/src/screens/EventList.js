import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { API_IP } from '@env';

export default function EventList() {
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar eventos do backend
  const fetchEventos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_IP}/eventos`);
      
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Processa os dados para o formato esperado pelo componente
      const eventosProcessados = data.map(evento => ({
        key: evento.$oid,
        id: evento._id.$oid,
        data: formatarData(evento.dataEvento),
        titulo: evento.titulo,
        subtitulo: evento.descricao || (evento.tipo === 'grupo' ? 'Evento em grupo' : 'Evento individual'),
        cor: gerarCorPorTipo(evento.tipo, evento.grupoId),
        tipo: evento.tipo,
        grupoId: evento.grupoId || null
      }));
      
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

  // Hook para carregar dados quando o componente monta
  useEffect(() => {
    fetchEventos();
  }, []);

  // Função para recarregar dados
  const handleRefresh = () => {
    fetchEventos();
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
    backgroundColor: '#e8e8e8',
    alignItems: 'center',
    paddingTop: 40,
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
    fontSize: 18,
    color: '#888',
  },
  refreshButton: {
    backgroundColor: '#6a3de8',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    height: '75%',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 15,
    alignItems: 'center',
  },
  cardHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
  },
  colorIndicator: {
    width: 4,
    height: 40,
    borderRadius: 4,
    marginRight: 15,
  },
  eventoInfo: {
    flex: 1,
  },
  eventoData: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  eventoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  eventoSubtitulo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  eventoTipo: {
    fontSize: 12,
    color: '#888',
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
    backgroundColor: '#6a3de8',
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
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
});