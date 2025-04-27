import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Bem-vindo ao Aplicativo</Text>
        <Text style={styles.subtitle}>Escolha uma opção abaixo</Text>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('EventList')}
        >
          <Text style={styles.buttonText}>Lista de Eventos</Text>
        </TouchableOpacity>

        <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.buttonText}>Perfil do Usuário</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Notifications')}
          >
            <Text style={styles.buttonText}>Notificações</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    elevation: 3,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});