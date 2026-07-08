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