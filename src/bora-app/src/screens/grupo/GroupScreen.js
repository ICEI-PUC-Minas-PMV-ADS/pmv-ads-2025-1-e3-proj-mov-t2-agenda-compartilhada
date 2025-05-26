import React, { useState, useRef, useEffect } from 'react';
import { Appbar, Avatar, Text, Card } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import GroupCalendar from './GroupCalendar'
import GroupMemberEvents from './GroupMemberEvents';
import axios from 'axios'
import { API_IP } from '@env';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    nome: 'Pedro Pereira (Você)',
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
        desseGrupo: false
      },
      {
        id: 6,
        data: '2025-05-30',
        desseGrupo: true
      },
      {
        id: 7,
        data: '2025-05-30',
        desseGrupo: false
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
        desseGrupo: false
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
    nome: 'João Silva',
    role: 'Membro',
    eventos: [
      {
        id: 1,
        data: '2025-04-30',
        desseGrupo: false
      },
      {
        id: 2,
        data: '2025-05-02',
        desseGrupo: true
      },
      {
        id: 3,
        data: '2025-05-13',
        desseGrupo: false
      },
      {
        id: 4,
        data: '2025-05-27',
        desseGrupo: false
      },
      {
        id: 6,
        data: '2025-05-30',
        desseGrupo: true
      },
      {
        id: 7,
        data: '2025-05-30',
        desseGrupo: false
      },
    ]
  },

  {
    id: 3,
    nome: 'José Antonio',
    role: 'Membro',
    eventos: [
      {
        id: 1,
        data: '2025-05-30',
        desseGrupo: true
      },
      {
        id: 2,
        data: '2025-05-30',
        desseGrupo: false
      },
      {
        id: 3,
        data: '2025-05-30',
        desseGrupo: true
      },
    ]
  },

  {
    id: 4,
    nome: 'Maria Costa',
    role: 'Membro',
    eventos: [
      {
        id: 1,
        data: '2025-05-30',
        desseGrupo: true
      },
      {
        id: 2,
        data: '2025-05-30',
        desseGrupo: true
      },
      {
        id: 3,
        data: '2025-05-30',
        desseGrupo: false
      },
      {
        id: 4,
        data: '2025-05-30',
        desseGrupo: false
      },
      {
        id: 5,
        data: '2025-05-30',
        desseGrupo: true
      },
      {
        id: 6,
        data: '2025-05-30',
        desseGrupo: true
      },
    ]
  },
  {
    id: 5,
    nome: 'Rogério Pena',
    role: 'Membro',
    eventos: [
      {
        id: 1,
        data: '2025-05-30',
        desseGrupo: true
      },
      {
        id: 2,
        data: '2025-05-30',
        desseGrupo: false
      },
      {
        id: 3,
        data: '2025-05-30',
        desseGrupo: true
      },
      {
        id: 4,
        data: '2025-05-30',
        desseGrupo: true
      },
    ]
  }
];

const GroupScreen = ({ navigation, route }) => {

  const [username, setUsername] = useState('')
  const [loadingUser, setLoadingUser] = useState(true)
  const { groupId } = route.params
  const [grupo, setGrupo] = useState([])
  const [eventos, setEventos] = useState([])
  const [loading, setLoading] = useState(true)
  const [itemAtivo, setItemAtivo] = useState(0);
  const scrollViewRef = useRef(null);
  console.log(groupId)


  useEffect(() => {
    const loadUser = async () => {
      try {
        const userString = await AsyncStorage.getItem('usuario')
        if (userString) {
          const user = JSON.parse(userString)
          setUsername(user.name)
        }
      } catch (error) {
        console.error('Error ao puxar user: ', error)
      } finally {
        setLoadingUser(false)
      }
    }
    loadUser();
  }, [])

  if (!loadingUser) {
    console.log(username)
  }

  // Carrega informações do grupo
  useEffect(() => {
    const carregaGrupo = async () => {
      if (itemAtivo == 0) {
        try {
          const grupoInfo = await axios.get(API_IP + '/grupos/' + groupId)
          const eventosGrupo = await axios.get(API_IP + '/eventos-grupo/by-grupoId/' + groupId)
          setGrupo(grupoInfo.data)
          setEventos(eventosGrupo.data)
          console.log(grupoInfo)
        } catch (error) {
          console.error('Erro ao buscar dados do grupo: ', error)
        } finally {
          setLoading(false)
        }
      }
    }
    carregaGrupo()
  }, [itemAtivo])

  const menuItems = ['Calendário', 'Membros', 'Eventos'];

  const content = [
    <GroupCalendar eventos={eventos} />,

    <GroupMemberEvents userEventos={userEventos} />,

    <View style={styles.contentItem}>
      <Text>Content for Item 3</Text>
    </View>,
  ];

  const handleMenuItemPress = (index) => {
    setItemAtivo(index);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#7839EE" />
        <Text style={styles.loadingText}>Carregando informações do grupo...</Text>
      </View>
    )
  }

  return (
    <SafeAreaProvider >
      <Appbar.Header style={styles.appBarHeader} statusBarHeight={16} mode='center-aligned'>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content titleStyle={{ fontSize: 16, fontWeight: 'bold' }} title={grupo.nome} />
      </Appbar.Header>

      <View style={styles.body}>

        <TouchableOpacity onPress={() => navigation.navigate('GroupDetails', { groupId: groupId })}>
          <View style={styles.groupName}>
            <Avatar.Text
              style={{ backgroundColor: '#F4F4F4' }}
              labelStyle={{ fontSize: 20 }}
              size={70}
              label={grupo.nome.split(' ').map(nome => nome[0].toUpperCase()).slice(0, 2).join('')}
              color="#9A9A9D"
            />

            <View style={{ flex: 1, alignItems: 'center', alignSelf: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                {grupo.nome}
              </Text>
              <Text style={{ fontSize: 15 }}>{(grupo.membros.length) + ' ' + (grupo.membros.length > 1 ? 'membros' : 'membro')}</Text>
            </View>
          </View>
        </TouchableOpacity>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingTop: 8
  },
  appBarHeader: {
    backgroundColor: '#fff',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1
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

export default GroupScreen;
