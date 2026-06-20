import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', async () => {
    const auth = getAuth();

        try {
        await signInAnonymously(auth);
        console.log("Anonymous user signed in");
        } catch(error) {
        console.error(error);
        }

    const calendarEl = document.getElementById('calendar-new');

    const appointments = [];

    const querySnapshot = await getDocs(
        collection(db, "appointments")
    );

    querySnapshot.forEach((doc) => {

        const data = doc.data();

        appointments.push({
            id: doc.id,
            title: data.name,
            start: data.start,
            end: data.end
        });
    });

    const calendar = new FullCalendar.Calendar(calendarEl, {

        initialView: 'timeGridWeek',
        headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay'
                },

        selectable: true,

        events: appointments,

        select: async function(info) {
            const conflict = calendar.getEvents().some(event => {

                return (
                    info.start < event.end &&
                    info.end > event.start
                );

            });

            if (conflict) {

                alert("This time slot is already booked.");
                return;

            }

            const customerName =
                prompt("Please enter your name and service required for the appointment:");

            if (!customerName) return;

            try {

                await addDoc(
                    collection(db, "appointments"),
                    {
                        name: customerName,
                        start: info.startStr,
                        end: info.endStr,
                        createdAt: serverTimestamp()
                    }
                );

                calendar.addEvent({
                    title: customerName,
                    start: info.startStr,
                    end: info.endStr
                });

                alert("Appointment booked");

            } catch(error) {

                console.error(error);
                alert("Booking failed");
            }
        }
    });

    calendar.render();
});