<?php

/**************************************************
 * booking-reference.php
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Generates a human-friendly booking reference.
 **************************************************/

function generateBookingReference(): string
{
    $date = date('ymd');

    $characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

    $random = '';

    for ($i = 0; $i < 6; $i++) {

        $random .= $characters[random_int(
            0,
            strlen($characters) - 1
        )];

    }

    return "BM-{$date}-{$random}";
}