import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const calendarEl = document.getElementById('calendar');
const calendar = new Calendar(calendarEl, {
  plugins: [ dayGridPlugin, interactionPlugin ],
  initialView: 'dayGridMonth'
});
calendar.render();

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUye5v1njZsot5vYJHkuhdiK78rxpIAFI",
  authDomain: "beachmoutain-21b24.firebaseapp.com",
  projectId: "beachmoutain-21b24",
  storageBucket: "beachmoutain-21b24.firebasestorage.app",
  messagingSenderId: "409559234130",
  appId: "1:409559234130:web:6b792e9301ff5a6f5fd18b",
  measurementId: "G-4NCCKN4YKZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default Calendar;