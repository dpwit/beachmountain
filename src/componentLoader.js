/**************************************************
 * componentLoader.js
 *
 * Beach Mountain
 *
 * Purpose:
 * Loads reusable HTML components.
 **************************************************/

/**************************************************
 * Load a component
 **************************************************/
export async function loadComponent(
    selector,
    file
) {

    const element =
        document.querySelector(selector);

    if (!element) {

        return;

    }

    try {

        const response =
            await fetch(file);

        if (!response.ok) {

            throw new Error(
                `Unable to load ${file}`
            );

        }

        element.innerHTML =
            await response.text();

    }
    catch (error) {

        console.error(error);

    }

}