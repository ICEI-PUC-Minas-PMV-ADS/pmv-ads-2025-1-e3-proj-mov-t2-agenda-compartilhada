import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { API_IP } from '@env';

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [nome, setNome] = useState('');
  const [image, setImage] = useState(null);
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/;

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permissão necessária',
          'Precisamos de acesso à galeria para selecionar uma imagem de perfil.'
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao escolher imagem:', error);
      Alert.alert('Erro ao escolher imagem');
    }
  };

  const handleNomeChange = (inputText) => {
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
      else if (senha.length < 5 || !regexSenha.test(senha)) {
        Alert.alert('Digite uma senha válida')
      }
      else if (senha != confirmSenha){
        Alert.alert('As senhas devem ser iguais.')
      }
      else{
        fetch(`${API_IP}/usuarios`, {
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
          .then(async response => {
            const data = await response.json();
            if (response.ok) {
              Alert.alert('Cadastro realizado com sucesso!');
              navigation.navigate('loginScreen');
            } else {
              Alert.alert('Erro ao cadastrar', data.message || 'Erro desconhecido');
            }
          })
          .catch(error => {
            console.error('Erro na requisição:', JSON.stringify(error, null, 2));
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
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={image ? { uri: image } : require('../../assets/profile_image.png')}
              style={styles.logo}
              resizeMode="cover"
            />
            <Text
              style={[styles.choosePhotoText, image && styles.selectedPhotoText]}
            >
              {image ? 'Foto selecionada' : 'Escolher foto'}
            </Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          placeholderTextColor="#757575"
          value={nome}
          onChangeText={handleNomeChange}
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
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#712fe5',
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
    borderColor: '#DDD',
  },
  button: {
    backgroundColor: '#712fe5',
    padding: 20,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cadastroText: {
    color: '#712fe5',
    fontWeight: 'bold',
    fontSize: 30,
  },
  choosePhotoText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: '#0009',
    borderRadius: 10,
    color: 'white',
    padding: 3
  },
  selectedPhotoText: {
    color: '#4bded7',
  }
});