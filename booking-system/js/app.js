import { authenticate } from "./auth.js";
import { loadBookings } from "./booking.js";
import { createCalendar } from "./calendar.js";
import { initialiseModal } from "./modal.js";
import { showSuccess } from "./notifications.js";

let calendar;

document.addEventListener("DOMContentLoaded", async () => {

    try {

        await authenticate();

        const bookings = await loadBookings();

        const calendarElement =
            document.getElementById("calendar-new");

        calendar =
            createCalendar(calendarElement, bookings);

        initialiseModal();

        // IMPORTANT: attach listener AFTER calendar exists
        document.addEventListener("bookingCreated", (event) => {

    console.log("bookingCreated received:", event.detail);

    const booking = event.detail;

    calendar.addEvent({
        id: booking.id,
        title: `${booking.customerName} - ${booking.serviceRequired}`,
        start: booking.start,
        end: booking.end
    });

    // FORCE redraw (this is the missing piece)
    calendar.refetchEvents?.();

});

       // use for testing purposes
       showSuccess("Please refresh the page to ensure you're seeing the lastest appointments booked!");

    } catch (error) {

        console.error(error);

    }

});