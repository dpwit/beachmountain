import { APP_CONFIG } from "./config.js";
import { formatBookingTitle } from "./utils.js";
import { openBookingModal } from "./modal.js";
import { hasBookingConflict } from "./booking.js";
import { Timestamp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { showError } from "./notifications.js";

export function createCalendar(calendarElement, bookings) {

    const calendar = new FullCalendar.Calendar(calendarElement, {

        initialView: APP_CONFIG.calendar.initialView,
        firstDay: APP_CONFIG.calendar.firstDay,

        weekends: APP_CONFIG.calendar.weekends,
        headerToolbar: APP_CONFIG.calendar.headerToolbar,

        selectable: APP_CONFIG.calendar.selectable,
        nowIndicator: APP_CONFIG.calendar.nowIndicator,
        slotDuration: APP_CONFIG.calendar.slotDuration,
        slotMinTime: APP_CONFIG.calendar.slotMinTime,
        slotMaxTime: APP_CONFIG.calendar.slotMaxTime,

        select: async function(info) {

            const conflict = await hasBookingConflict(
                Timestamp.fromDate(info.start),
                Timestamp.fromDate(info.end)
            );

            if (conflict) {

                showError(
                    "Sorry, that time slot is already booked. Please choose another slot. Thanks"
                );
                        return;

            }

            openBookingModal(
                info.start,
                info.end
            );

        }

    });

    calendar.render();

    bookings.forEach((booking) => {

        calendar.addEvent({
            id: booking.id,
            title: formatBookingTitle(booking),
            start: convertToDate(booking.start),
            end: convertToDate(booking.end)
        });

    });

    return calendar;
}

export function convertToDate(value) {

    if (!value) return null;

    if (typeof value.toDate === "function") {
        return value.toDate();
    }

    return new Date(value);
}