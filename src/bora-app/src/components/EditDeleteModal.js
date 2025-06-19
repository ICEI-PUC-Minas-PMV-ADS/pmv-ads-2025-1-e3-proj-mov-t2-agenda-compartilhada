import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const EditDeleteModal = ({
  visible,
  onClose,
  onEdit,
  onDelete,
  event // { title, date, description }
}) => {
  if (!event) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.date}>{event.date}</Text>
              <Text style={styles.description}>{event.description}</Text>
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.editButton} onPress={onEdit}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                  <Text style={styles.buttonText}>Deletar</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 24,
    minWidth: 300,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center'
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 16
  },
  editButton: {
    backgroundColor: '#7839EE',
    padding: 10,
    borderRadius: 5,
    marginRight: 10
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  closeButton: {
    marginTop: 8
  },
  closeButtonText: {
    color: '#007AFF',
    fontSize: 16
  }
});

export default EditDeleteModal;
