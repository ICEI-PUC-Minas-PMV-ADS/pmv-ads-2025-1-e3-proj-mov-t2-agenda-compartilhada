// src/components/AddMembersModal.js
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TextInput,
} from 'react-native';

const AddMembersModal = ({ visible, onClose, onSave }) => {
    const [emailsText, setEmailsText] = React.useState('');

    const handleSave = () => {
        const emailsArray = emailsText
            .split(',')
            .map(email => email.trim())
            .filter(email => email.length > 0);

        console.log('Emails digitados:', emailsArray);
        onSave(emailsArray);
        setEmailsText('');
    };

    const handleClose = () => {
        setEmailsText('');
        onClose();
    };

    return (
        <Modal
            transparent
            visible={visible}
            animationType="slide"
            onRequestClose={handleClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Adicione os novos membros</Text>

                    <TextInput
                        style={styles.textArea}
                        placeholder="Digite os emails separados por vírgula"
                        placeholderTextColor="#9A9A9D"
                        multiline
                        numberOfLines={4}
                        value={emailsText}
                        onChangeText={setEmailsText}
                        textAlignVertical="top"
                    />

                    <View style={styles.buttons}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={handleClose}
                        >
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.saveButton]}
                            onPress={handleSave}
                        >
                            <Text style={styles.saveButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginBottom: 16,
        textAlign: 'center',
    },
    textArea: {
        borderWidth: 1,
        borderColor: '#EEEEEE',
        borderRadius: 8,
        padding: 12,
        minHeight: 100,
        fontSize: 14,
        color: '#333333',
        marginBottom: 20,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#F4F4F4',
        marginRight: 8,
    },
    saveButton: {
        backgroundColor: '#7839EE',
        marginLeft: 8,
    },
    cancelButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666666',
    },
    saveButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FFFFFF',
    },
});

export default AddMembersModal;