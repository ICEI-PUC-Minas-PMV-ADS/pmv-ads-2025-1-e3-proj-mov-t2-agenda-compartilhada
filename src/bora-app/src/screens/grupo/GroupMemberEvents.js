import React from 'react';
import MemberCard from '../../components/MemberCard';
import { ScrollView, StyleSheet } from 'react-native';

export default ({ userEventos }) => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollViewStyle}>
            {userEventos.map((usuario) => (
                <MemberCard
                    key={usuario.id}
                    nome={usuario.nome}
                    role={usuario.role}
                    eventos={usuario.eventos}
                />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scrollViewStyle: {
        marginHorizontal: -8,
    },
})
