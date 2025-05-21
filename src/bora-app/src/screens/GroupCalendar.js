import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import CalendarComp from '../components/CalendarComp'
import { Text } from 'react-native-paper';
import CardInfo from '../components/CardInfo';
import { dataEditavel, ehHoje } from '../utils/dateUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default ({ eventos }) => {


    const [username, setUsername] = useState('')
const [loading, setLoading] = useState(true)

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
                setLoading(false)
            }
        }
        loadUser();
    }, [])

    if (!loading) {
        console.log(username)
    }

    // Controla datas selecionadas no calendário
    const [dataSelecionada, setDataSelecionada] = useState();

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
