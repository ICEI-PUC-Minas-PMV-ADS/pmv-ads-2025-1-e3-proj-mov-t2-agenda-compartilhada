import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TimeSlot = ({ startTime, endTime, selected, onPress }) => {
  return (
    <TouchableOpacity 
      style={[styles.container, selected && styles.selectedContainer]} 
      onPress={onPress}
    >
      <Text style={styles.timeText}>{startTime} - {endTime}</Text>
      {selected && (
        <View style={styles.checkmark}>
          <Text style={styles.checkmarkText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectedContainer: {
    borderColor: '#8A2BE2',
    backgroundColor: '#F8F4FF',
  },
  timeText: {
    fontSize: 16,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#8A2BE2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default TimeSlot;