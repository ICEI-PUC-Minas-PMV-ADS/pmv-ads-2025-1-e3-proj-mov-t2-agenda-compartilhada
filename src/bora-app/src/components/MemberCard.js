import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Avatar, Text } from 'react-native-paper';
import { dataEditavel } from '../utils/dateUtils';


export default ({ nome, role, eventos }) => {
    return (
        <View style={{ marginVertical: 8 }}>
            <View style={{ flexDirection: 'row' }}>

                <View style={{ width: '24%', marginLeft: 4 }}>
                    <Avatar.Text
                        style={{ backgroundColor: '#F4F4F4' }}
                        labelStyle={{ fontSize: 20 }}
                        size={60}
                        label={nome[0].toUpperCase()}
                        color="#9A9A9D"
                    />
                </View>

                <View style={{ alignSelf: 'center' }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
                        {nome}
                    </Text>
                    <Text style={{ fontSize: 14, color: '#9A9A9D' }}>
                        {role}
                    </Text>
                </View>
            </View>
            
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginVertical: 8,
                        marginTop: 8,
                        gap: 8,
                    }}>

                    {eventos.map(evento =>
                        <Text
                            key={evento.id}
                            style={{
                                fontSize: 13,
                                color: '#7839EE',
                                backgroundColor: '#F1EBFD',
                                borderRadius: 25,
                                borderWidth: 10,
                                borderColor: '#F1EBFD',
                                minWidth: 60,
                                textAlign: 'center',
                                marginHorizontal: 4
                            }}>
                            {dataEditavel(evento.data).toLocaleDateString('pt-Br', {
                                day: 'numeric',
                                month: 'numeric'
                            })}
                        </Text>
                    )}
                </View>

                {/* <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    marginVertical: 8,
                    marginTop: 8,
                    gap: 8,
                }}>

                <Text
                    style={{
                        fontSize: 13,
                        color: '#7839EE',
                        backgroundColor: '#F1EBFD',
                        borderRadius: 25,
                        borderWidth: 10,
                        borderColor: '#F1EBFD',
                        minWidth: 60,
                        textAlign: 'center',
                        marginHorizontal:4
                    }}>
                    Hoje
                </Text>
                <Text
                    style={{
                        fontSize: 13,
                        color: '#9A9A9D',
                        backgroundColor: '#F4F4F4',
                        borderRadius: 25,
                        borderWidth: 10,
                        borderColor: '#F4F4F4',
                        minWidth: 60,
                        textAlign: 'center',
                        marginHorizontal:4
                    }}>
                    27/04
                </Text>
                <Text
                    style={{
                        fontSize: 13,
                        color: '#7839EE',
                        backgroundColor: '#F1EBFD',
                        borderRadius: 25,
                        borderWidth: 10,
                        borderColor: '#F1EBFD',
                        minWidth: 60,
                        textAlign: 'center',
                        marginHorizontal:4
                    }}>
                    30/04
                </Text>
                <Text
                    style={{
                        fontSize: 13,
                        color: '#7839EE',
                        backgroundColor: '#F1EBFD',
                        borderRadius: 25,
                        borderWidth: 10,
                        borderColor: '#F1EBFD',
                        minWidth: 60,
                        textAlign: 'center',
                        marginHorizontal:4
                    }}>
                    05/05
                </Text>
                <Text
                    style={{
                        fontSize: 13,
                        color: '#9A9A9D',
                        backgroundColor: '#F4F4F4',
                        borderRadius: 25,
                        borderWidth: 10,
                        borderColor: '#F4F4F4',
                        minWidth: 60,
                        textAlign: 'center',
                        marginHorizontal:4
                    }}>
                    06/05
                </Text>
                <Text
                    style={{
                        fontSize: 13,
                        color: '#9A9A9D',
                        backgroundColor: '#F4F4F4',
                        borderRadius: 25,
                        borderWidth: 10,
                        borderColor: '#F4F4F4',
                        minWidth: 60,
                        textAlign: 'center',
                        marginHorizontal:4
                    }}>
                    06/05
                </Text>
                <Text
                    style={{
                        fontSize: 13,
                        color: '#9A9A9D',
                        backgroundColor: '#F4F4F4',
                        borderRadius: 25,
                        borderWidth: 10,
                        borderColor: '#F4F4F4',
                        minWidth: 60,
                        textAlign: 'center',
                        marginHorizontal:4
                    }}>
                    06/05
                </Text>
                <Text
                    style={{
                        fontSize: 13,
                        color: '#9A9A9D',
                        backgroundColor: '#F4F4F4',
                        borderRadius: 25,
                        borderWidth: 10,
                        borderColor: '#F4F4F4',
                        minWidth: 60,
                        textAlign: 'center',
                        marginHorizontal:4
                    }}>
                    06/05
                </Text>
                <Text
                    style={{
                        fontSize: 13,
                        color: '#9A9A9D',
                        backgroundColor: '#F4F4F4',
                        borderRadius: 25,
                        borderWidth: 10,
                        borderColor: '#F4F4F4',
                        minWidth: 60,
                        textAlign: 'center',
                        marginHorizontal:4
                    }}>
                    06/05
                </Text>
                <Text
                    style={{
                        fontSize: 13,
                        color: '#7839EE',
                        backgroundColor: '#F1EBFD',
                        borderRadius: 25,
                        borderWidth: 10,
                        borderColor: '#F1EBFD',
                        minWidth: 60,
                        textAlign: 'center',
                        marginHorizontal:4
                    }}>
                    06/05
                </Text>

            </View> */}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        margin: 8,
        marginVertical: 10,
        backgroundColor: '#fff',
        borderLeftColor: '#7839EE',
        borderTopColor: '#EEEEEE',
        borderRightColor: '#EEEEEE',
        borderBottomColor: '#EEEEEE',
        borderStyle: 'solid',
        borderLeftWidth: 11.8,
        borderTopWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },
    cardContent: {
        margin: 8
    }
})