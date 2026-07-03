<?php

/**************************************************
 * date-helper.php
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Provides consistent appointment formatting.
 **************************************************/

function formatAppointmentDate(string $date): string
{
    return (new DateTime($date))
        ->format('l j F Y');
}

function formatAppointmentTime(
    string $start,
    string $end
): string {

    return
        (new DateTime($start))->format('g:i A')
        . ' – ' .
        (new DateTime($end))->format('g:i A');

}