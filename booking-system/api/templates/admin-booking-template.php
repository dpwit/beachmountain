<?php

require_once __DIR__ . '/../helpers/date-helper.php';

require __DIR__ . '/email-header.php';

?>

<h2>New Appointment Booking</h2>

<p>

A new appointment has been received through your website.

</p>

<table>

<tr>
<td class="label">Booking Reference</td>
<td>

<strong>

<?= htmlspecialchars($booking['bookingReference']) ?>

</strong>

</td>
</tr>

<tr>
<td class="label">Customer</td>
<td><?= htmlspecialchars($booking['customerName']) ?></td>
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
<td class="label">Service</td>
<td><?= htmlspecialchars($booking['serviceRequired']) ?></td>
</tr>

<tr>
<td class="label">Date</td>
<td><?= formatAppointmentDate($booking['start']) ?></td>
</tr>

<tr>
<td class="label">Time</td>
<td><?= formatAppointmentTime(
    $booking['start'],
    $booking['end']
) ?></td>
</tr>

<tr>
<td class="label">Notes</td>
<td>

<?= nl2br(
    htmlspecialchars(
        $booking['customerNotes'] ?? ''
    )
) ?>

</td>
</tr>

</table>

<?php

require __DIR__ . '/email-footer.php';

?>