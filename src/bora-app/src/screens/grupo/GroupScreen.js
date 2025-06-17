import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Appbar, Avatar, Text, FAB } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GroupCalendar from './GroupCalendar';
import GroupMemberEvents from './GroupMemberEvents';
import GroupEvents from './GroupEvents';
import axios from 'axios';
import { API_IP } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ navigation, route }) => {
    const [userData, setUserData] = useState('')
    const [loadingUser, setLoadingUser] = useState(true)
    const { groupId } = route.params
    const [grupo, setGrupo] = useState([])
    const [loadingGrupo, setLoadingGrupo] = useState(true)
    const [eventos, setEventos] = useState([])
    const [loadingEventosUser, setLoadingEventosUser] = useState(true)
    const [itemAtivo, setItemAtivo] = useState(0)
    const [membrosGrupo, setMembrosGrupo] = useState([])
    const [membrosGrupoInfo, setMembrosGrupoInfo] = useState([])
    const [calendarEvents, setCalendarEvents] = useState([])
    const [loadingCalendar, setLoadingCalendar] = useState(true)

    //Carrega informações do usuário
    useEffect(() => {
        const loadUser = async () => {
            try {
                const userString = await AsyncStorage.getItem('usuario')
                if (userString) {
                    const user = JSON.parse(userString)
                    setUserData(user)
                }
            } catch (error) {
                console.error('Error ao puxar user: ', error)
            } finally {
                setLoadingUser(false)
            }
        }
        loadUser()
    }, [])

    // Carrega informações do grupo
    useEffect(() => {
        const carregaGrupo = async () => {

            let eventosGrupoData = []
            let grupoInfoData = null

            try {

                const grupoInfo = await axios.get(`${API_IP}/grupos/${groupId}`)

                const eventosGrupo = await axios.get(
                    `${API_IP}/eventos-grupo/by-grupoId/${groupId}`)

                const membrosGrupoResponse = await axios.get(
                    `${API_IP}/grupos/${groupId}/membros`)

                setGrupo(grupoInfo.data)
                setEventos(eventosGrupo.data)
                eventosGrupoData = eventosGrupo.data
                grupoInfoData = grupoInfo.data
                setMembrosGrupo(membrosGrupoResponse.data)

            } catch (error) {
                console.error('Erro ao buscar dados do grupo: ', error)
            } finally {
                setLoadingGrupo(false)
            }

            if (itemAtivo == 0) {

                try {
                    const todosEventosResponse = await axios.get(
                        `${API_IP}/eventos/todos-eventos/${groupId}`)

                    const todosEventos = todosEventosResponse.data

                    const eventosTransparentes = todosEventos['eventosIndividuais'].map((evento) => {
                        evento.selectedColor = 'transparent'
                        return evento
                    });

                    const eventosSomados = [...eventosTransparentes, ...todosEventos['eventosGrupo']]

                    const extrairData = (dateString) => {
                        const data = new Date(dateString)
                        return data.toISOString().split('T')[0]
                    }

                    const contagemDonosPorData = {};

                    todosEventos['eventosIndividuais'].forEach(evento => {
                        const data = extrairData(evento.dataEvento);

                        if (!contagemDonosPorData[data]) {
                            contagemDonosPorData[data] = new Set();
                        }

                        contagemDonosPorData[data].add(evento.donoId);
                    });

                    const contagemFinal = {};
                    for (const data in contagemDonosPorData) {
                        contagemFinal[data] = contagemDonosPorData[data].size;
                    }

                    const eventosCalendarFiltrados = eventosSomados.map((evento) => {
                        eventosGrupoData.some(eventoGrupo => extrairData(eventoGrupo.dataEvento) == extrairData(evento.dataEvento)) && delete evento.selectedColor
                        return evento
                    })

                    const eventosCalendar = eventosCalendarFiltrados.map(evento =>
                        evento.selectedColor ? {
                            ...evento,
                            selectedColor: (contagemFinal[extrairData(evento.dataEvento)] / grupoInfoData.membros.length) >= 0.5 ? '#E5879B' : '#EEB58C'
                        } : evento
                    )

                    setCalendarEvents(eventosCalendar)
                } catch (error) {
                    console.error('Erro ao buscar os eventos do calendário ', error)
                } finally {
                    setLoadingCalendar(false)
                }
            }

            if (itemAtivo == 1) {

                try {
                    const membrosGrupoInfoFormat = await Promise.all(membrosGrupo.map(async (membro) => {

                        try {

                            const eventosResponse = await axios.get(`${API_IP}/eventos-individuais/by-usuarioId/${membro.user._id}`)

                            const eventosDoMembro = eventosResponse.data;

                            const todosEventosUser = [...eventosDoMembro, ...eventos]

                            todosEventosUser.sort((a, b) => new Date(a.dataEvento) - new Date(b.dataEvento))

                            const eventosDoMembroFormat = todosEventosUser.map((evento) => {
                                return {
                                    id: evento._id,
                                    desseGrupo: evento.donoId == groupId,
                                    data: evento.dataEvento
                                }
                            })

                            return {
                                id: membro.user._id,
                                nome:
                                    membro.user._id == userData._id
                                        ? membro.user.name + ' (Você)'
                                        : membro.user.name,
                                role: membro.isAdmin ? 'Administrador' : 'Membro',
                                eventos: eventosDoMembroFormat,
                            }
                        } catch (error) {
                            console.log('Erro ao buscar eventos do usuário ', error)

                            return {
                                id: membro.user._id,
                                nome:
                                    membro.user._id == userData._id
                                        ? membro.user.name + ' (Você)'
                                        : membro.user.name,
                                role: membro.isAdmin ? 'Administrador' : 'Membro',
                                eventos: [],
                            }
                        }

                    }))
                    setMembrosGrupoInfo(membrosGrupoInfoFormat)
                } catch (error) {
                    console.log('Erro ao buscar informações de grupo ', error)
                } finally {
                    setLoadingEventosUser(false)
                }
            }
        }
        carregaGrupo()
    }, [itemAtivo, groupId])

    if (loadingUser || loadingGrupo) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#7839EE" />
                <Text style={styles.loadingText}>
                    Carregando informações do grupo...
                </Text>
            </View>
        )
    }

    const appBarHeader =
        <Appbar.Header style={styles.appBarHeader} mode="center-aligned">
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content
                titleStyle={styles.appBarTitle}
                title={grupo.nome}
            />
        </Appbar.Header>

    const groupNameArea =
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('GroupDetails', { groupId: groupId })
            }>
            <View style={styles.groupNameContainer}>
                <Avatar.Text
                    style={styles.avatarStyle}
                    labelStyle={styles.avatarLabelStyle}
                    size={70}
                    label={grupo.nome
                        .split(' ')
                        .map((nome) => nome[0].toUpperCase())
                        .slice(0, 2)
                        .join('')}
                    color="#9A9A9D"
                />

                <View style={styles.groupName}>
                    <Text style={styles.groupNameText}>
                        {grupo.nome}
                    </Text>
                    <Text style={styles.membrosText}>
                        {grupo.membros.length +
                            ' ' +
                            (grupo.membros.length > 1 ? 'membros' : 'membro')}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>

    const menuItems = ['Calendário', 'Membros', 'Eventos']

    const groupTabs =
        <View>
            <ScrollView
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

    const criarEventoButton =
        <>
            {grupo.grupoAdmins.includes(userData._id) &&
                <FAB
                    icon='plus'
                    style={styles.criarEventoButton}
                    color='white'
                    onPress={() =>
                        navigation.navigate('calendarEvent', {
                            screen: 'CreateEventScreen',
                            params: { groupId: groupId }
                        })}
                />}
        </>


    const content = [


        <>
            {!loadingCalendar ?
                <GroupCalendar eventos={eventos} qntMembrosGrupo={grupo.membros.length} calendarEvents={calendarEvents} /> :

                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#7839EE" />
                    <Text style={styles.loadingText}>
                        Carregando calendário...
                    </Text>
                </View>}
        </>,

        <>
            {!loadingEventosUser ?
                <GroupMemberEvents userEventos={membrosGrupoInfo} /> :

                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#7839EE" />
                    <Text style={styles.loadingText}>
                        Carregando informações dos membros do grupo...
                    </Text>
                </View>}
        </>,

        <GroupEvents eventos={eventos} qntMembrosGrupo={grupo.membros.length} />,
    ]

    const handleMenuItemPress = (index) => {
        setItemAtivo(index)
    }

    return (
        <SafeAreaProvider>

            {appBarHeader}

            <View style={styles.body}>

                {groupNameArea}

                {groupTabs}

                {content[itemAtivo]}

                {criarEventoButton}

            </View>
        </SafeAreaProvider>
    )
}

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
        paddingTop: 8,
    },
    appBarHeader: {
        backgroundColor: '#fff',
        borderBottomColor: '#EEEEEE',
        borderBottomWidth: 1,
    },
    appBarTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    groupNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingBottom: 8
    },
    avatarStyle: {
        backgroundColor: '#F4F4F4'
    },
    avatarLabelStyle: {
        fontSize: 20
    },
    groupName: {
        flex: 1,
        alignItems: 'center',
        alignSelf: 'center'
    },
    groupNameText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    membrosText: {
        fontSize: 15
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
    criarEventoButton: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: '#7839EE',
        borderRadius: 40
    }
})

