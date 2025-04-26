import React from 'react'
import { StyleSheet } from 'react-native'
import CalendarComp from '../components/CalendarComp';
import { Text } from 'react-native-paper';
import CardInfo from '../components/CardInfo';



export default ({ date }) => {
    return (
        <>
            <CalendarComp />

            <Text style={{ fontSize: 20, fontWeight: 'bold' }} >{date}</Text>

            <CardInfo>
                <Text style={{ fontSize: 17, fontWeight: 'bold' }} >Hoje</Text>
                <Text style={{ fontSize: 14, color: '#9A9A9D' }} >Hoje, 19:00 - 21:00</Text>
                <Text style={{ fontSize: 14, color: '#7839EE' }} >5/5 confirmados</Text>
            </CardInfo>
        </>
    );
}

const styles = StyleSheet.create({
    txtBold: {
        fontSize: 20,
        fontWeight: 'bold'
    },
})