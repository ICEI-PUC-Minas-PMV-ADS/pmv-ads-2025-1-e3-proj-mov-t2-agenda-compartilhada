import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NovaTela() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta é a nova tela!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
