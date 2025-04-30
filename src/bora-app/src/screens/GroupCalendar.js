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
            return data;
        }
    };

    const ehHoje = (date) => {
        return date.toDateString() === new Date().toDateString();
    }

    // Retorna os eventos do dia selecionado
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
            return <Text style={styles.txtBold}>Selecione uma data </Text>
        }

        const data = dataEditavel(dataSelecionada.dateString)
        const hoje = ehHoje(data)

        return hoje ? (
            <Text style={styles.txtBold}>Eventos de hoje</Text>
        ) : (
            <Text style={styles.txtBold}> Eventos do dia {data.toLocaleDateString('pt-Br', { day: 'numeric', month: 'short' })}</Text>
        )
    }

    const exibirCardList = ({ item }) => (
        <View key={item.id}>
            <CardInfo>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                    {item.titulo}
                </Text>

                {new Date(item.data).toDateString() == new Date().toDateString() ? (
                    <Text style={{ fontSize: 14, color: '#9A9A9D' }}> Hoje </Text>
                ):(
                    <Text style={{ fontSize: 14, color: '#9A9A9D' }}> {new Date(item.data).toLocaleDateString('pt-Br', {day:'numeric', month: 'numeric'})} </Text>
                )
            }
                
                <Text style={{ fontSize: 14, color: '#7839EE' }}>
                    {item.subtitulo}
                </Text>
            </CardInfo>
        </View>
    )

    useEffect(() => {
        cardInfo();
    }, [dataSelecionada]);

    return (
        <View style={{ flex: 1 }}>
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
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                />
            ) : (

                <CardInfo>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                        Sem eventos no dia
                    </Text>
                </CardInfo>



            )}
        </View>
    );
};

const styles = StyleSheet.create({
    txtBold: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
