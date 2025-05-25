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
} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Se quiser sobrescrever, defina extra.API_URL em app.json / app.config.js
const API_URL =
    Constants?.expoConfig?.extra?.API_URL || 'http://localhost:3000';

const CreateGroup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState('');       // texto digitado
    const [loading, setLoading] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState(''); // <- e-mail do criador

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

    /* --------------------- criar grupo --------------------------- */
    const handleCreateGroup = async () => {
        if (!name.trim()) {
            Alert.alert('Erro', 'O nome do grupo é obrigatório.');
            return;
        }

        if (!currentUserEmail) {
            Alert.alert(
                'Erro',
                'Não foi possível obter o e-mail do usuário logado. Faça login novamente.'
            );
            return;
        }

        // une e-mail do criador + convidados, sem repetições
        const membrosArray = Array.from(
            new Set([currentUserEmail, ...parseMembers(members)])
        );

        const payload = {
            nome: name.trim(),
            descricao: description.trim(),
            membros: membrosArray,
            grupoAdmins: [currentUserEmail], // criador já entra como admin
        };

        try {
            setLoading(true);

            const res = await fetch(`${API_URL}/grupos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const { message } = await res.json().catch(() => ({}));
                throw new Error(message || 'Não foi possível criar o grupo');
            }

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
                {/* ---------- Header ---------- */}
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

                {/* ---------- Conteúdo ---------- */}
                <ScrollView style={styles.content}>
                    <View style={styles.avatarContainer}>
                        <TouchableOpacity style={styles.avatarPlaceholder}>
                            <Text style={styles.avatarText}>Adicionar</Text>
                            <Text style={styles.avatarText}>foto</Text>
                        </TouchableOpacity>
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
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFF" />
                            ) : (
                                <Text style={styles.createButtonText}>Criar Grupo</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

/* --------------------- Estilos originais --------------------- */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
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
    backButtonText: {
        fontSize: 20,
        color: '#9A9A9D',
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#333333',
    },
    placeholder: {
        width: 30,
    },
    content: {
        flex: 1,
        padding: 16,
    },
    avatarContainer: {
        alignItems: 'center',
        marginVertical: 24,
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#EEEEEE',
    },
    avatarText: {
        fontSize: 10,
        color: '#9A9A9D',
    },
    formContainer: {
        gap: 16,
    },
    label: {
        fontSize: 14,
        color: '#333333',
        marginBottom: 4,
    },
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
    textArea: {
        height: 80,
        paddingTop: 12,
    },
    createButton: {
        height: 50,
        backgroundColor: '#7839EE',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    createButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default CreateGroup;
