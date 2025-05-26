import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import CalendarComp from '../components/CalendarComp'
import { Text } from 'react-native-paper';
import CardInfo from '../components/CardInfo';
import { dataEditavel, ehHoje } from '../utils/dateUtils';

export default ({ eventos }) => {

    // Controla datas selecionadas no calendário
    const [dataSelecionada, setDataSelecionada] = useState('');

    const exibeLabelDiaSelecionado = () => {
        if (!dataSelecionada) {
            return <Text style={styles.txtLabelDiaSelecionado}>Selecione uma data </Text>
        }

        const data = dataEditavel(dataSelecionada.dateString)
        const hoje = ehHoje(data)

        return hoje ? (
            <Text style={styles.txtLabelDiaSelecionado}>Eventos de hoje</Text>
        ) : (
            <Text style={styles.txtLabelDiaSelecionado}> Eventos do dia {data.toLocaleDateString('pt-BR', {
                day: 'numeric',
                month: 'short'
            })}
            </Text>
        )
    }

    // Retorna os eventos do dia selecionado, para serem exibidos nos cards
    const cardInfo = () => {
        if (!dataSelecionada) return []
        return eventos.filter((evento) => 
            new Date(evento.dataEvento).toLocaleDateString('sv-SE') == new Date(dataEditavel(dataSelecionada.dateString)).toLocaleDateString('sv-SE')
    )}

    const exibirCardList = ({ item: evento }) => (
        <View key={evento.id}>
            <CardInfo>
                <Text style={styles.cardTitulo}>
                    {evento.titulo}
                </Text>
                {ehHoje(dataEditavel(evento.dataEvento)) ? (
                    <Text style={styles.dataEventoCard}> Hoje </Text>
                ) : (
                    <Text style={styles.dataEventoCard}> {dataEditavel(evento.dataEvento).toLocaleDateString('pt-BR', {
                        day: 'numeric',
                        month: 'numeric'
                    })}
                    </Text>
                )
                }

                <Text style={styles.cofirmadosEventoCard}>
                    {evento.subtitulo}
                </Text>
            </CardInfo>
        </View>
    )

    // Associa CardInfo a dataSelecionada para evitar desync
    useEffect(() => {
        cardInfo();
    }, [dataSelecionada]);


    return (

        <View style={styles.container}>

            <View>
                <CalendarComp
                    eventos={eventos}
                    onDayPress={(data) => {
                        setDataSelecionada(data);
                    }}
                />
            </View>

            <View>
                {exibeLabelDiaSelecionado()}
            </View>

                {cardInfo().length > 0 ? (
                    <FlatList
                        data={cardInfo()}
                        renderItem={exibirCardList}
                        keyExtractor={evento => evento._id}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <CardInfo>
                        <Text style={styles.cardTitulo}>
                            Sem eventos no dia
                        </Text>
                    </CardInfo>
                )}

        </View>
    );
};

const styles = StyleSheet.create({
    txtLabelDiaSelecionado: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 8
    },
    cardTitulo: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    dataEventoCard: {
        fontSize: 14,
        color: '#9A9A9D'
    },
    cofirmadosEventoCard: {
        fontSize: 14,
        color: '#7839EE'
    },
    container: {
        flex: 1
    }
});
