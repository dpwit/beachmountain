import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

const calendarEl = document.getElementById('calendar');
const calendar = new Calendar(calendarEl, {
  plugins: [ dayGridPlugin, interactionPlugin ],
  initialView: 'dayGridMonth'
});
calendar.render();

export default Calendar;
