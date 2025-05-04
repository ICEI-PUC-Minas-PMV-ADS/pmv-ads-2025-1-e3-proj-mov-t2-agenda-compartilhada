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
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { API_IP } from '@env';

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [nome, setNome] = useState('');
  const [image, setImage] = useState(null);
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmSenhaVisivel, setConfirmSenhaVisivel] = useState(false);
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

  const handleUploadImage = async () => {
    if (!image || !email) return;
  
    try {
      const fileInfo = await FileSystem.getInfoAsync(image);
      const fileUriParts = image.split('.');
      const fileType = fileUriParts[fileUriParts.length - 1];
  
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        name: `${email}.${fileType}`,
        type: `image/${fileType}`,
      });
      formData.append('displayName', email);
  
      const response = await fetch(`${API_IP}/usuarios/upload-image`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.log(data);
        Alert.alert('Erro ao enviar imagem', data.message || 'Erro desconhecido');
      } else {
        console.log('Imagem enviada:', data);
      }
  
    } catch (error) {
      console.error('Erro no upload da imagem:', error);
      Alert.alert('Erro ao enviar imagem');
    }
  };
  

  const handleNomeChange = (inputText) => {
    const cleanText = inputText.replace(/[^a-zA-Z ]/g, '');
    setNome(cleanText);
  };

    const handleCadastro = () => {

      let fotoPath;

      if (image) {
        const fileType = image.split('.').pop(); // pega extensão
        fotoPath = `${API_IP}/public/uploads/${email}.${fileType}`;
      } else {
        fotoPath = `${API_IP}/public/uploads/default_profile_image.png`;
      }

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
        handleUploadImage();
        
        fetch(`${API_IP}/usuarios`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: nome,
            email: email,
            password: senha,
            foto: fotoPath,
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

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#757575"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry={!senhaVisivel}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setSenhaVisivel(!senhaVisivel)}
          >
            <Ionicons name={senhaVisivel ? 'eye-off' : 'eye'} size={24} color="#757575" />
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            placeholderTextColor="#757575"
            value={confirmSenha}
            onChangeText={setConfirmSenha}
            secureTextEntry={!confirmSenhaVisivel}
            autoCapitalize="none"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setConfirmSenhaVisivel(!confirmSenhaVisivel)}
          >
            <Ionicons name={confirmSenhaVisivel ? 'eye-off' : 'eye'} size={24} color="#757575" />
          </TouchableOpacity>
        </View>

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
  },
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 18,
  },
});