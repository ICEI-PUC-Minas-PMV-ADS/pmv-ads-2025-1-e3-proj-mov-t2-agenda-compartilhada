import React from "react";
import { Calendar } from "react-native-calendars";

export default CalendarComp => {
    return (
        <Calendar
            style={{ backgroundColor: 'transparent', paddingVertical: 10 }}
            theme={{
                calendarBackground: 'transparent',
                textMonthFontSize: 12
            }}
        />
    );
}