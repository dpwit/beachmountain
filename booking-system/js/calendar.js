/**************************************************
 * calendar.js
 *
 * Handles all FullCalendar functionality.
 **************************************************/
import { APP_CONFIG } from "./config.js";
import { formatBookingTitle } from "./utils.js";

export function createCalendar(calendarElement, bookings) {

    const events = bookings.map((booking) => ({

        id: booking.id,

        title: formatBookingTitle(booking),

        start: booking.start,

        end: booking.end

    }));

    const calendar = new FullCalendar.Calendar(
        calendarElement,
        {

            initialView: APP_CONFIG.calendar.initialView,
            firstDay: APP_CONFIG.calendar.firstDay,

            weekends: APP_CONFIG.calendar.weekends,
            headerToolbar: APP_CONFIG.calendar.headerToolbar,

            selectable: APP_CONFIG.calendar.selectable,
            nowIndicator: APP_CONFIG.calendar.nowIndicator,
            slotDuration: APP_CONFIG.calendar.slotDuration,
            slotMinTime: APP_CONFIG.calendar.slotMinTime,
            slotMaxTime: APP_CONFIG.calendar.slotMaxTime,   

            events: events

        }
    );

    calendar.render();

    return calendar;

}