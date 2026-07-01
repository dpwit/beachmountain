/**************************************************
 * bookingService.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Handles the complete booking workflow.
 **************************************************/

import { saveBooking, updateBooking, hasBookingConflict, deleteBooking } from "../booking.js";
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

/**************************************************
 * Update an existing booking
 **************************************************/
export async function updateExistingBooking(id, booking) {

    try {

        await updateBooking(id, booking);

        document.dispatchEvent(
            new CustomEvent("bookingUpdated", {
                detail: {
                    id,
                    ...booking
                }
            })
        );

        showSuccess("Your booking has been updated successfully and noted.");

        return {
            success: true
        };

    } catch (error) {

        console.error(error);

        showError("Unable to update booking.");

        return {
            success: false,
            error
        };

    }

}

/**************************************************
 * Delete booking
 **************************************************/
export async function deleteExistingBooking(id) {

    try {

        await deleteBooking(id);

        document.dispatchEvent(
            new CustomEvent(
                "bookingDeleted",
                {
                    detail: {
                        id
                    }
                }
            )
        );

        showSuccess(
            "Your booking has been successfully deleted. Thanks."
        );

        return {
            success: true
        };

    } catch (error) {

        console.error(error);

        showError(
            "Unable to delete booking."
        );

        return {
            success: false,
            error
        };

    }

}