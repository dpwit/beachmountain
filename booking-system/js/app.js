import { authenticate } from "./auth.js";
import { loadBookings } from "./booking.js";
import { createCalendar } from "./calendar.js";

document.addEventListener('DOMContentLoaded', async () => {
    const auth = getAuth();

        try {
        await signInAnonymously(auth);
        console.log("Anonymous user signed in");
        } catch(error) {
        console.error(error);
        }

    // Load bookings from Firestore
    const bookings = await loadBookings();
    
    // Create the calendar
    const calendarElement =
        document.getElementById("calendar-new");

    const calendar =
        createCalendar(calendarElement, bookings);

});