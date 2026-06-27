/**************************************************
 * calendar.js
 *
 * Handles all FullCalendar functionality.
 **************************************************/

export function createCalendar(calendarElement, bookings) {

    const events = bookings.map((booking) => ({

        id: booking.id,

        title:
            booking.customerName +
            " - " +
            booking.serviceRequired,

        start: booking.start,

        end: booking.end

    }));

    const calendar = new FullCalendar.Calendar(
        calendarElement,
        {

            initialView: 'timeGridWeek',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },

            selectable: true,

            events: events

        }
    );

    calendar.render();

    return calendar;

}