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

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [nome, setNome] = useState('');
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/;

  const handleNomeChange = (inputText) => {
    // Remove tudo que não for letra (A-Z, a-z) ou espaço
    const cleanText = inputText.replace(/[^a-zA-Z ]/g, '');
    setNome(cleanText);
  };

  const handleCadastro = () => {
    if (nome == '' || email == '' || senha == '' || confirmSenha == ''){
      Alert.alert('Preencha todos os campos.')
    }
    else if (nome.length < 3) {
      Alert.alert('Digite um nome de pelo menos 3 caracteres.');
    }
    else if(!regexEmail.test(email)) {
      Alert.alert('Digite um e-mail válido.')
    }
    else if(senha.length < 5 || !regexSenha.test(regexSenha)) {
      Alert.alert('Digite uma senha válida')
    }
    else if (senha != confirmSenha){
      Alert.alert('As senhas devem ser iguais.')
    }
    else{
      fetch('http://192.168.0.253:3000/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nome,
          email: email,
          password: senha
        }),
      })
        .then(response => {
          if (response.ok) {
            Alert.alert('Cadastro realizado com sucesso!');
            navigation.navigate('loginScreen');
          } else {
            response.json().then(data => {
              Alert.alert('Erro ao cadastrar', data.message || 'Erro desconhecido');
            });
          }
        })
        .catch(error => {
          console.error('Erro na requisição:', error);
          Alert.alert('Erro de conexão com o servidor');
        });  
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
          <Text style={styles.cadastroText}>Cadastre-se</Text>
          <Image
            source={require('../../assets/profile_image.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Campo Nome com validação */}
        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#757575"
          value={nome}
          onChangeText={handleNomeChange} // Usando a função de validação
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
          placeholder="Senha"
          placeholderTextColor="#757575"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#757575"
          value={confirmSenha}
          onChangeText={setConfirmSenha}
          secureTextEntry
          autoCapitalize="none"
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
