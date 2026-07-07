/**************************************************
 * authUI.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Controls authentication elements in the UI.
 **************************************************/

import {
    openAuthModal
} from "../services/authModal.js";

import {
    signOutAccount
} from "../services/authService.js";


const userPanel =
    document.getElementById(
        "userPanel"
    );


/**************************************************
 * Show logged out state
 **************************************************/

function showLoggedOut() {


    userPanel.innerHTML = `

        <button
            id="signInButton"
            class="btnBrand">

            Sign In

        </button>

    `;


    document
        .getElementById("signInButton")
        .addEventListener(
            "click",
            openAuthModal
        );

}


/**************************************************
 * Show logged in state
 **************************************************/

function showLoggedIn(user) {


    userPanel.innerHTML = `

        <p>
            Welcome ${user.displayName ?? user.email ?? "Account"}
        </p>

        <button
            id="signOutButton"
            class="btnBrand">

            Sign Out

        </button>

    `;


    document
        .getElementById("signOutButton")
        .addEventListener(
            "click",
            async () => {

                await signOutAccount();

            }
        );

}


/**************************************************
 * Initialise authentication UI
 **************************************************/

export function initialiseAuthUI() {


    document.addEventListener(

        "userLoggedIn",

        (event)=>{

            showLoggedIn(
                event.detail
            );

        }

    );


    document.addEventListener(

        "userLoggedOut",

        ()=>{

            showLoggedOut();

        }

    );


    // Default state
    showLoggedOut();

}