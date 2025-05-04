import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, ScrollView, View } from 'react-native';
import CalendarComp from '../components/CalendarComp';
import { Text, List } from 'react-native-paper';
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
            data.setMinutes(data.getMinutes() + data.getTimezoneOffset());
            return data;
        }
    };

    const ehHoje = (date) => {
        return date.toDateString() === new Date().toDateString();
    }

    // Retorna os eventos do dia selecionado, para serem exibidos nos cards
    const cardInfo = () => {
        if (!dataSelecionada) {
            return [];
        } else {
            const eventosCard = eventos.filter(
                (evento) => evento.data === dataSelecionada.dateString
            );
            return eventosCard;
        }
    };

    const exibeLabelDiaSelecionado = () => {
        if (!dataSelecionada) {
            return <Text style={styles.txtLabelDiaSelecionado}>Selecione uma data </Text>
        }

        const data = dataEditavel(dataSelecionada.dateString)
        const hoje = ehHoje(data)

        return hoje ? (
            <Text style={styles.txtLabelDiaSelecionado}>Eventos de hoje</Text>
        ) : (
            <Text style={styles.txtLabelDiaSelecionado}> Eventos do dia {data.toLocaleDateString('pt-Br', {
                day: 'numeric',
                month: 'short'
            })}
            </Text>
        )
    }

    const exibirCardList = ({ item }) => (
        <View key={item.id}>
            <CardInfo>
                <Text style={styles.cardTitulo}>
                    {item.titulo}
                </Text>
                {ehHoje(dataEditavel(item.data)) ? (
                    <Text style={styles.dataEventoCard}> Hoje </Text>
                ) : (
                    <Text style={styles.dataEventoCard}> {dataEditavel(item.data).toLocaleDateString('pt-Br', {
                        day: 'numeric',
                        month: 'numeric'
                    })}
                    </Text>
                )
                }

                <Text style={styles.cofirmadosEventoCard}>
                    {item.subtitulo}
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
                        keyExtractor={evento => evento.id}
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
