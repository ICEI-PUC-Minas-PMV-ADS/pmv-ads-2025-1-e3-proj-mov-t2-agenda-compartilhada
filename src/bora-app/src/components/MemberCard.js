import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import { dataEditavel } from '../utils/dateUtils';

export default ({ nome, role, eventos }) => {
    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <View style={styles.avatarPosition}>
                    <Avatar.Text
                        style={styles.avatar}
                        labelStyle={styles.avatarLableStyle}
                        size={60}
                        label={nome[0].toUpperCase()}
                    />
                </View>

                <View style={styles.userTextPosition}>
                    <Text style={styles.userNameText}>{nome}</Text>
                    <Text style={styles.userRoleText}>{role}</Text>
                </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.eventsDatePosition}>
                    {eventos.map((evento) => (
                        <Text
                            key={evento.id}
                            style={[
                                styles.eventsDate,
                                evento.desseGrupo
                                    ? styles.eventsDateInGroup
                                    : styles.eventsDateOutGroup,
                            ]}>
                            {dataEditavel(evento.data).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                            })}
                        </Text>
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    cardContent: {
        margin: 8,
    },
    userInfo: {
        flexDirection: 'row',
    },
    avatarPosition: {
        width: '24%',
        marginLeft: 4,
    },
    avatar: {
        backgroundColor: '#F4F4F4',
    },
    avatarLableStyle: {
        fontSize: 20,
        color: '#9A9A9D',
    },
    userTextPosition: {
        alignSelf: 'center',
    },
    userNameText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    userRoleText: {
        fontSize: 14,
        color: '#9A9A9D',
    },
    eventsDatePosition: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginVertical: 8,
        marginTop: 8,
        gap: 8,
    },
    eventsDate: {
        fontSize: 13,
        borderRadius: 25,
        borderWidth: 10,
        minWidth: 60,
        textAlign: 'center',
        marginHorizontal: 4,
    },
    eventsDateInGroup: {
        color: '#7839EE',
        backgroundColor: '#F1EBFD',
        borderColor: '#F1EBFD',
    },
    eventsDateOutGroup: {
        color: '#9A9A9D',
        backgroundColor: '#F4F4F4',
        borderColor: '#F4F4F4',
        textAlign: 'center',
    },
})
