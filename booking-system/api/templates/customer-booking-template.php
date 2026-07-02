<?php

/**************************************************
 * customer-booking-template.php
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Creates the confirmation email sent
 * to the customer.
 **************************************************/

$startDate = new DateTime($booking['start']);
$endDate = new DateTime($booking['end']);

$date = $startDate->format('l j F Y');

$time =
    $startDate->format('g:i A') .
    ' - ' .
    $endDate->format('g:i A');

require __DIR__ . '/email-header.php';

?>

<h2>Booking Confirmation</h2>

<p>

Hello
<strong><?= htmlspecialchars($booking['customerName']) ?></strong>,

</p>

<p>

Thank you for your booking.

Your appointment has been confirmed.

</p>

<table>

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
<td class="label">Notes</td>
<td><?= nl2br(htmlspecialchars($booking['customerNotes'])) ?></td>
</tr>

</table>

<br>

<p>

If you need to change or cancel your appointment, please contact us as soon as possible.

</p>

<p>

We look forward to seeing you.

</p>

<?php

require __DIR__ . '/email-footer.php';

?>