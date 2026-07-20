/**************************************************
 * app.js
 *
 * Beach Mountain
 *
 * Purpose:
 * Initialises the website.
 **************************************************/

import { loadComponent } from "./componentLoader.js";
import { initialiseNavigation } from "./navigation.js";

async function initialiseWebsite() {

    await loadComponent(
        "#header",
        "/header.html"
    );

    await loadComponent(
        "#footer",
        "/footer.html"
    );

    initialiseNavigation();

}

initialiseWebsite();