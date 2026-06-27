/**************************************************
 * notifications.js
 *
 * Displays toast notifications.
 **************************************************/

const container =
    document.getElementById("notificationContainer");

export function showNotification(message, type = "success") {

    const notification =
        document.createElement("div");

    notification.className =
        `notification ${type}`;

    notification.textContent =
        message;

    container.appendChild(notification);

    requestAnimationFrame(() => {

        notification.classList.add("show");

    });

    setTimeout(() => {

        notification.classList.remove("show");

        setTimeout(() => {

            notification.remove();

        }, 400);

    }, 4000);

}

export function showSuccess(message) {

    showNotification(message, "success");

}

export function showError(message) {

    showNotification(message, "error");

}

