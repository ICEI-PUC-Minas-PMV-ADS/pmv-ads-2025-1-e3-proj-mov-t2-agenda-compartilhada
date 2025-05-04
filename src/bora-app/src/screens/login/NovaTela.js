import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function NovaTela() {
  const [image, setImage] = useState(null);
  const [displayName, setDisplayName] = useState('');

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Erro ao escolher imagem:', error);
      Alert.alert('Erro ao escolher imagem');
    }
  };

  const uploadImage = async () => {
    if (!image || !displayName.trim()) {
      Alert.alert('Preencha todos os campos antes de enviar.');
      return;
    }

    const fileInfo = await FileSystem.getInfoAsync(image);
    const uriParts = image.split('.');
    const fileType = uriParts[uriParts.length - 1];

    const formData = new FormData();
    formData.append('file', {
      uri: image,
      name: `upload.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append('displayName', displayName);

    try {
      const response = await fetch('http://192.168.0.13:3000/usuarios/upload-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Upload feito com sucesso!', `Imagem salva como: ${data.filename}`);
        setImage(null);
        setDisplayName('');
      } else {
        console.error('Erro no upload:', data);
        Alert.alert('Erro ao fazer upload', data.message || 'Tente novamente');
      }
    } catch (error) {
      console.error('Erro ao enviar imagem:', error);
      Alert.alert('Erro de rede', 'Não foi possível conectar ao servidor');
    }
  };

  return (
    <View style={styles.container}>
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

      <TextInput
        style={styles.input}
        placeholder="Nome da imagem"
        placeholderTextColor="#757575"
        value={displayName}
        onChangeText={setDisplayName}
      />

      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  choosePhotoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  selectedPhotoText: {
    color: 'green',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});
