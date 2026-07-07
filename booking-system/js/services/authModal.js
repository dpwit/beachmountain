/**************************************************
 * authModal.js
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Controls Authentication modal UI.
 **************************************************/

import {

    registerAccount,

    signIn,

    sendPasswordReset

} from "./authService.js";

const authModal =
    document.getElementById("authModal");

const closeButton =
    document.getElementById("closeAuthModal");

const authTitle =
    document.getElementById("authTitle");

const authSubtitle =
    document.getElementById("authSubtitle");

const nameGroup =
    document.getElementById("nameGroup");

const confirmPasswordGroup =
    document.getElementById("confirmPasswordGroup");

const authSubmitButton =
    document.getElementById("authSubmitButton");

const showRegisterButton =
    document.getElementById("showRegister");

const showLoginButton =
    document.getElementById("showLogin");

const showForgotPasswordButton =
    document.getElementById("showForgotPassword");

const passwordGroup =
    document.getElementById("passwordGroup");


let authMode = "login";


/**************************************************
 * Open modal
 **************************************************/

export function openAuthModal() {

    authModal.style.display = "block";

    showLogin();

}


/**************************************************
 * Close modal
 **************************************************/

export function closeAuthModal() {

    authModal.style.display = "none";

}


/**************************************************
 * Show Sign In
 **************************************************/

export function showLogin() {

    authMode = "login";


    authTitle.textContent =
        "Sign In";


    authSubtitle.textContent =
        "Sign in to manage your appointments.";


    nameGroup.style.display =
        "none";


    confirmPasswordGroup.style.display =
        "none";


    authSubmitButton.textContent =
        "Sign In";


    showRegisterButton.style.display =
        "block";


    showLoginButton.style.display =
        "none";


    showForgotPasswordButton.style.display =
        "block";

    passwordGroup.style.display =
    "block";

}


/**************************************************
 * Show Register
 **************************************************/

export function showRegister() {

    authMode = "register";


    authTitle.textContent =
        "Create Account";


    authSubtitle.textContent =
        "Create your account to manage appointments.";


    nameGroup.style.display =
        "block";


    confirmPasswordGroup.style.display =
        "block";


    authSubmitButton.textContent =
        "Create Account";


    showRegisterButton.style.display =
        "none";


    showLoginButton.style.display =
        "block";


    showForgotPasswordButton.style.display =
        "none";
    
    passwordGroup.style.display =
    "block";

}


/**************************************************
 * Show Forgot Password
 **************************************************/

export function showForgotPassword() {

    authMode = "reset";


    authTitle.textContent =
        "Reset Password";


    authSubtitle.textContent =
        "Enter your email and we will send a reset link.";


    nameGroup.style.display =
        "none";


    confirmPasswordGroup.style.display =
        "none";


    authSubmitButton.textContent =
        "Send Reset Email";


    showRegisterButton.style.display =
        "none";


    showLoginButton.style.display =
        "block";


    showForgotPasswordButton.style.display =
        "none";
    
    passwordGroup.style.display =
    "none";

}


/**************************************************
 * Initialise
 **************************************************/

export function initialiseAuthModal() {

    document
    .getElementById("authForm")
    .addEventListener(
        "submit",
        handleAuthSubmit
    );


    closeButton.addEventListener(
        "click",
        closeAuthModal
    );


    showRegisterButton.addEventListener(
        "click",
        showRegister
    );


    showLoginButton.addEventListener(
        "click",
        showLogin
    );


    showForgotPasswordButton.addEventListener(
        "click",
        showForgotPassword
    );


    window.addEventListener(
        "click",
        (event) => {

            if (
                event.target === authModal
            ) {

                closeAuthModal();

            }

        }
    );

}

/**************************************************
 * Submit Authentication Form
 **************************************************/

async function handleAuthSubmit(event) {

    event.preventDefault();


    const email =
        document.getElementById(
            "authEmail"
        ).value;


    const password =
        document.getElementById(
            "authPassword"
        ).value;


    const name =
        document.getElementById(
            "authName"
        ).value;


    const confirmPassword =
        document.getElementById(
            "authConfirmPassword"
        ).value;



    try {


        if(authMode === "login") {


            await signIn(
                email,
                password
            );


            closeAuthModal();


        }



        if(authMode === "register") {


            if(password !== confirmPassword) {

                throw new Error(
                    "Passwords do not match."
                );

            }


            await registerAccount(
                name,
                email,
                password
            );


            closeAuthModal();


        }



        if(authMode === "reset") {


            await sendPasswordReset(
                email
            );


        }



    }
    catch(error) {


        console.error(error);


    }

}