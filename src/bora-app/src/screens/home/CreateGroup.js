import React, { useState } from 'react';
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
} from 'react-native';

const CreateGroup = ({ navigation }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [members, setMembers] = useState('');

    const handleCreateGroup = () => {
        navigation.goBack();
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.container}>
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
                            placeholder="Email ou nome"
                            placeholderTextColor="#9A9A9D"
                            value={members}
                            onChangeText={setMembers}
                        />

                        <TouchableOpacity
                            style={styles.createButton}
                            onPress={handleCreateGroup}
                        >
                            <Text style={styles.createButtonText}>Criar Grupo</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

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