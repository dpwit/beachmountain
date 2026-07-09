/**************************************************
 * modal.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Controls the booking modal.
 **************************************************/
import { createBooking, updateExistingBooking, deleteExistingBooking } from "./services/bookingService.js";
import { Timestamp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { canViewBookingDetails } from "./services/permissionService.js";

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

let deleteButton;

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
    
    deleteButton =
        document.getElementById("deleteBooking");

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

    deleteButton.addEventListener(
    "click",
    handleDeleteBooking
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

    enableEditMode(event);

}
else {

    enableCreateMode();

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
 * Populate booking form
 **************************************************/
function populateBookingForm(event) {

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

}

/**************************************************
 * Configure edit mode
 **************************************************/
function enableEditMode(event) {

    const booking = {

        id: event.id,

        ...event.extendedProps

    };

     if (
        !canViewBookingDetails(
            booking
        )
    ) {

        return;

    }

    editMode = true;

    editingBookingId = event.id;

    populateBookingForm(event);

    document.querySelector(
        "#bookingForm button[type='submit']"
    ).textContent =
        "Save your changes";

    deleteButton.style.display =
        "inline-block";

}

/**************************************************
 * Configure create mode
 **************************************************/
function enableCreateMode() {

    editMode = false;

    editingBookingId = null;

    bookingForm.reset();

    document.querySelector(
        "#bookingForm button[type='submit']"
    ).textContent =
        "Book new appointment";

    deleteButton.style.display =
        "none";

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

    let result;

    if (editMode) {

        result =
            await updateExistingBooking(
                editingBookingId,
                booking
            );

    } else {

        result =
            await createBooking(booking);

    }

    if (result.success) {

        closeBookingModal();

    }

}

/**************************************************
 * Handle booking deletion
 **************************************************/

async function handleDeleteBooking() {

    if (!confirm(
        "Are you sure you want to delete this appointment?"
    )) {

        return;

    }

    const result =
        await deleteExistingBooking(
            editingBookingId
        );

    if (result.success) {

        closeBookingModal();

    }

}