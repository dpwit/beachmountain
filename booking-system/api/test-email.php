<?php

require_once 'mailer.php';

$mail = createMailer();

/*
 * FORCE FULL DEBUG OUTPUT
 */
$mail->SMTPDebug = 3;
$mail->Debugoutput = function($str, $level) {
    echo "SMTP[$level]: $str<br>";
};

try {

    $mail->addAddress('4beachmountain@gmail.com');
    $mail->Subject = 'SMTP Test Email';
    $mail->Body = 'Testing Gmail SMTP connection';

    $mail->send();

    echo json_encode([
        "success" => true,
        "message" => "Email sent"
    ]);

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "error" => $mail->ErrorInfo
    ]);

}