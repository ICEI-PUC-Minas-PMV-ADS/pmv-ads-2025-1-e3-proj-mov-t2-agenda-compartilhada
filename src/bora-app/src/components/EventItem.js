// src/bora-app/src/components/EventItem.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'; // Adicionado TouchableOpacity
import { useNavigation } from '@react-navigation/native'; // Adicionado useNavigation

// Agora EventItem espera uma prop 'event' que é um objeto com todos os dados.
// Se o seu objeto 'event' não tiver um campo 'color', você precisará
// ajustar como 'colorIndicator' obtém sua cor.
const EventItem = ({ event }) => {
  const navigation = useNavigation();

  // Se 'event' não for fornecido, podemos ter um fallback ou não renderizar
  if (!event) {
    return null;
  }

  const handlePress = () => {
    // Navega para 'ConfirmedEventDetails' e passa o objeto 'event' completo.
    // Certifique-se de que 'event' contenha:
    // id, name, time, location, group, description
    navigation.navigate('ConfirmedEventDetails', { event: event });
  };

  // Supondo que 'event.name' substitui 'title', e 'event.time' é o mesmo.
  // Se o seu objeto 'event' tiver um campo 'color', use event.color.
  // Caso contrário, defina uma cor padrão ou remova o indicador.
  const color = event.color || '#007AFF'; // Cor padrão se event.color não existir

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={[styles.colorIndicator, { backgroundColor: color }]} />
        <View style={styles.content}>
          {/* Usar event.name e event.time */}
          <Text style={styles.title}>{event.name || 'Evento sem nome'}</Text>
          <Text style={styles.time}>{event.time || 'Horário não definido'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    height: 60,
    // Adicione algum padding se o TouchableOpacity cortar a sombra ou borda
    paddingHorizontal: 5, // Exemplo
  },
  colorIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 4,
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#333', // Cor do título, ajuste se necessário
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
});

export default EventItem;