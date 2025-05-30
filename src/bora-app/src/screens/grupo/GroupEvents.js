import React, { useState, useRef, useEffect } from 'react';
import { Appbar, Avatar, Text, Card } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, View, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import GroupCalendar from './GroupCalendar'
import GroupMemberEvents from './GroupMemberEvents';
import axios from 'axios'
import { API_IP } from '@env';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardInfo from '../../components/CardInfo';
import { ehHoje, dataEditavel } from '../../utils/dateUtils';

const GroupEvents = ({ eventos, qntMembrosGrupo }) => {

    const [itemAtivo, setItemAtivo] = useState(0);
    const menuItems = ['Todos', 'Próximos', 'Passados'];

    const geraLabelMes = (dataEvento) => {
        const labelData = dataEditavel(dataEvento).toLocaleDateString('pt-BR', {
            month: 'short',
            year: 'numeric'
        })
        return labelData.replace(/^\w/, letra => letra.toUpperCase())
    }

    const processarEventos = () => {
        const eventosAgrupados = []
        let mesAnterior = ''

        eventos.forEach(evento => {
            const mesAtual = geraLabelMes(evento.dataEvento)

            if (mesAtual !== mesAnterior) {
                eventosAgrupados.push({
                    uso: 'cabecalho',
                    _id: mesAtual,
                    label: mesAtual
                })
                mesAnterior = mesAtual
            }

            eventosAgrupados.push({
                uso: 'evento',
                confirmadosPorEvento: `${evento.confirmados.length}/${qntMembrosGrupo}`,
                ...evento
            })
        })
        return eventosAgrupados
    }

    const exibirCardList = ({ item: evento }) => (
        evento.uso === 'cabecalho' ?
            <Text style={styles.labelMes}>
                {evento.label}
            </Text>
            :
            <CardInfo>
                <Text style={styles.cardTitulo}>
                    {evento.titulo}
                </Text>
                {ehHoje(dataEditavel(evento.dataEvento)) ? (
                    <Text style={styles.dataEventoCard}> Hoje </Text>
                ) : (
                    <Text style={styles.dataEventoCard}> {dataEditavel(evento.dataEvento).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit'
                    })}
                    </Text>
                )
                }

                <Text style={styles.confirmadosEventoCard}>
                    {evento.confirmadosPorEvento} confirmados
                </Text>
            </CardInfo>
    )

    const content = [
        <FlatList
            data={processarEventos()}
            renderItem={exibirCardList}
            keyExtractor={evento => evento._id}
            showsVerticalScrollIndicator={false}
        />,

        <Text>Tela 2</Text>,

        <Text>Tela 3</Text>,
    ];

    const handleMenuItemPress = (index) => {
        setItemAtivo(index);
    };


    return (
        <View style={styles.container}>


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

                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>


            {content[itemAtivo]}

        </View>
    );
}

const styles = StyleSheet.create({
    menuContainer: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 8,
        paddingHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16
    },
    menuText: {
        backgroundColor: '#F4F4F4',
        fontSize: 17,
        color: '#9A9A9D',
        borderRadius: 32,
        paddingHorizontal: 24,
        paddingVertical: 8
    },
    activeMenuText: {
        color: '#fff',
        backgroundColor: '#7839EE'
    },
    labelMes: {
        fontSize: 19,
        fontWeight: 'bold'
    },
    container: {
        flex: 1
    },
    cardTitulo: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    dataEventoCard: {
        fontSize: 14,
        color: '#9A9A9D'
    },
    confirmadosEventoCard: {
        fontSize: 14,
        color: '#7839EE'
    },
    container: {
        flex: 1
    }
});

export default GroupEvents;