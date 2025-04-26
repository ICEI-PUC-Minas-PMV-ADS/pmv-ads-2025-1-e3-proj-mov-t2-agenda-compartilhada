import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Card } from 'react-native-paper';



export default ({ children }) => {
    return (
        <Card style={styles.card} mode='contained'>
            <View style={{ margin: 15 }}>
                {children}
            </View>
        </Card>
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
})