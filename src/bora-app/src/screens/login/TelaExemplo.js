import React, { useState } from 'react';
import { View, Button } from 'react-native';
import EventoModal from '../../components/EventoModal';

const TelaExemplo = () => {
  const [modalVisivel, setModalVisivel] = useState(false);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Abrir Modal" onPress={() => setModalVisivel(true)} />

      <EventoModal
        titulo="Reunião de Projeto"
        descricao="Reunião para revisar as entregas da sprint."
        dataEvento={new Date()}
        dataFimEvento={new Date(Date.now() + 3600000)}
        tipo="Reunião"
        visibilidade={modalVisivel}
        onClose={() => setModalVisivel(false)}
      />
    </View>
  );
};

export default TelaExemplo;
