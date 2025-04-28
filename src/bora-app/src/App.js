import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Appbar, Avatar, Text, Card } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import GroupCalendar from './screens/GroupCalendar';
import { Calendar } from 'react-native-calendars';
import CalendarComp from './components/CalendarComp';


const App = () => {
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
      cor: '#6a3de8'
    },
    {
      id: 2,
      data: '2025-04-30',
      titulo: 'Jantar em família',
      subtitulo: 'Família',
      cor: '#3de86a'
    }
  ];

  const content = [
    <View>
      
      <GroupCalendar eventos={ eventos }/>

    </View>,


    <View>
      <View style={{ marginVertical: 16 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '30%' }}>
            <Avatar.Text
              style={{ backgroundColor: '#F4F4F4' }}
              labelStyle={{ fontSize: 20 }}
              size={60}
              label='P'
              color='#9A9A9D'
            />
          </View>

          <View style={{ alignSelf:'center' }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }} >Pedro (Você)</Text>
            <Text style={{ fontSize: 14, color: '#9A9A9D' }} >Administrador</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8, marginTop: 8 }}>
          <Text style={{ fontSize: 13, color: '#7839EE', backgroundColor: '#F1EBFD', borderRadius: 25, borderWidth: 10, borderColor: '#F1EBFD', minWidth: 60, textAlign: 'center' }}>Hoje</Text>
          <Text style={{ fontSize: 13, color: '#9A9A9D', backgroundColor: '#F4F4F4', borderRadius: 25, borderWidth: 10, borderColor: '#F4F4F4', minWidth: 60, textAlign: 'center' }}>27/04</Text>
          <Text style={{ fontSize: 13, color: '#7839EE', backgroundColor: '#F1EBFD', borderRadius: 25, borderWidth: 10, borderColor: '#F1EBFD', minWidth: 60, textAlign: 'center' }}>30/04</Text>
          <Text style={{ fontSize: 13, color: '#7839EE', backgroundColor: '#F1EBFD', borderRadius: 25, borderWidth: 10, borderColor: '#F1EBFD', minWidth: 60, textAlign: 'center' }}>05/05</Text>
          <Text style={{ fontSize: 13, color: '#9A9A9D', backgroundColor: '#F4F4F4', borderRadius: 25, borderWidth: 10, borderColor: '#F4F4F4', minWidth: 60, textAlign: 'center' }}>06/05</Text>
        </View>
      </View>


      <View style={{ marginVertical: 16 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '30%' }}>
            <Avatar.Text
              style={{ backgroundColor: '#F4F4F4' }}
              labelStyle={{ fontSize: 20 }}
              size={60}
              label='J'
              color='#9A9A9D'
            />
          </View>

          <View style={{ alignSelf:'center' }}>
            <Text style={{ fontSize: 17, fontWeight: 'bold' }} >João</Text>
            <Text style={{ fontSize: 14, color: '#9A9A9D' }} >Participante</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8, marginTop: 8 }}>
          <Text style={{ fontSize: 13, color: '#7839EE', backgroundColor: '#F1EBFD', borderRadius: 25, borderWidth: 10, borderColor: '#F1EBFD', minWidth: 60, textAlign: 'center' }}>Hoje</Text>
          <Text style={{ fontSize: 13, color: '#7839EE', backgroundColor: '#F1EBFD', borderRadius: 25, borderWidth: 10, borderColor: '#F1EBFD', minWidth: 60, textAlign: 'center' }}>29/04</Text>
          <Text style={{ fontSize: 13, color: '#9A9A9D', backgroundColor: '#F4F4F4', borderRadius: 25, borderWidth: 10, borderColor: '#F4F4F4', minWidth: 60, textAlign: 'center' }}>01/05</Text>
          <Text style={{ fontSize: 13, color: '#7839EE', backgroundColor: '#F1EBFD', borderRadius: 25, borderWidth: 10, borderColor: '#F1EBFD', minWidth: 60, textAlign: 'center' }}>05/05</Text>
          <Text style={{ fontSize: 13, color: '#7839EE', backgroundColor: '#F1EBFD', borderRadius: 25, borderWidth: 10, borderColor: '#F1EBFD', minWidth: 60, textAlign: 'center' }}>06/05</Text>
        </View>
      </View>


    </View>,
    <View style={styles.contentItem}>
      <Text>Content for Item 3</Text>
    </View>,
  ];


  const handleMenuItemPress = (index) => {
    setItemAtivo(index);
  };

  return (
    <SafeAreaProvider style={styles.container}>

      <Appbar.Header style={styles.appBarHeader}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title='Amigos do Trabalho' />
      </Appbar.Header>

      <View style={styles.body}>

        <View style={styles.groupName} >
          <Avatar.Text
            style={{ backgroundColor: '#F4F4F4' }}
            labelStyle={{ fontSize: 20 }}
            size={90}
            label='AT'
            color='#9A9A9D'
          />

          <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }} >Amigos do Trabalho</Text>
            <Text style={{ fontSize: 15 }}>5 membros</Text>
          </View>
        </View>



        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuItem,
                itemAtivo === index && styles.activeMenuItem,
              ]}
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

        <View>{content[itemAtivo]}</View>








      </View>

    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  appBarHeader: {
    backgroundColor: 'transparent',
  },
  body: {
    margin: 8,
    marginTop: 0
  },
  groupName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8
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
    overflow: 'hidden'
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
})

export default App;