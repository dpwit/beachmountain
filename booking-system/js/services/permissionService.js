/**************************************************
 * permissionService.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Centralises all permission checking.
 **************************************************/

import { getCurrentUser } from "../userSession.js";

/**************************************************
 * Is user signed in?
 **************************************************/
export function isSignedIn() {

    return getCurrentUser() !== null;

}

/**************************************************
 * Does booking belong to current user?
 **************************************************/
export function isBookingOwner(
    booking
) {

    const user =
        getCurrentUser();

    if (!user) {

        return false;

    }

    return booking.userId === user.uid;

}

/**************************************************
 * Can user edit booking?
 **************************************************/
export function canEditBooking(
    booking
) {

    return isBookingOwner(
        booking
    );

}

/**************************************************
 * Can user delete booking?
 **************************************************/
export function canDeleteBooking(
    booking
) {

    return isBookingOwner(
        booking
    );

}

/**************************************************
 * Can user view booking details?
 **************************************************/
export function canViewBookingDetails(
    booking
) {

    return isBookingOwner(
        booking
    );

}   