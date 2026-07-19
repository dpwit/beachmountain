/**************************************************
 * navigation.js
 *
 * Beach Mountain
 *
 * Purpose:
 * Controls the responsive navigation.
 **************************************************/

let hamburgerButton;
let mobileNavigation;

/**************************************************
 * Initialise navigation
 **************************************************/
export function initialiseNavigation() {

    hamburgerButton =
        document.querySelector(".hamburger-button");

    mobileNavigation =
        document.querySelector(".mobile-navigation");

    if (!hamburgerButton || !mobileNavigation) {

        return;

    }

    hamburgerButton.addEventListener(

        "click",

        toggleNavigation

    );

}

/**************************************************
 * Toggle mobile navigation
 **************************************************/
function toggleNavigation() {

    hamburgerButton.classList.toggle(
        "is-open"
    );

    mobileNavigation.classList.toggle(
        "is-open"
    );

}