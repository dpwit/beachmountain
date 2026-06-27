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

        document.addEventListener("bookingCreated", (event) => {

            const booking = event.detail;

            if (!calendar) {
                console.warn("Calendar not ready yet");
                return;
            }

            calendar.addEvent({
                id: booking.id,
                title: `${booking.customerName} - ${booking.serviceRequired}`,
                start: booking.start,
                end: booking.end
            });

        });

        initialiseModal();
        
        // temporary notification to show that the notification system is working
        showSuccess("Notification system is working!");

    } catch (error) {

        console.error(error);

    }

});