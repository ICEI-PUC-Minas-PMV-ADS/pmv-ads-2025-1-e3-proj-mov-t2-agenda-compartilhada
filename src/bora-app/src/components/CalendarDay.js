// src/components/CalendarDay.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CalendarDay = ({ day, empty, special, isSelected, onPress }) => {
  if (empty) {
    return <TouchableOpacity style={[styles.dayCell, styles.emptyCell]} disabled />;
  }

  const dayStyle = [styles.dayCell];
  const textStyle = [styles.dayText];
  
  if (special) {
    dayStyle.push({ backgroundColor: special.color });
    textStyle.push(styles.specialDayText);
  }
  
  if (isSelected) {
    dayStyle.push(styles.selectedDay);
    textStyle.push(styles.selectedDayText);
  }

  return (
    <TouchableOpacity style={dayStyle} onPress={onPress}>
      <Text style={textStyle}>{day}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dayCell: {
    width: '14.28%', // 100% / 7 dias
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
  },
  emptyCell: {
    backgroundColor: 'transparent',
  },
  dayText: {
    fontSize: 16,
  },
  selectedDay: {
    backgroundColor: '#8A2BE2',
    borderRadius: 20,
  },
  selectedDayText: {
    color: 'white',
  },
  specialDayText: {
    color: 'white',
  },
});

export default CalendarDay;