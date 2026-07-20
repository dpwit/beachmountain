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

    if (
        !hamburgerButton ||
        !mobileNavigation
    ) {

        return;

    }

    hamburgerButton.addEventListener(
        "click",
        toggleNavigation
    );

    window.addEventListener(
        "resize",
        handleResize
    );

    const navigationLinks =
    mobileNavigation.querySelectorAll("a");

    navigationLinks.forEach(

        (link) =>

            link.addEventListener(

                "click",

                closeNavigation

            )

    );

}

/**************************************************
 * Close navigation
 **************************************************/
function closeNavigation() {

    hamburgerButton.classList.remove(
        "is-open"
    );

    mobileNavigation.classList.remove(
        "is-open"
    );

    hamburgerButton.setAttribute(
        "aria-expanded",
        "false"
    );

}

/**************************************************
 * Handle window resize
 **************************************************/
function handleResize() {

    if (

        window.innerWidth >= 1024

    ) {

        closeNavigation();

    }

}

/**************************************************
 * Toggle mobile navigation
 **************************************************/
function toggleNavigation() {

    const isOpen =
        hamburgerButton.classList.toggle(
            "is-open"
        );

    mobileNavigation.classList.toggle(
        "is-open"
    );

    hamburgerButton.setAttribute(
        "aria-expanded",
        isOpen
    );

}