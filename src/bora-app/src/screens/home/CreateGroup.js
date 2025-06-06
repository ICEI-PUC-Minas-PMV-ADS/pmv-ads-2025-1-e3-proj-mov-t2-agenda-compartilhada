// src/screens/home/CreateGroup.js
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    ScrollView,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    Alert,
    Image,
} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { API_IP } from '@env';

const API_URL =
    Constants?.expoConfig?.extra?.API_URL || 'http://localhost:3000';

const CreateGroup = ({ navigation }) => {
    /* ----------------------- estados ----------------------- */
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState('');
    const [loading, setLoading] = useState(false);

    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);

    /* ------------ carrega o usuário logado ------------ */
    useEffect(() => {
        (async () => {
            try {
                const stored = await AsyncStorage.getItem('usuario');
                if (stored) {
                    const { email } = JSON.parse(stored);
                    setCurrentUserEmail(email?.trim().toLowerCase() || '');
                }
            } catch (err) {
                console.error('Erro ao ler usuário do AsyncStorage:', err);
            }
        })();
    }, []);

    /* -------------------------- helpers -------------------------- */
    const parseMembers = (txt) =>
        txt
            .split(/[,;\s]+/)
            .map((m) => m.trim().toLowerCase())
            .filter(Boolean);

    /* ------------- seleção de imagem ------------- */
    const pickImage = async () => {
        try {
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                return Alert.alert(
                    'Permissão necessária',
                    'Precisamos de acesso à galeria para adicionar uma foto ao grupo.'
                );
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5,
            });

            if (!result.canceled && result.assets?.length) {
                setImage(result.assets[0].uri);
            }
        } catch (err) {
            console.error('Erro ao escolher imagem:', err);
            Alert.alert('Erro', 'Não foi possível escolher a imagem');
        }
    };

    /* ------------- upload da imagem ------------- */
    const handleUploadImage = async () => {
        if (!image) return null;

        try {
            setUploading(true);
            const fileType = image.split('.').pop();
            const formData = new FormData();

            formData.append('file', {
                uri: image,
                name: `group_${Date.now()}.${fileType}`,
                type: `image/${fileType}`,
            });
            formData.append('displayName', `group_${Date.now()}`);

            // *** usando endpoint específico para grupos ***
            const response = await fetch(`${API_IP}/grupos/upload-image`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || 'Falha no upload da imagem');
            }

            const data = await response.json();
            return data.url;
        } catch (err) {
            console.error('Upload da imagem falhou:', err);
            Alert.alert('Erro', err.message || 'Falha ao enviar a imagem');
            return null;
        } finally {
            setUploading(false);
        }
    };

    /* --------------------- criar grupo --------------------------- */
    const handleCreateGroup = async () => {
        if (!name.trim()) {
            return Alert.alert('Erro', 'O nome do grupo é obrigatório.');
        }

        if (!currentUserEmail) {
            return Alert.alert(
                'Erro',
                'Não foi possível obter o e-mail do usuário logado. Faça login novamente.'
            );
        }

        const membrosArray = Array.from(
            new Set([currentUserEmail, ...parseMembers(members)])
        );

        setLoading(true);

        try {
            let fotoUrl = null;
            if (image) {
                fotoUrl = await handleUploadImage();
                if (!fotoUrl) throw new Error('Falha ao enviar a foto do grupo');
            }

            const payload = {
                nome: name.trim(),
                descricao: description.trim(),
                membros: membrosArray,
                grupoAdmins: [currentUserEmail],
                ...(fotoUrl && { foto: fotoUrl }),
            };

            console.log('Payload enviado:', payload); // Debug

            const res = await fetch(`${API_IP}/grupos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const { message } = await res.json().catch(() => ({}));
                throw new Error(message || 'Não foi possível criar o grupo');
            }

            const createdGroup = await res.json();
            console.log('Grupo criado:', createdGroup); // Debug

            Alert.alert('Sucesso', 'Grupo criado com sucesso!');
            navigation.goBack();
        } catch (err) {
            Alert.alert('Erro', err.message);
        } finally {
            setLoading(false);
        }
    };

    /* ------------------------ UI ------------------------ */
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Criar Grupo</Text>
                    <View style={styles.placeholder} />
                </View>

                {/* Conteúdo */}
                <ScrollView style={styles.content}>
                    <View style={styles.avatarContainer}>
                        <TouchableOpacity
                            style={styles.avatarPlaceholder}
                            onPress={pickImage}
                            activeOpacity={0.8}
                        >
                            {image ? (
                                <Image
                                    source={{ uri: image }}
                                    style={styles.avatarImage}
                                />
                            ) : (
                                <>
                                    <Text style={styles.avatarText}>Adicionar</Text>
                                    <Text style={styles.avatarText}>foto</Text>
                                </>
                            )}
                        </TouchableOpacity>
                        {uploading && (
                            <Text style={styles.uploadingText}>
                                Enviando foto...
                            </Text>
                        )}
                    </View>

                    <View style={styles.formContainer}>
                        <Text style={styles.label}>Nome do grupo</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nome do grupo"
                            placeholderTextColor="#9A9A9D"
                            value={name}
                            onChangeText={setName}
                        />

                        <Text style={styles.label}>Descrição</Text>
                        <TextInput
                            style={[styles.input, styles.textArea]}
                            placeholder="Descreva o propósito do grupo"
                            placeholderTextColor="#9A9A9D"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            value={description}
                            onChangeText={setDescription}
                        />

                        <Text style={styles.label}>Convidar membros</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email ou nome (separe por vírgula)"
                            placeholderTextColor="#9A9A9D"
                            value={members}
                            onChangeText={setMembers}
                        />

                        <TouchableOpacity
                            style={styles.createButton}
                            onPress={handleCreateGroup}
                            disabled={loading || uploading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={styles.createButtonText}>
                                    Criar Grupo
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

/* --------------------------- estilos --------------------------- */
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: {
        height: 60,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButtonText: { fontSize: 20, color: '#9A9A9D' },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
    },
    placeholder: { width: 30 },
    content: { flex: 1, padding: 16 },
    avatarContainer: { alignItems: 'center', marginVertical: 24 },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',
        overflow: 'hidden',
    },
    avatarImage: { width: '100%', height: '100%', borderRadius: 50 },
    avatarText: { fontSize: 12, color: '#9A9A9D', textAlign: 'center' },
    uploadingText: { marginTop: 8, fontSize: 12, color: '#9A9A9D' },
    formContainer: { gap: 16 },
    label: { fontSize: 14, color: '#333333', marginBottom: 4 },
    input: {
        height: 50,
        backgroundColor: '#F4F4F4',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        paddingHorizontal: 12,
        fontSize: 12,
        color: '#333333',
    },
    textArea: { height: 80, paddingTop: 12 },
    createButton: {
        height: 50,
        backgroundColor: '#7839EE',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    createButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '500' },
});

export default CreateGroup;