/**************************************************
 * authService.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Handles authentication workflow.
 **************************************************/

import {

    registerUser,

    loginUser,

    logoutUser,

    listenForAuthChanges

} from "../auth.js";

/**************************************************
 * Initialise Authentication
 **************************************************/

export function initialiseAuthentication() {

    listenForAuthChanges((user) => {

        if (user) {

            document.dispatchEvent(

                new CustomEvent(
                    "userLoggedIn",
                    {
                        detail: user
                    }
                )

            );

        }
        else {

            document.dispatchEvent(

                new CustomEvent(
                    "userLoggedOut"
                )

            );

        }

    });

}

export {

    registerUser,

    loginUser,

    logoutUser

};