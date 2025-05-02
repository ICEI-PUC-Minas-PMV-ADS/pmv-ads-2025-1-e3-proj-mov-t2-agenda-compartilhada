import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

export default function TelaTeste() {
  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.text}>Bem-vindo à Tela de Teste!</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: '#ffffffcc',
    padding: 30,
    borderRadius: 12,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#712fe5',
    textAlign: 'center',
  },
});
