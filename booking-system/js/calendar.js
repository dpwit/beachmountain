import { APP_CONFIG } from "./config.js";
import { openBookingModal } from "./modal.js";
import { hasBookingConflict } from "./booking.js";
import { Timestamp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { showError } from "./notifications.js";
import { bookingToCalendarEvent } from "./bookingEventMapper.js";
import { canViewBookingDetails } from "./services/permissionService.js";

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

        },

        eventClick: async function(info) {

    const booking = {

        id: info.event.id,

        ...info.event.extendedProps

    };

    if (
        canViewBookingDetails(
            booking
        )
    ) {

        openBookingModal(
            info.event.start,
            info.event.end,
            info.event
        );

    }
    else {

        showError(
            "You can only view your own appointments."
        );

    }

}

    });

    calendar.render();

    bookings.forEach((booking) => {

        calendar.addEvent(
            bookingToCalendarEvent(booking)
        );

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