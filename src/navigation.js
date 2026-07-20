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

    document.addEventListener(
        "click",
        handleOutsideClick
    );

    document.addEventListener(
        "keydown",
        handleEscape
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

    document.body.classList.remove(
    "menu-open"
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
 * Close navigation when clicking outside
 **************************************************/
function handleOutsideClick(event) {

    const navigationIsOpen =
        hamburgerButton.classList.contains(
            "is-open"
        );

    if (!navigationIsOpen) {

        return;

    }

    const clickedInsideNavigation =
        mobileNavigation.contains(
            event.target
        );

    const clickedHamburger =
        hamburgerButton.contains(
            event.target
        );

    if (

        !clickedInsideNavigation &&
        !clickedHamburger

    ) {

        closeNavigation();

    }

}

/**************************************************
 * Close navigation using Escape key
 **************************************************/
function handleEscape(event) {

    if (

        event.key === "Escape"

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

    document.body.classList.toggle(
    "menu-open",
    isOpen
);

}