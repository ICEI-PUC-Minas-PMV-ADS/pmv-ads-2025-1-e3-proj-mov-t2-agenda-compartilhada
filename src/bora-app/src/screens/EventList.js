import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const eventos = [
    {
      id: 1,
      data: 'Hoje, 19:00',
      titulo: 'Happy Hour',
      subtitulo: 'Amigos do Trabalho',
      cor: '#6a3de8'
    },
    {
      id: 2,
      data: 'Amanhã, 20:30',
      titulo: 'Jantar em família',
      subtitulo: 'Família',
      cor: '#3de86a'
    },
    {
      id: 3,
      data: '25/04/2025 - Sábado',
      titulo: 'Aniversário do Lucas',
      subtitulo: 'Amigos da Faculdade',
      cor: '#e8d43d'
    },
    {
      id: 4,
      data: '25/04/2025 - 19:00 - Domingo',
      titulo: 'Aniversário da Ana',
      subtitulo: 'Amigos da Faculdade',
      cor: '#e8d43d'
    },
    {
      id: 5,
      data: '07/04/2025 - 19:00 - Segunda-feira',
      titulo: 'Aniversário da Ana',
      subtitulo: 'Agenda pessoal',
      cor: '#e8433d'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Título fora do card */}
      <Text style={styles.headerText}>Lista de Eventos</Text>
      
      {/* Card principal */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardHeaderText}>Lista de Eventos</Text>
        </View>
        
        <ScrollView style={styles.scrollContainer}>
          {eventos.map((evento) => (
            <View key={evento.id} style={styles.eventoContainer}>
              <View style={[styles.colorIndicator, { backgroundColor: evento.cor }]} />
              <View style={styles.eventoInfo}>
                <Text style={styles.eventoData}>{evento.data}</Text>
                <Text style={styles.eventoTitulo}>{evento.titulo}</Text>
                <Text style={styles.eventoSubtitulo}>{evento.subtitulo}</Text>
              </View>
              <TouchableOpacity style={styles.eventoArrow}>
                <Text style={styles.arrowText}>›</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
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
  headerText: {
    fontSize: 18,
    color: '#888',
    marginBottom: 15,
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
  },
  eventoArrow: {
    paddingHorizontal: 10,
  },
  arrowText: {
    fontSize: 20,
    color: '#ccc',
  },
  navBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '90%',
    height: 60,
    borderRadius: 20,
    marginTop: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
  },
  navIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});