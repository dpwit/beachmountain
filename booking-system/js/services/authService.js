/**************************************************
 * authService.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Handles authentication workflow.
 **************************************************/

import { registerUser, loginUser, logoutUser, resetPassword, listenForAuthChanges } from "../auth.js";
import { showSuccess, showError } from "../notifications.js";
import { setCurrentUser, clearCurrentUser,  } from "../userSession.js";
import { createUserProfile, getUserProfile } from "./userService.js";

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
        
        await createUserProfile(user);

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

        async (user) => {


            if(user) {


    const profile =
        await getUserProfile(
            user.uid
        );


    const userWithProfile = {

        ...user,

        role:
            profile.role

    };


    setCurrentUser(
        userWithProfile
    );


    document.dispatchEvent(

        new CustomEvent(
            "userLoggedIn",
            {
                detail:userWithProfile
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