<?php

/**************************************************
 * admin-booking-template.php
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Creates the HTML email sent to the business
 * when a new appointment has been booked.
 **************************************************/

$startDate = new DateTime($booking['start']);
$endDate   = new DateTime($booking['end']);

$date = $startDate->format('l j F Y');

$time =
    $startDate->format('g:i A') .
    ' – ' .
    $endDate->format('g:i A');

require __DIR__ . '/email-header.php';

?>

<h2>New Appointment Booking</h2>

<p>

A new appointment has been booked through your website.

</p>

<table>

<tr>
<td class="label">Customer</td>
<td><?= htmlspecialchars($booking['customerName']) ?></td>
</tr>

<tr>
<td class="label">Service</td>
<td><?= htmlspecialchars($booking['serviceRequired']) ?></td>
</tr>

<tr>
<td class="label">Date</td>
<td><?= $date ?></td>
</tr>

<tr>
<td class="label">Time</td>
<td><?= $time ?></td>
</tr>

<tr>
<td class="label">Telephone</td>
<td><?= htmlspecialchars($booking['customerPhone']) ?></td>
</tr>

<tr>
<td class="label">Email</td>
<td><?= htmlspecialchars($booking['customerEmail']) ?></td>
</tr>

<tr>
<td class="label">Notes</td>
<td><?= nl2br(htmlspecialchars($booking['customerNotes'])) ?></td>
</tr>

</table>

<?php

require __DIR__ . '/email-footer.php';

?>