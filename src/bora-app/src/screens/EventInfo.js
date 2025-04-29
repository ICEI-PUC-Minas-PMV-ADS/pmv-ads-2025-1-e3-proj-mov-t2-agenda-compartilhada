import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Feather, FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function EventInfo ()  {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.headerText}>Informações do Evento</Text>
        
        <View style={styles.eventCard}>
          <Text style={styles.title}>Happy Hour</Text>
          
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>Hoje, 19:00 - 21:00</Text>
          </View>
          
          <View style={styles.infoRow}>
            <MaterialIcons name="location-pin" size={20} color="red" />
            <Text style={styles.infoText}>Bar do Zé</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="people" size={20} color="#4682B4" />
            <Text style={styles.infoText}>Amigos do Trabalho</Text>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Descrição</Text>
            <Text style={styles.descriptionText}>
              Vamos nos encontrar no Bar do Zé para comemorar a entrega do projeto! Drinks por conta da empresa.
            </Text>
          </View>
          
          <View style={styles.participantsContainer}>
            <Text style={styles.participantsTitle}>Participantes</Text>
            <View style={styles.avatarRow}>
              <View style={[styles.avatar, { backgroundColor: '#4ADE80' }]} />
              <View style={[styles.avatar, { backgroundColor: '#FBBF24' }]} />
              <View style={[styles.avatar, { backgroundColor: '#4ADE80' }]} />
              <View style={[styles.avatar, { backgroundColor: '#4ADE80' }]} />
              <View style={[styles.avatar, { backgroundColor: '#F87171' }]} />
            </View>
            
            <View style={styles.goingContainer}>
              <View style={styles.goingAvatar}>
                <Feather name="check" size={24} color="white" />
              </View>
              <Text style={styles.goingText}>Vou</Text>
            </View>
          </View>
        </View>      
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    padding: 16,
  },
  card: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  eventCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timeContainer: {
    marginBottom: 16,
  },
  timeText: {
    fontSize: 16,
    color: '#333',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  descriptionContainer: {
    width: '100%',
    marginBottom: 16,
  },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  participantsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  avatarRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 4,
  },
  goingContainer: {
    alignItems: 'center',
  },
  goingAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#4ADE80',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  goingText: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingVertical: 16,
    marginTop: 16,
  },
  footerItem: {
    padding: 8,
  },
});
