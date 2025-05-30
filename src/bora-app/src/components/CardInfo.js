import React from 'react';
import { StyleSheet, View } from 'react-native';



export default ({ children }) => {
    return (
        <View style={styles.card}>
            <View style={styles.borderAccent} />
            <View style={styles.cardContent}>
                {children}
            </View>
        </View>
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
        overflow: 'hidden'
    },
    borderAccent: {
        width: 8,
        backgroundColor: '#7839EE'
    },
    cardContent: {
        padding: 8
    }
})