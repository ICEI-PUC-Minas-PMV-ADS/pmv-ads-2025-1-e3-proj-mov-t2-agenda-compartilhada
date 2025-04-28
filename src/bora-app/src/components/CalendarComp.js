import React from "react";
import { Calendar } from "react-native-calendars";

export default ( {eventos = []} ) => {


    const dot1 = {key: 'a', color: 'white'}
    const dot2 = {key: 'b', color: 'white'}
    const dot3 = {key: 'c', color: 'white'}
    
    const datasEventos = eventos.reduce((acum, evento) => {
        acum[evento.data] = { selected: true, dots: [dot1, dot2, dot3] };
        return acum;
      }, {});
    

    return (
        <Calendar
            style={{ backgroundColor: 'transparent', paddingVertical: 10 }}
            markedDates={ datasEventos }
            theme={{
                calendarBackground: 'transparent',
                textMonthFontSize: 12
            }}
            markingType={'multi-dot'}
        />
    );
}