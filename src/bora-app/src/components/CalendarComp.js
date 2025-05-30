import React from 'react';
import { StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ptBR } from '../utils/localeCalenderConfig';
import { Feather } from '@expo/vector-icons';

LocaleConfig.locales['pt-BR'] = ptBR
LocaleConfig.defaultLocale = 'pt-BR'

export default ({ eventos = [], ...props }) => {
    // Exibe pontos e marca a data no calendário de eventos do grupo
    const datasEventos = eventos.reduce((acum, evento) => {
        const dataEvento = new Date(evento.dataEvento).toLocaleDateString('sv-SE')
        if (!acum[dataEvento]) {
            acum[dataEvento] = { selected: true, dots: [] }
        }

        acum[dataEvento].dots.length < 5
            ? acum[dataEvento].dots.push({
                key: evento._id ?? ''.toString(),
                color: 'transparent',
            })
            : null

        acum[dataEvento].dots.length > 1
            ? acum[dataEvento].dots.forEach((dot) => {
                dot.color = '#55EE39'
            })
            : null

        return acum
    }, {})

    return (
        <Calendar
            markedDates={datasEventos}
            markingType={'multi-dot'}
            hideExtraDays
            renderArrow={(direction) => (
                <Feather size={24} name={`chevron-${direction}`} color={'#7839EE'} />
            )}
            theme={styles.calendarTheme}
            {...props}
        />
    )
}

const styles = StyleSheet.create({
    calendarTheme: {
        calendarBackground: 'transparent',
        textMonthFontSize: 20,
        textSectionTitleColor: '#9A9A9D',
        textDayHeaderFontWeight: 'bold',
        textDayHeaderFontSize: 16,
        selectedDayBackgroundColor: '#7839EE',
        todayTextColor: '#7839EE',
        arrowColor: '#7839EE',
    },
})
