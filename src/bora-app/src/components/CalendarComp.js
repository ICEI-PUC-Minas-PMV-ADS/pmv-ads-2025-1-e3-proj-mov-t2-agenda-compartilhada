import React from "react";
import { StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";

export default ( {eventos = [], ...props} ) => {
    
    // Exibe pontos e marca a data no calendário de eventos do grupo
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
            markedDates={ datasEventos }
            theme={styles.calendarTheme}
            markingType={'multi-dot'}

            {...props}
        />
    );
}

const styles = StyleSheet.create({
    calendarTheme: {
        calendarBackground: 'transparent',
        textMonthFontSize: 12
    }
})