/**************************************************
 * userService.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Manages user profiles stored in Firestore.
 **************************************************/

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";

import { db } from "../firebase.js";

export async function createUserProfile(user) {

    console.log(
        "Creating user profile:",
        user.uid,
        user.email
    );

    const userRef = doc(
        db,
        "users",
        user.uid
    );

    const snapshot =
        await getDoc(userRef);

    if (snapshot.exists()) {

        console.log(
            "User profile already exists"
        );

        return;

    }

    await setDoc(
        userRef,
        {
            name: user.displayName,
            email: user.email,
            role: "customer"
        }
    );

    console.log(
        "User profile created successfully"
    );

}