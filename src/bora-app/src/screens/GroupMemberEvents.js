import React from 'react';
import MemberCard from '../components/MemberCard';
import { ScrollView } from 'react-native';


export default ({ userEventos }) => {

    return (

        <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginHorizontal: -8 }}>
        {userEventos.map( usuario =>
            <MemberCard
                key={usuario.id}
                nome={usuario.nome}
                role={usuario.role}
                eventos={usuario.eventos} />
            )}
        </ScrollView>

    );
};
