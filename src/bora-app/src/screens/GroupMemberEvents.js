import React from 'react';
import MemberCard from '../components/MemberCard';


export default ({ userEventos }) => {

    return (

        userEventos.map( usuario => 
           <MemberCard 
           key={usuario.id}
           nome={usuario.nome}
           role={usuario.role}
           eventos={usuario.eventos}/>
        )

    );
};
