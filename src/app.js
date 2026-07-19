/**************************************************
 * app.js
 *
 * Beach Mountain
 *
 * Purpose:
 * Initialises the website.
 **************************************************/

import { initialiseNavigation } from "./navigation.js";

function initialiseWebsite() {

    initialiseNavigation();

}

document.addEventListener(
    "DOMContentLoaded",
    initialiseWebsite
);