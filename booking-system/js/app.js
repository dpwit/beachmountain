import { authenticate } from "./auth.js";
import { loadBookings } from "./booking.js";
import { createCalendar, convertToDate } from "./calendar.js";
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

            const booking = event.detail;

            console.log("Booking received:", booking);

            const start = convertToDate(booking.start);
            const end = convertToDate(booking.end);

            console.log("Start:", start);
            console.log("End:", end);

            const addedEvent = calendar.addEvent({
                id: booking.id,
                title: `${booking.customerName} - ${booking.serviceRequired}`,
                start: start,
                end: end
            });

            console.log("Added event:", addedEvent);
            console.log("Calendar now has", calendar.getEvents().length, "events");

        });

       // use for testing purposes
       showSuccess("You may need to refresh the page to ensure you're seeing the lastest appointments booked!");

    } catch (error) {

        console.error(error);

    }

});