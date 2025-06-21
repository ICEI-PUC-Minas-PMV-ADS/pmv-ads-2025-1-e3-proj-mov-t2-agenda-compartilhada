import React from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, Surface } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const EventoModal = ({
  id,
  titulo,
  descricao,
  dataEvento,
  dataFimEvento,
  tipo,
  membros,
  confirmados,
  recusas,
  visibilidade,
  onClose
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visibilidade}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Surface style={styles.modalContent} elevation={4}>
              <Text style={styles.title}>{titulo}</Text>

              <View style={styles.row}>
                <Ionicons name="document-text-outline" size={22} style={styles.icon} />
                <Text style={styles.label}>Descrição:</Text>
              </View>
              <Text>{descricao}</Text>

              <View style={styles.row}>
                <Ionicons name="time-outline" size={22} style={styles.icon} />
                <Text style={styles.label}>Início:</Text>
              </View>
              <Text>{new Date(dataEvento).toLocaleString()}</Text>

              <View style={styles.row}>
                <Ionicons name="time-outline" size={22} style={styles.icon} />
                <Text style={styles.label}>Fim:</Text>
              </View>
              <Text>{new Date(dataFimEvento).toLocaleString()}</Text>

              <View style={styles.row}>
                <Ionicons name="bookmark-outline" size={22} style={styles.icon} />
                <Text style={styles.label}>Tipo:</Text>
              </View>
              <Text>{tipo}</Text>
              
              {tipo == 'grupo' &&
              <>

                <View style={[styles.row, {justifyContent: 'space-evenly'}]}>
                  <Button mode='contained' style={{backgroundColor: '#53E88B', minWidth: 115}}>Vou</Button>
                  <Button mode='contained' style={{backgroundColor: '#FF4B4B', minWidth: 115}}>Não vou</Button>
                </View>
                                <Text style={[styles.label, {textAlign: 'center', marginTop: 10}]}>{confirmados.length} / {membros.length} confirmados</Text>
                </>
              }

              <Button mode="contained" onPress={onClose} style={styles.closeButton}>
                Fechar
              </Button>
            </Surface>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 8,
    color: '#5856D6',
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#712fe5',
  },
});

export default EventoModal;
