import React from "react";
import { Calendar } from "react-native-calendars";

export default ( {eventos = [], ...props} ) => {
    
    // Exibe pontos para cada evento na data
    const datasEventos = eventos.reduce((acum, evento) => {
        const { data } = evento;
        if (!acum[data]) {
          acum[data] = { selected: true, dots: [] };
        }
        acum[data].dots.push({ key: evento.id.toString(), color: 'white' });
        return acum;
      }, {});
    
    

    return (
        
        <Calendar
            style={{ backgroundColor: 'transparent'}}
            markedDates={ datasEventos }
            theme={{
                calendarBackground: 'transparent',
                textMonthFontSize: 12
            }}
            markingType={'multi-dot'}

            {...props}
        />
    );
}