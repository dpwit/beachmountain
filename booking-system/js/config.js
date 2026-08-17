/**************************************************
 * config.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Stores application-wide configuration settings.
 *
 * Author: <Your Name>
 **************************************************/

export const APP_CONFIG = {

    business: {

        name: "Your Business Name",

        email: "bookings@yourbusiness.co.uk",

        phone: "01234 567890"

    },

    calendar: {

        initialView: 'timeGridWeek',
        /* remove hiddenDays to display ALL days */
        hiddenDays: [1,2,3,4,5],
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },

        firstDay: 1,

        weekends: true,

        selectable: true,

        nowIndicator: true,

        slotDuration: "02:00:00",

        slotMinTime: "09:00:00",

        slotMaxTime: "18:30:00"

    },

    booking: {

        defaultDuration: 120,

        allowOverlapping: false

    }

};