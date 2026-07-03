<?php

/**************************************************
 * date-helper.php
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Provides consistent appointment formatting
 * using the business timezone.
 **************************************************/

/**************************************************
 * Business Timezone
 **************************************************/

const BUSINESS_TIMEZONE = 'Europe/London';

/**************************************************
 * Convert date to business timezone
 **************************************************/

function bookingDateTime(string $date): DateTime
{
    $dateTime = new DateTime($date);

    $dateTime->setTimezone(
        new DateTimeZone(BUSINESS_TIMEZONE)
    );

    return $dateTime;
}

/**************************************************
 * Appointment Date
 **************************************************/

function formatAppointmentDate(string $date): string
{
    return bookingDateTime($date)
        ->format('l j F Y');
}

/**************************************************
 * Appointment Time
 **************************************************/

function formatAppointmentTime(
    string $start,
    string $end
): string {

    return
        bookingDateTime($start)->format('g:i A')
        . ' – ' .
        bookingDateTime($end)->format('g:i A');

}