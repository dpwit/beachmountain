/**************************************************
 * bookingEventMapper.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Converts Firestore bookings into
 * FullCalendar events.
 **************************************************/

import { getCurrentUser } from "./userSession.js";

function getBookingTitle(booking) {

    const user = getCurrentUser();

    // Nobody logged in
    if (!user) {
        return "Booked";
    }

    // Owner of this booking
    if (booking.userId === user.uid) {
        return "My Appointment";
    }

    // Everyone else's booking
    return "Booked";
}

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

        title: getBookingTitle(booking),

        start: convertToDate(booking.start),

        end: convertToDate(booking.end)

    };

}