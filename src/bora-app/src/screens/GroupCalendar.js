import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ScrollView, View } from 'react-native';
import CalendarComp from '../components/CalendarComp';
import { Text } from 'react-native-paper';
import CardInfo from '../components/CardInfo';
import { DateData, todayString } from 'react-native-calendars';

export default ({ eventos }) => {
    // Controla datas selecionadas no calendário
    const [dataSelecionada, setDataSelecionada] = useState();

    // Converte data para ser manipulável
    const dataEditavel = (dateString) => {
        if (!dateString) {
            return null;
        } else {
            const data = new Date(dateString);
            return data;
        }
    };

    // Retorna os eventos do dia selecionado
    const cardInfo = () => {
        if (!dataSelecionada) {
            return [];
        } else {
            const eventosCard = eventos.filter(
                (evento) => evento.data === dataSelecionada.dateString
            );
            console.log(eventosCard);
            return eventosCard;
        }
    };

    useEffect(() => {
        cardInfo();
    }, [dataSelecionada]);

    return (
            <>
                <CalendarComp
                    eventos={eventos}
                    onDayPress={(data) => {
                        setDataSelecionada(data);
                    }}
                />

                {/* Verifica se tem data selecionada */}
                {dataSelecionada ? (
                    <Text style={styles.txtBold}>
                        Eventos do dia{' '}
                        {dataEditavel(dataSelecionada.dateString).toLocaleDateString(
                            'pt-Br',
                            { day: 'numeric', month: 'short' }
                        )}
                    </Text>
                ) : (
                    <Text style={styles.txtBold}>Selecione uma data </Text>
                )}

                
                <ScrollView>
                    {cardInfo().length > 0 ? (
                        cardInfo().map((evento) => (
                            <CardInfo key={evento.id}>
                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                                    {evento.titulo}
                                </Text>
                                <Text style={{ fontSize: 14, color: '#9A9A9D' }}>
                                    {evento.data}
                                </Text>
                                <Text style={{ fontSize: 14, color: '#7839EE' }}>
                                    {evento.subtitulo}
                                </Text>
                            </CardInfo>
                        ))
                    ) : (
                        <CardInfo>
                            <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                                Sem eventos no dia
                            </Text>
                        </CardInfo>
                    )}
                </ScrollView>
            </>
    );
};

const styles = StyleSheet.create({
    txtBold: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    menuContainer: {
        flex: 1,
    },
});
