import { loadBookings } from "./booking.js";
import { createCalendar, convertToDate } from "./calendar.js";
import { initialiseModal } from "./modal.js";
import { showSuccess } from "./notifications.js";
import { bookingToCalendarEvent } from "./bookingEventMapper.js";
import { initialiseAuthModal, openAuthModal } from "./services/authModal.js";
import { initialiseAuthentication } from "./services/authService.js";
import { initialiseAuthUI } from "./ui/authUI.js";

let calendar;

function refreshCalendarTitles() {

    calendar.getEvents().forEach((event) => {

        const booking = {

            id: event.id,

            start: event.start,
            end: event.end,

            ...event.extendedProps

        };

        const updated =
            bookingToCalendarEvent(booking);

        event.setProp(
            "title",
            updated.title
        );

    });

}

document.addEventListener("DOMContentLoaded", async () => {

    try {

        initialiseAuthentication();

        initialiseAuthUI();

        const bookings = await loadBookings();

        const calendarElement =
            document.getElementById("calendar-new");

        calendar =
            createCalendar(calendarElement, bookings);

        document.addEventListener(
    "userLoggedIn",
    refreshCalendarTitles
);

document.addEventListener(
    "userLoggedOut",
    refreshCalendarTitles
);

        initialiseModal();

        initialiseAuthModal();

        // IMPORTANT: attach listener AFTER calendar exists
        document.addEventListener("bookingCreated", (event) => {

            const booking = event.detail;

            console.log("Booking received:", booking);

            const addedEvent = calendar.addEvent(
                bookingToCalendarEvent(booking)
            );

            console.log("Added event:", addedEvent);
            console.log("Calendar now has", calendar.getEvents().length, "events");

        });

        document.addEventListener("bookingUpdated", (event) => {

    const booking = event.detail;

    const calendarEvent =
        calendar.getEventById(booking.id);

    if (!calendarEvent) {
        return;
    }

    calendarEvent.setProp(
        "title",
        `${booking.customerName} - ${booking.serviceRequired}`
    );

    calendarEvent.setStart(booking.start.toDate());

    calendarEvent.setEnd(booking.end.toDate());

    calendarEvent.setExtendedProp(
        "customerName",
        booking.customerName
    );

    calendarEvent.setExtendedProp(
        "customerEmail",
        booking.customerEmail
    );

    calendarEvent.setExtendedProp(
        "customerPhone",
        booking.customerPhone
    );

    calendarEvent.setExtendedProp(
        "serviceRequired",
        booking.serviceRequired
    );

    calendarEvent.setExtendedProp(
        "customerNotes",
        booking.customerNotes
    );

});

document.addEventListener(
    "bookingDeleted",
    (event) => {

        const calendarEvent =
            calendar.getEventById(
                event.detail.id
            );

        if (calendarEvent) {

            calendarEvent.remove();

        }

    }
);

       // use for testing purposes
       showSuccess("You may need to refresh the page to ensure you're seeing the lastest appointments booked!");

    } catch (error) {

        console.error(error);

    }

    // openAuthModal();

    document.addEventListener(
    "userLoggedIn",
    (event)=>{

        console.log(
            "Logged in user:",
            event.detail
        );

    }
);

});