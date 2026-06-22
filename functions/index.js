const { onDocumentCreated } =
require("firebase-functions/v2/firestore");

const { Resend } = require("resend");

exports.bookingConfirmation = onDocumentCreated(
    "appointments/{appointmentId}",

    async (event) => {

        const appointment = event.data.data();

        const resend =
            new Resend(process.env.RESEND_API_KEY);

        const bookingDate =
            new Date(
                appointment.start
            ).toLocaleString("en-GB");

        //
        // Email YOU
        //

        await resend.emails.send({

            from:
                "Bookings <4beachmountain@gmail.com>",

            to:
                "4beachmountain@gmail.com",

            subject:
                "New Appointment Booking",

            html: `
                <h2>New Booking</h2>

                <p>
                ${appointment.customerName}
                </p>

                <p>
                ${appointment.serviceRequired}
                </p>

                <p>
                ${bookingDate}
                </p>
            `
        });

        //
        // Email CUSTOMER
        //

        await resend.emails.send({

            from:
                "Bookings <4beachmountain@gmail.com>",

            to:
                appointment.customerEmail,

            subject:
                "Appointment Confirmation",

            html: `
                <h2>
                Appointment Confirmed
                </h2>

                <p>
                Hi ${appointment.customerName},
                </p>

                <p>
                Thank you for your booking.
                </p>

                <p>
                Date:
                ${bookingDate}
                </p>

                <p>
                Service:
                ${appointment.serviceRequired}
                </p>
            `
        });
    }
);