// src/components/NavBar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const NavBar = ({ navigation }) => {
  // Ícones simplificados (você precisará usar imagens reais)
  const tabs = [
    { icon: '👤', name: 'profile' },
    { icon: '📅', name: 'calendar' },
    { icon: '👥', name: 'friends' },
    { icon: '🔔', name: 'notifications' },
    { icon: '⚙️', name: 'settings' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.tab}
          onPress={() => navigation && navigation.navigate(tab.name)}
        >
          <Text style={styles.tabIcon}>{tab.icon}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    fontSize: 24,
  },
});

export default NavBar;
