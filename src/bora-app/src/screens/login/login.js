import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_IP } from '@env';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    if (email === '' || senha === '') {
      Alert.alert('Por favor, insira seu e-mail e senha');
      return;
    }
  
    console.log("Fazendo login via URL:", `${API_IP}/auth/login`);
    try {
      const response = await axios({
        method: 'post',
        url: `${API_IP}/auth/login`,
        timeout: 10000, // 10 segundos
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email,
          password: senha,
        },
      });
      
  
      await AsyncStorage.setItem('access_token', response.data.access_token);
      
      if (response.data.user) {
        await AsyncStorage.setItem('usuario', JSON.stringify(response.data.user));
      } else {
        console.log('Erro: usuário não encontrado na resposta');
      }
  
      navigation.navigate('notificacoesScreen');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Erro', 'E-mail ou senha inválidos');
      } else {
        console.error('Erro:', error);
        Alert.alert('Erro', 'Algo deu errado. Tente novamente mais tarde.');
      }
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
          <Image
            source={require('../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
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

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#757575"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          autoCapitalize="none"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => {navigation.navigate('recuperarSenhaScreen')}}>
            <Text style={styles.linkText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
          <View style={styles.viewCadastrar}>
            <Text style={styles.naoTemConta}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={() => {navigation.navigate('cadastroScreen')}}>
              <Text style={styles.linkText}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    marginBottom: 5,
  },
  logo: {
    width: 150,
    height: 150,
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
  }
});
