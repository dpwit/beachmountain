/**************************************************
 * bookingEventMapper.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Converts Firestore bookings into
 * FullCalendar events.
 **************************************************/

import { isBookingOwner } from "./services/permissionService.js";

function getBookingTitle(
    booking
) {

    if (
        isBookingOwner(booking)
    ) {

        return "My Appointment";

    }

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

        end: convertToDate(booking.end),

        extendedProps: {

        userId: booking.userId,
        customerName: booking.customerName,
        customerEmail: booking.customerEmail,
        customerPhone: booking.customerPhone,
        serviceRequired: booking.serviceRequired,
        customerNotes: booking.customerNotes
    }

    };

}