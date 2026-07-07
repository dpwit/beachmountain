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

import { auth } from "./firebase.js";

import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

    signOut,

    onAuthStateChanged,

    sendPasswordResetEmail,

    updateProfile

} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

/**************************************************
 * Register
 **************************************************/

export async function registerUser(
    name,
    email,
    password
) {

    const credential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

    await updateProfile(
        credential.user,
        {
            displayName: name
        }
    );

    return credential.user;

}

/**************************************************
 * Login
 **************************************************/

export async function loginUser(
    email,
    password
) {

    const credential =
        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

    return credential.user;

}

/**************************************************
 * Logout
 **************************************************/

export async function logoutUser() {

    await signOut(auth);

}

/**************************************************
 * Password Reset
 **************************************************/

export async function resetPassword(
    email
) {

    await sendPasswordResetEmail(
        auth,
        email
    );

}

/**************************************************
 * Auth Listener
 **************************************************/

export function listenForAuthChanges(
    callback
) {

    onAuthStateChanged(
        auth,
        callback
    );

}