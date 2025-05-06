import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ImageBackground, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_IP } from '@env';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    console.log('botao clicado')
    if (email === '' || senha === '') {
      Alert.alert('Por favor, insira seu e-mail e senha');
      return;
    }

    try {
      const response = await axios({
        method: 'post',
        url: `${API_IP}/auth/login`,
        timeout: 10000,
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
      }

      navigation.replace('mainTab');
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

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Senha"
            placeholderTextColor="#757575"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#757575"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <View style={styles.linksContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('recuperarSenhaScreen')}>
            <Text style={styles.linkText}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
          <View style={styles.viewCadastrar}>
            <Text style={styles.naoTemConta}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('cadastroScreen')}>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    backgroundColor: '#F4F4F4',
    marginBottom: 15,
    borderRadius: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#DDD'
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
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
