/**************************************************
 * firebase.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Initialises Firebase services.
 **************************************************/

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

const firebaseConfig = {

    apiKey: "AIzaSyCUye5v1njZsot5vYJHkuhdiK78rxpIAFI",

    authDomain: "beachmoutain-21b24.firebaseapp.com",

    projectId: "beachmoutain-21b24",

    storageBucket: "beachmoutain-21b24.firebasestorage.app",

    messagingSenderId: "409559234130",

    appId: "1:409559234130:web:6b792e9301ff5a6f5fd18b",

    measurementId: "G-4NCCKN4YKZ"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);