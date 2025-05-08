import React, { useState, useRef } from 'react';
import { Appbar, Avatar, Text, Card } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import GroupCalendar from './GroupCalendar'
import GroupMemberEvents from './GroupMemberEvents';

const Group = () => {
  const _goBack = () => console.log('Went back');

  const [itemAtivo, setItemAtivo] = useState(0);
  const scrollViewRef = useRef(null);

  const menuItems = ['Calendário', 'Membros', 'Eventos'];

  const eventos = [
    {
      id: 1,
      data: '2025-04-29',
      titulo: 'Happy Hour',
      subtitulo: 'Amigos do Trabalho',
    },
    {
      id: 2,
      data: '2025-04-30',
      titulo: 'Jantar em família',
      subtitulo: 'Família',
    },
    {
      id: 3,
      data: '2025-05-30',
      titulo: 'Jantar em família',
      subtitulo: 'Família',
    },
    {
      id: 4,
      data: '2025-04-30',
      titulo: 'Jantar em família',
      subtitulo: 'Família',
    },
    {
      id: 5,
      data: '2025-04-30',
      titulo: 'Jantar em família',
      subtitulo: 'Família',
    },
    {
      id: 6,
      data: '2025-04-30',
      titulo: 'Jantar em família',
      subtitulo: 'Família',
    },
    {
      id: 7,
      data: '2025-04-30',
      titulo: 'Jantar em família',
      subtitulo: 'Família',
    },
    {
      id: 8,
      data: '2025-04-30',
      titulo: 'Jantar em família',
      subtitulo: 'Família',
    },
    {
      id: 9,
      data: '2025-04-30',
      titulo: 'Jantar em família',
      subtitulo: 'Família',
    },
    {
      id: 10,
      data: '2025-05-04',
      titulo: 'Jantar em família',
      subtitulo: 'Família',
    },

  ];

  const userEventos = [
    {
      id: 1,
      nome: 'Pedro (Você)',
      role: 'Administrador',
      eventos: [
        {
          id: 1,
          data: '2025-04-30',
          desseGrupo: true
        },
        {
          id: 2,
          data: '2025-05-02',
          desseGrupo: true
        },
        {
          id: 3,
          data: '2025-05-13',
          desseGrupo: true
        },
        {
          id: 4,
          data: '2025-05-27',
          desseGrupo: true
        },
        {
          id: 6,
          data: '2025-05-30',
          desseGrupo: true
        },
        {
          id: 7,
          data: '2025-05-30',
          desseGrupo: true
        },
        {
          id: 8,
          data: '2025-05-30',
          desseGrupo: true
        },
        {
          id: 9,
          data: '2025-05-30',
          desseGrupo: true
        },
        {
          id: 10,
          data: '2025-05-30',
          desseGrupo: true
        },
        {
          id: 11,
          data: '2025-05-30',
          desseGrupo: true
        },
      ]
    },
    {
      id: 2,
      nome: 'Antonio',
      role: 'Membro',
      eventos: [
        {
          id: 1,
          data: '2025-04-30',
          desseGrupo: true
        },
        {
          id: 2,
          data: '2025-05-02',
          desseGrupo: true
        },
        {
          id: 3,
          data: '2025-05-13',
          desseGrupo: true
        },
        {
          id: 4,
          data: '2025-05-27',
          desseGrupo: true
        },
        {
          id: 6,
          data: '2025-05-30',
          desseGrupo: true
        },
        {
          id: 7,
          data: '2025-05-30',
          desseGrupo: true
        },
        {
          id: 8,
          data: '2025-05-30',
          desseGrupo: true
        },
        {
          id: 9,
          data: '2025-05-30',
          desseGrupo: true
        },
        {
          id: 10,
          data: '2025-05-30',
          desseGrupo: true
        },
        {
          id: 11,
          data: '2025-05-30',
          desseGrupo: true
        },
      ]
    },
    {
      id: 3,
      nome: 'José',
      role: 'Membro',
      eventos: []
    },
    {
      id: 4,
      nome: 'Maria',
      role: 'Membro',
      eventos: []
    },
    {
      id: 5,
      nome: 'Maria',
      role: 'Membro',
      eventos: []
    },
    {
      id: 6,
      nome: 'Maria',
      role: 'Membro',
      eventos: []
    },
    {
      id: 7,
      nome: 'Maria',
      role: 'Membro',
      eventos: []
    },
    {
      id: 8,
      nome: 'Maria',
      role: 'Membro',
      eventos: []
    },
    {
      id: 9,
      nome: 'Maria',
      role: 'Membro',
      eventos: []
    },
    {
      id: 10,
      nome: 'Maria',
      role: 'Membro',
      eventos: []
    },
    {
      id: 11,
      nome: 'Maria',
      role: 'Membro',
      eventos: []
    },
    {
      id: 12,
      nome: 'Maria',
      role: 'Membro',
      eventos: []
    },
    {
      id: 13,
      nome: 'Maria',
      role: 'Membro',
      eventos: []
    },  
  ];


  const content = [
    <GroupCalendar eventos={eventos} />,
    
    <GroupMemberEvents userEventos={userEventos} />
    ,
    <View style={styles.contentItem}>
      <Text>Content for Item 3</Text>
    </View>,
  ];

  const handleMenuItemPress = (index) => {
    setItemAtivo(index);
  };

  return (
    <SafeAreaProvider >
      
      <View style={styles.body}>
      
        <View style={styles.groupName}>
          <Avatar.Text
            style={{ backgroundColor: '#F4F4F4' }}
            labelStyle={{ fontSize: 20 }}
            size={90}
            label="AT"
            color="#9A9A9D"
          />

          <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Amigos do Trabalho
            </Text>
            <Text style={{ fontSize: 15 }}>5 membros</Text>
          </View>
        </View>

        <View>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleMenuItemPress(index)}>
              <Text
                style={
                  itemAtivo === index
                    ? [styles.menuText, styles.activeMenuText]
                    : styles.menuText
                }>
                {item}
              </Text>

              <View
                style={
                  itemAtivo === index
                    ? [styles.underline, styles.activeUnderline]
                    : styles.underline
                }
              />
              
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>


          {content[itemAtivo]} 

      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop:8,
    paddingHorizontal: 8 
  },
  appBarHeader: {
    backgroundColor: 'transparent',
  },
  groupName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuText: {
    fontSize: 17,
    color: '#9A9A9D',
    paddingBottom: 15,
  },
  underline: {
    backgroundColor: 'transparent',
    height: 5,
    borderRadius: 10,
    alignSelf: 'center',
    width: '70%',
    overflow: 'hidden',
  },
  activeMenuText: {
    color: '#7839EE',
  },
  activeUnderline: {
    backgroundColor: '#7839EE',
  },
  contentItem: {
    alignItems: 'center',
  },
});

export default Group;
