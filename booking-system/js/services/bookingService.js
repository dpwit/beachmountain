/**************************************************
 * bookingService.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Handles the complete booking workflow.
 **************************************************/

import { saveBooking, hasBookingConflict } from "../booking.js";
import { showSuccess, showError } from "../notifications.js";

/**************************************************
 * Create a booking
 **************************************************/
export async function createBooking(booking) {

    try {
        // Check for overlapping bookings
        const conflict = await hasBookingConflict(
            booking.start,
            booking.end
        );

        if (conflict) {

            showError(
                "Sorry, this time slot has already been booked. Please choose another appointment."
            );

            return {
                success: false,
                conflict: true
            };

        }

        const docRef = await saveBooking(booking);

        const newBooking = {
            ...booking,
            id: docRef.id
        };

        // Dispatch event FIRST (before returning)
        document.dispatchEvent(
            new CustomEvent("bookingCreated", {
                detail: newBooking
            })
        );

        showSuccess("Your booking has been confirmed. You may need to refresh the page to see the entry in the calendar.");

        return {
            success: true,
            booking: newBooking
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