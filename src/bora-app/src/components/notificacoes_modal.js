import { View, Text, StyleSheet, TouchableOpacity } from "react-native"


export function ModalNotificacoes({ title, message, date, handleClose}) {
    return(
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.messageView}>
                <Text style={styles.messageText}>{message}</Text>
            </View>
            <View style={styles.dateView}>
                <Text style={styles.dateText}>{date}</Text>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>
        </View>
    )    
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    titleView: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    messageView: {
        width: '100%',
        backgroundColor: '#f5f5f5',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 10
    },
    dateView: {
        width: '100%',
        textAlign: 'left'
    },
    titleText: {
        fontWeight: 'bold'
    },
    messageText: {
        textAlign: 'justify'
    },
    dateText: {
        textAlign: 'right',
        fontSize: 14,
        color: '#666',
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: '#712fe5',
        padding: 10,
        borderRadius: 8,
        alignSelf: 'flex-end',
    },
    closeButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})