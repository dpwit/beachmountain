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
let selectedTime;

/**************************************************
 * Initialise the booking modal
 **************************************************/
export function initialiseModal() {

    selectedTime =
    document.getElementById("selectedTime");

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

    const selectedTime =
        document.getElementById("selectedTime");

    selectedTime.textContent =
        `${start.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        })} at ${start.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        })}`;

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