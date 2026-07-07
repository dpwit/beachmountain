/**************************************************
 * userSession.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Stores the current authenticated user.
 **************************************************/

let currentUser = null;


/**************************************************
 * Set current user
 **************************************************/

export function setCurrentUser(user) {

    currentUser = user;

}


/**************************************************
 * Get current user
 **************************************************/

export function getCurrentUser() {

    return currentUser;

}


/**************************************************
 * Check login status
 **************************************************/

export function isLoggedIn() {

    return currentUser !== null;

}


/**************************************************
 * Clear user session
 **************************************************/

export function clearCurrentUser() {

    currentUser = null;

}