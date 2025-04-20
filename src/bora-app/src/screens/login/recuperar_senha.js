import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground
} from 'react-native';

export default function RecuperarSenhaScreen() {
  const [email, setEmail] = useState('');

  const handleCadastro = () => {
    if (email != '') {
      Alert.alert('Email enviado para: ' + email);
    } else {
      Alert.alert('Preencha o campo email');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
      
      <View style={styles.logoContainer}>
        <Text style={styles.mainText}>Recupere sua senha</Text>
      </View>

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          placeholderTextColor="#757575"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />


        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#fff',
  },
  input: {
    height: 60,
    backgroundColor: '#F4F4F4',
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    borderWidth: 1,
    borderColor: '#DDD'
  },
  button: {
    backgroundColor: '#712fe5',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#712fe5',
    fontWeight: 'bold',
    fontSize: 20
  },
  viewCadastrar: {
    alignItems: 'center',
    marginTop: 50
  },
  naoTemConta: {
    fontSize: 18
  },
  mainText: {
    color: '#712fe5',
    fontWeight: 'bold',
    fontSize: 30,
    marginBottom: 100
  }
});
