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

    resetPassword,

    listenForAuthChanges

} from "../auth.js";

import {
    showSuccess,
    showError
} from "../notifications.js";

import {

    setCurrentUser,
    clearCurrentUser

} from "../userSession.js";


/**************************************************
 * Register
 **************************************************/

export async function registerAccount(
    name,
    email,
    password
) {

    try {

        const user =
            await registerUser(
                name,
                email,
                password
            );


        showSuccess(
            "Account created successfully."
        );


        return user;


    }
    catch(error) {

        console.error(error);

        showError(
            error.message
        );

        throw error;

    }

}


/**************************************************
 * Login
 **************************************************/

export async function signIn(
    email,
    password
) {

    try {

        const user =
            await loginUser(
                email,
                password
            );


        showSuccess(
            "Welcome back."
        );


        return user;


    }
    catch(error) {

        console.error(error);

        showError(
            error.message
        );

        throw error;

    }

}


/**************************************************
 * Logout
 **************************************************/

export async function signOutAccount() {

    await logoutUser();

}


/**************************************************
 * Password Reset
 **************************************************/

export async function sendPasswordReset(
    email
) {

    try {

        await resetPassword(
            email
        );


        showSuccess(
            "Password reset email sent."
        );


    }
    catch(error) {

        console.error(error);

        showError(
            error.message
        );

    }

}


/**************************************************
 * Authentication listener
 **************************************************/

export function initialiseAuthentication() {


    listenForAuthChanges(

        (user) => {


            if(user) {


                setCurrentUser(user);


                document.dispatchEvent(

                    new CustomEvent(
                        "userLoggedIn",
                        {
                            detail:user
                        }
                    )

                );


            }
            else {


                clearCurrentUser();


                document.dispatchEvent(

                    new CustomEvent(
                        "userLoggedOut"
                    )

                );


            }


        }

    );

}