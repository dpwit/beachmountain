<?php

/**************************************************
 * send-booking-email.php
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Receives booking data from JavaScript and sends
 * booking notification emails to:
 *
 * • Business
 * • Customer
 **************************************************/

header('Content-Type: application/json');

require_once __DIR__ . '/mailer.php';

require_once __DIR__ . '/helpers/response-helper.php';
require_once __DIR__ . '/helpers/booking-reference.php';
require_once __DIR__ . '/helpers/date-helper.php';

$config = require __DIR__ . '/config.php';

/**************************************************
 * Read JSON
 **************************************************/

$data = json_decode(
    file_get_contents("php://input"),
    true
);

if (!$data) {

    errorResponse("No booking data received.");

}

/**************************************************
 * Validate Required Fields
 **************************************************/

$required = [

    'customerName',
    'customerEmail',
    'customerPhone',
    'serviceRequired',
    'start',
    'end'

];

foreach ($required as $field) {

    if (
        !isset($data[$field]) ||
        trim((string)$data[$field]) === ''
    ) {

        errorResponse(
            "Missing field: {$field}"
        );

    }

}

$booking = $data;

/**************************************************
 * Booking Reference
 **************************************************/

if (empty($booking['bookingReference'])) {

    $booking['bookingReference'] =
        generateBookingReference();

}

/**************************************************
 * Format Appointment
 **************************************************/

$date =
    formatAppointmentDate(
        $booking['start']
    );

$time =
    formatAppointmentTime(
        $booking['start'],
        $booking['end']
    );

/**************************************************
 * Send Emails
 **************************************************/

$businessSent = false;
$customerSent = false;

try {

    if ($config['sendBusinessNotification']) {

        ob_start();

        require __DIR__ .
            '/templates/admin-booking-template.php';

        $html = ob_get_clean();

        $mail = createMailer();

        $mail->addAddress(
            $config['businessEmail']
        );

        $mail->isHTML(true);

        $mail->Subject =
            "New Booking - {$booking['customerName']}";

        $mail->Body = $html;

        $mail->AltBody =
            "New booking from {$booking['customerName']}";

        $mail->send();

        $businessSent = true;

    }

} catch (Exception $e) {

    error_log(
        "Business email failed: " .
        $e->getMessage()
    );

}

/**************************************************
 * Customer Email
 **************************************************/

try {

    if ($config['sendCustomerConfirmation']) {

        ob_start();

        require __DIR__ .
            '/templates/customer-booking-template.php';

        $html = ob_get_clean();

        $mail = createMailer();

        $mail->addAddress(
            $booking['customerEmail'],
            $booking['customerName']
        );

        $mail->isHTML(true);

        $mail->Subject =
            "Your Booking Confirmation";

        $mail->Body = $html;

        $mail->AltBody =
            "Your appointment has been confirmed.";

        $mail->send();

        $customerSent = true;

    }

} catch (Exception $e) {

    error_log(
        "Customer email failed: " .
        $e->getMessage()
    );

}

/**************************************************
 * JSON Response
 **************************************************/

successResponse([

    'businessEmailSent' => $businessSent,

    'customerEmailSent' => $customerSent,

    'bookingReference' =>
        $booking['bookingReference']

]);