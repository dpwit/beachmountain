/**************************************************
 * utils.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Reusable helper functions used throughout
 * the application.
 *
 * Author: <Your Name>
 **************************************************/


/**************************************************
 * Build a calendar event title
 **************************************************/
export function formatBookingTitle(booking) {

    return `${booking.customerName} - ${booking.serviceRequired}`;

}


/**************************************************
 * Format a JavaScript Date
 *
 * Example:
 * 21 July 2026
 **************************************************/
export function formatDate(date) {

    return new Intl.DateTimeFormat("en-GB", {

        day: "numeric",

        month: "long",

        year: "numeric"

    }).format(date);

}


/**************************************************
 * Format a time
 *
 * Example:
 * 09:30
 **************************************************/
export function formatTime(date) {

    return new Intl.DateTimeFormat("en-GB", {

        hour: "2-digit",

        minute: "2-digit",

        hour12: false

    }).format(date);

}


/**************************************************
 * Generate a unique booking reference
 *
 * Example:
 * BK-20260704-4821
 **************************************************/
export function generateBookingReference() {

    const random =
        Math.floor(Math.random() * 9000) + 1000;

    const today =
        new Date()
            .toISOString()
            .slice(0, 10)
            .replaceAll("-", "");

    return `BK-${today}-${random}`;

}