import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { API_IP } from '@env';
import { ehHoje, dataEditavel } from '../utils/dateUtils';
import { Text } from 'react-native-paper';
import EventoModal from './EventoModal';

export default ({ evento = {}, children }) => {

    const [grupo, setGrupo] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const eventoValido = evento && evento.titulo

    useEffect(() => {
        if (evento.tipo === 'grupo') {
            const carregaGrupo = async () => {
                try {
                    const grupoInfo = await axios.get(`${API_IP}/grupos/${evento.donoId}`)
                    setGrupo(grupoInfo.data)
                } catch (error) {
                    console.error('Erro ao buscar dados do grupo do evento: ', error)
                }
            }
            carregaGrupo()
        }
    }, [evento]);

    return (
        <>
            <TouchableOpacity
                onPress={() => setShowModal(true)}
                disabled={!eventoValido}
                style={styles.card}>
                    <View style={styles.borderAccent} />
                    <View style={[styles.cardContent, { flex: 1 }]}>
                        {children || (
                            eventoValido && (
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                                        {ehHoje(dataEditavel(evento.dataEvento)) ? (
                                            <Text style={styles.dataEventoCard}>
                                                Hoje
                                                {' - '}
                                                {dataEditavel(evento.dataEvento).toLocaleTimeString('pt-BR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </Text>
                                        ) : (
                                            <Text style={styles.dataEventoCard}>
                                                {dataEditavel(evento.dataEvento).toLocaleDateString('pt-BR', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                })}
                                                {',  '}
                                                {dataEditavel(evento.dataEvento).toLocaleTimeString('pt-BR', {
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                            </Text>
                                        )}
                                        <Text style={styles.cardTitulo}>{evento.titulo}</Text>
                                        {grupo && <Text style={styles.eventGroup}>{grupo.nome}</Text>}
                                    </View>


                                    <View style={styles.participantsCircle}>
                                        <Text style={styles.participantsCount}>{evento.confirmados.length}</Text>
                                    </View>
                                </View>
                            ))}
                    </View>
            </TouchableOpacity>

            <EventoModal
                id={evento._id}
                titulo={evento.titulo}
                descricao={evento.descricao ? evento.descricao : 'Sem descrição'}
                dataEvento={evento.dataEvento}
                dataFimEvento={evento.dataFimEvento}
                tipo={evento.tipo}
                membros={evento.membros}
                confirmados={evento.confirmados}
                recusas={evento.recusas}
                visibilidade={showModal}
                onClose={() => setShowModal(false)} />
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        margin: 8,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: 16,
        flexDirection: 'row',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 1,
    },
    borderAccent: {
        width: 8,
        backgroundColor: '#7839EE'
    },
    cardContent: {
        padding: 8
    },
    dataEventoCard: {
        fontSize: 14,
        color: '#9A9A9D',
    },
    cardTitulo: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    eventGroup: {
        fontSize: 12,
        color: '#9A9A9D',
    },
    participantsCircle: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: '#F4F4F4',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginRight: 15,
    },
    participantsCount: {
        fontSize: 12,
        color: '#9A9A9D',
        fontWeight: '500',
    },
})