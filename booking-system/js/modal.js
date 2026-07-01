/**************************************************
 * modal.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Controls the booking modal.
 **************************************************/
import { createBooking } from "./services/bookingService.js";
import { Timestamp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

let modal;
let bookingForm;
let closeButton;

let selectedStart = null;
let selectedEnd = null;
let selectedTime;

let customerName;
let customerEmail;
let customerPhone;
let serviceRequired;
let customerNotes;

let editMode = false;
let editingBookingId = null;

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

    selectedTime =
        document.getElementById("selectedTime");

    customerName =
        document.getElementById("customerName");

    customerEmail =
        document.getElementById("customerEmail");

    customerPhone =
        document.getElementById("customerPhone");

    serviceRequired =
        document.getElementById("serviceRequired");

    customerNotes =
        document.getElementById("customerNotes");

    bookingForm.addEventListener(
        "submit",
        handleBookingSubmit
    );

}

/**************************************************
 * Open booking modal
 **************************************************/
export function openBookingModal(start, end, event = null) {

    selectedStart = start;
    selectedEnd = end;

    const selectedTime =
        document.getElementById("selectedTime");

    selectedTime.textContent =
        `Selected time: ${start.toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        })} at ${start.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        })} to ${end.toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit"
        })}`;

        if (event) {

            editMode = true;
            editingBookingId = event.id;

            customerName.value =
                event.extendedProps.customerName;

            customerEmail.value =
                event.extendedProps.customerEmail;

            customerPhone.value =
                event.extendedProps.customerPhone;

            serviceRequired.value =
                event.extendedProps.serviceRequired;

            customerNotes.value =
                event.extendedProps.customerNotes;

            document.querySelector(
            "#bookingForm button[type='submit']"
            ).textContent = "Save your changes";

                }

        else {

            editMode = false;
            editingBookingId = null;

            document.querySelector(
            "#bookingForm button[type='submit']"
            ).textContent = "Book new appointment";

        }

    modal.style.display = "flex";

}

/**************************************************
 * Close booking modal
 **************************************************/
export function closeBookingModal() {

    modal.style.display = "none";

    bookingForm.reset();

    selectedTime.textContent = "";

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

/**************************************************
 * Handle booking form submission
 **************************************************/
async function handleBookingSubmit(event) {

    event.preventDefault();

    const booking = {

        customerName: customerName.value.trim(),

        customerEmail: customerEmail.value.trim(),

        customerPhone: customerPhone.value.trim(),

        serviceRequired: serviceRequired.value.trim(),

        customerNotes: customerNotes.value.trim(),

        start: Timestamp.fromDate(selectedStart),
        
        end: Timestamp.fromDate(selectedEnd)

    };

    const result =
        await createBooking(booking);

    if (result.success) {

        closeBookingModal();

    }

}