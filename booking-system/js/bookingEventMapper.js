/**************************************************
 * bookingEventMapper.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Converts Firestore bookings into
 * FullCalendar events.
 **************************************************/

/**************************************************
 * Convert Firebase Timestamp to Date
 **************************************************/
function convertToDate(value) {

    if (!value) return null;

    if (typeof value.toDate === "function") {
        return value.toDate();
    }

    return new Date(value);

}

/**************************************************
 * Convert booking to calendar event
 **************************************************/
export function bookingToCalendarEvent(booking) {

    return {

        id: booking.id,

        title: "Booked",

        start: convertToDate(booking.start),

        end: convertToDate(booking.end)

    };

}