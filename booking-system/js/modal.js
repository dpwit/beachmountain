/**************************************************
 * modal.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Controls the booking modal.
 **************************************************/

let modal;
let bookingForm;
let closeButton;

let selectedStart = null;
let selectedEnd = null;


/**************************************************
 * Initialise the booking modal
 **************************************************/
export function initialiseModal() {

    modal = document.getElementById("bookingModal");

    bookingForm =
        document.getElementById("bookingForm");

    closeButton =
        document.getElementById("closeModal");

    closeButton.addEventListener(
        "click",
        closeBookingModal
    );

}

/**************************************************
 * Open booking modal
 **************************************************/
export function openBookingModal(start, end) {

    selectedStart = start;
    selectedEnd = end;

    modal.style.display = "flex";

}

/**************************************************
 * Close booking modal
 **************************************************/
export function closeBookingModal() {

    modal.style.display = "none";

    bookingForm.reset();

    selectedStart = null;
    selectedEnd = null;

}

/**************************************************
 * Helper fucntions.
 **************************************************/
export function getSelectedStart() {

    return selectedStart;

}

export function getSelectedEnd() {

    return selectedEnd;

}