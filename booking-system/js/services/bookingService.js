/**************************************************
 * bookingService.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Handles the complete booking workflow.
 **************************************************/

import { saveBooking } from "../booking.js";
import { showSuccess, showError } from "../notifications.js";

/**************************************************
 * Create a booking
 **************************************************/
export async function createBooking(booking) {

    try {

        const docRef = await saveBooking(booking);

        showSuccess("Booking confirmed!");

        return {
            success: true,
            booking: {
                ...booking,
                id: docRef.id
            }
        };

    } catch (error) {

        console.error(error);

        showError("Booking failed.");

        return {
            success: false,
            error
        };

    }

}