/**************************************************
 * emailService.js
 *
 * Sends booking confirmation emails.
 **************************************************/

/**************************************************
 * Send booking emails
 **************************************************/
export async function sendBookingEmails(booking) {

    const response = await fetch(
        "/booking-system/api/send-booking-email.php",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(booking)
        }
    );

    if (!response.ok) {

        throw new Error(
            `Email service returned HTTP ${response.status}`
        );

    }

    return await response.json();

}