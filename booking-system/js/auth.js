/**************************************************
 * auth.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Handles Firebase Authentication.
 *
 * Author: <Your Name>
 **************************************************/

import {
    getAuth,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";


/**************************************************
 * Authenticate user anonymously
 **************************************************/
export async function authenticate() {

    const auth = getAuth();

    try {

        await signInAnonymously(auth);

        console.log("✓ Anonymous user signed in");

        return auth.currentUser;

    } catch (error) {

        console.error(
            "Authentication failed:",
            error
        );

        throw error;

    }

}