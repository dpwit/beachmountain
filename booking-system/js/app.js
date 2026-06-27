import { authenticate } from "./auth.js";
import { loadBookings } from "./booking.js";
import { createCalendar } from "./calendar.js";

document.addEventListener("DOMContentLoaded", async () => {

    try {

        await authenticate();

        const bookings = await loadBookings();

        const calendarElement =
            document.getElementById("calendar-new");

        createCalendar(calendarElement, bookings);

    } catch (error) {

        console.error(error);

    }

});