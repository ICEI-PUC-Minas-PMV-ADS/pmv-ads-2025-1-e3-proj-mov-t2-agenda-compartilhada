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
  FlatList,
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
  const [feedbackSenhaVisible, setFeedbackSenhaVisible] = useState(false)

  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexSenha = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{5,}$/;

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
      console.error('Erro ao escolher imagem:', error.message || error);
      Alert.alert('Erro ao escolher imagem');
    }
  };

  const handleUploadImage = async () => {
    if (!image || !email) return false;

    try {
      const fileType = image.split('.').pop();
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        name: `${email}.${fileType}`,
        type: `image/${fileType}`,
      });
      formData.append('displayName', email);
      const res = await fetch(`${API_IP}/usuarios/upload-image`, {
        method: 'POST',
        // Não especificar Content-Type para FormData
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json();
        Alert.alert('Erro ao enviar imagem', errData.message || 'Erro desconhecido');
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro no upload da imagem:', error.message || error);
      Alert.alert('Erro ao enviar imagem', error.message || 'Erro desconhecido');
      return false;
    }
  };

  const handleNomeChange = (inputText) => {
    const cleanText = inputText.replace(/[^a-zA-Z ]/g, '');
    setNome(cleanText);
  };

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmSenha) {
      return Alert.alert('Preencha todos os campos.');
    }
    if (nome.length < 3) {
      return Alert.alert('Digite um nome de pelo menos 3 caracteres.');
    }
    if (!regexEmail.test(email)) {
      return Alert.alert('Digite um e-mail válido.');
    }
    if (senha.length < 5 || !regexSenha.test(senha)) {
      setFeedbackSenhaVisible(true);
      return Alert.alert('Digite uma senha válida.');
    } else {
      setFeedbackSenhaVisible(false);
    }
    if (senha !== confirmSenha) {
      return Alert.alert('As senhas devem ser iguais.');
    }

    const fileType = image?.split('.').pop();
    const fotoPath = image
        ? `${API_IP}/public/uploads/${email}.${fileType}`
        : `${API_IP}/public/uploads/default_profile_image.png`;

    try {
      // Se houver imagem, tenta fazer upload primeiro
      if (image) {
        const uploadOK = await handleUploadImage();
        if (!uploadOK) return; // aborta se falhar
      }

      const response = await fetch(`${API_IP}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: nome,
          email,
          password: senha,
          foto: fotoPath,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Cadastro realizado com sucesso!');
        navigation.navigate('loginScreen');
      } else {
        Alert.alert('Erro ao cadastrar', data.message || 'Erro desconhecido');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error.message || error);
      Alert.alert('Erro de conexão com o servidor', error.message || 'Verifique sua rede');
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
              <Text style={[styles.choosePhotoText, image && styles.selectedPhotoText]}>
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
              <Ionicons
                  name={senhaVisivel ? 'eye-off' : 'eye'}
                  size={24}
                  color="#757575"
              />
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
              <Ionicons
                  name={confirmSenhaVisivel ? 'eye-off' : 'eye'}
                  size={24}
                  color="#757575"
              />
            </TouchableOpacity>
          </View>
          {feedbackSenhaVisible && (
            <View style={styles.feedbackSenhaView}>
              <Text style={styles.feedbackSenhaText}>A senha deve conter:</Text>
              <FlatList
                style={styles.feedbackSenhaList}
                data={[
                  {key: 'Letra minúscula'},
                  {key: 'Letra maiúscula'},
                  {key: 'Caractere especial'},
                  {key: 'Mais de 4 caracteres'},
                ]}
                renderItem={({item}) => <Text style={styles.itemFeedbackSenhaList}>{item.key}</Text>}
              />
            </View>
          )}
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
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  cadastroText: {
    color: '#712fe5',
    fontWeight: 'bold',
    fontSize: 30,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#712fe5',
  },
  choosePhotoText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
    backgroundColor: '#0009',
    borderRadius: 10,
    color: 'white',
    padding: 3,
  },
  selectedPhotoText: {
    color: '#4bded7',
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
  passwordContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 18,
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
  feedbackSenhaList: {
    marginLeft: 20
  },
  itemFeedbackSenhaList: {
    color: 'red'
  },
  feedbackSenhaText: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 5
  }
});
