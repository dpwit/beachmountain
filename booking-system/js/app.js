import { authenticate } from "./auth.js";
import { loadBookings } from "./booking.js";
import { createCalendar } from "./calendar.js";
import { initialiseModal } from "./modal.js";

document.addEventListener("DOMContentLoaded", async () => {

    try {

        await authenticate();

        const bookings = await loadBookings();

        const calendarElement =
            document.getElementById("calendar-new");

        const calendar =
            createCalendar(
                calendarElement,
                bookings
            );

        initialiseModal();

    } catch (error) {

        console.error(error);

    }

});