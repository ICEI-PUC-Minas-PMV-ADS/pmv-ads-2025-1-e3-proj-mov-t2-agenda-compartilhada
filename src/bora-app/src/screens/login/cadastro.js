import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Image
} from 'react-native';

export default function CadastroScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleCadastro = () => {
    if (email != '' && senha != '' && nome != '' && whatsapp != '' && senha === confirmSenha) {
      Alert.alert('Cadastro realizado com sucesso!');
    } else {
      Alert.alert('Campos inválidos');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/background.png')} // caminho local
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
      
      <View style={styles.logoContainer}>
        <Text style={styles.cadastroText}>Cadastre-se</Text>
        <Image
          source={require('../../assets/profile_image.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#757575"
          value={senha}
          onChangeText={setNome}
          secureTextEntry
        />

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
          placeholder="Whatsapp"
          placeholderTextColor="#757575"
          value={senha}
          onChangeText={setWhatsapp}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#757575"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#757575"
          value={senha}
          onChangeText={setConfirmSenha}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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
  cadastroText: {
    color: '#712fe5',
    fontWeight: 'bold',
    fontSize: 30
  }
});
