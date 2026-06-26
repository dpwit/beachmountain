/**************************************************
 * booking.js
 *
 * Handles all Firestore operations for bookings.
 **************************************************/

import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    doc,
    deleteDoc,
    updateDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

const COLLECTION_NAME = "appointments";

/**************************************************
 * Load all bookings from Firestore
 **************************************************/
export async function loadBookings() {

    const bookings = [];

    const snapshot = await getDocs(
        collection(db, COLLECTION_NAME)
    );

    snapshot.forEach((document) => {

        bookings.push({
            id: document.id,
            ...document.data()
        });

    });

    return bookings;

}

/**************************************************
 * Save a booking
 **************************************************/
export async function saveBooking(booking) {

    return await addDoc(
        collection(db, COLLECTION_NAME),
        {
            ...booking,
            createdAt: serverTimestamp()
        }
    );

}

/**************************************************
 * Delete booking
 **************************************************/
export async function deleteBooking(id) {

    await deleteDoc(
        doc(db, COLLECTION_NAME, id)
    );

}

/**************************************************
 * Update booking
 **************************************************/
export async function updateBooking(id, data) {

    await updateDoc(
        doc(db, COLLECTION_NAME, id),
        data
    );

}