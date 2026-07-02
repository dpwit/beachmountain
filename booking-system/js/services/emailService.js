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
        "../api/send-booking-email.php",
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(booking)

        }
    );

    return await response.json();

}