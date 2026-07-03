<?php

require_once __DIR__ . '/../helpers/date-helper.php';

require __DIR__ . '/email-header.php';

?>

<h2>Booking Confirmation</h2>

<p>

Hello
<strong><?= htmlspecialchars($booking['customerName']) ?></strong>,

</p>

<p>

Thank you for your booking.

Your appointment has been successfully confirmed.

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

<br>

<p>

If you need to amend or cancel your appointment, please contact us quoting your booking reference. Alternatively, you can use the appointment booking calendar to manage this.

</p>

<p>

We look forward to welcoming you.

</p>

<?php

require __DIR__ . '/email-footer.php';

?>