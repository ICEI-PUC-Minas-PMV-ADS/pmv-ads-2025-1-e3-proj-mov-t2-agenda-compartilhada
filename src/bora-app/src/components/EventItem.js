// src/components/EventItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EventItem = ({ title, time, color }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.colorIndicator, { backgroundColor: color }]} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    height: 60,
  },
  colorIndicator: {
    width: 4,
    height: '100%',
    borderRadius: 4,
    marginRight: 10,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    color: '#666',
  },
});

export default EventItem;