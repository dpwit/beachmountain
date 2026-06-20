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

    const modal =
    document.getElementById("bookingModal");

    const closeModal =
        document.getElementById("closeModal");

    const bookingForm =
        document.getElementById("bookingForm");

    let selectedStart = null;
    let selectedEnd = null;

    querySnapshot.forEach((doc) => {

        const data = doc.data();

        appointments.push({
            id: doc.id,
            title: data.customerName + " - " + data.serviceRequired,
            start: data.start,
            end: data.end,
            serviceRequired: data.serviceRequired
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
                modal.style.display = "block";
                document.getElementById("selectedTime").textContent = 
                `Selected Time: ${info.start.toLocaleString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })} - ${info.end.toLocaleString('en-GB', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })}`;
                
            if (!customerName) return;

            try {

                // await addDoc(
                //     collection(db, "appointments"),
                //     {
                //         name: customerName,
                //         start: info.startStr,
                //         end: info.endStr,
                //         createdAt: serverTimestamp()
                        
                //     }
                // );

                // calendar.addEvent({
                //     title: customerName,
                //     serviceRequired: info.serviceRequired,
                //     start: info.startStr,
                //     end: info.endStr
                // });

                closeModal.addEventListener("click", () => {

                    modal.style.display = "none";

                });

                window.addEventListener("click", (e) => {

                    if (e.target === modal) {

                        modal.style.display = "none";

                    }

                });

                bookingForm.addEventListener("submit", async (e) => {

                    e.preventDefault();

                    const customerName =
                        document.getElementById("customerName").value;

                    const customerEmail =
                        document.getElementById("customerEmail").value;

                    const customerPhone =
                        document.getElementById("customerPhone").value;

                    const serviceRequired =
                        document.getElementById("serviceRequired").value;

                    const customerNotes =
                        document.getElementById("customerNotes").value;

                    try {

                        await addDoc(
                            collection(db, "appointments"),
                            {
                                customerName,
                                customerEmail,
                                customerPhone,
                                serviceRequired,
                                customerNotes,

                                start: info.startStr,
                                end: info.endStr,

                                createdAt: serverTimestamp()
                            }
                        );

                        calendar.addEvent({

                            title: customerName + " - " + serviceRequired,
                            start: info.startStr,
                            end: info.endStr

                        });

                        modal.style.display = "none";

                        bookingForm.reset();

                        alert("Appointment booked");

                    } catch(error) {

                        console.error(error);

                        alert(
                            "Booking failed: " +
                            error.message
                        );

                    }

                });


            } catch(error) {

                console.error(error);
                alert("Booking failed");
            }
        }
    });

    calendar.render();
});