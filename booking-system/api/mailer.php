<?php

/**************************************************
 * mailer.php
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Creates and returns a configured PHPMailer
 * instance WITHOUT Composer.
 **************************************************/

require_once __DIR__ . '/PHPMailer/PHPMailer.php';
require_once __DIR__ . '/PHPMailer/SMTP.php';
require_once __DIR__ . '/PHPMailer/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

/**************************************************
 * Create Mailer Instance
 **************************************************/
function createMailer()
{
    $config = require __DIR__ . '/config.php';

    $mail = new PHPMailer(true);

    try {

        /**********************************************
         * SMTP Settings
         **********************************************/
        $mail->isSMTP();
        $mail->Host       = $config['smtpHost'];
        $mail->SMTPAuth   = true;
        $mail->Username   = $config['smtpUsername'];
        $mail->Password   = $config['smtpPassword'];
        $mail->SMTPSecure = $config['smtpEncryption'];
        $mail->Port       = $config['smtpPort'];

        /**********************************************
         * Encoding
         **********************************************/
        $mail->CharSet = 'UTF-8';

        /**********************************************
         * Sender Info
         **********************************************/
        $mail->setFrom(
            $config['businessEmail'],
            $config['replyToName']
        );

        $mail->addReplyTo(
            $config['replyToEmail'],
            $config['replyToName']
        );

        /**********************************************
         * Debug Mode
         **********************************************/
        if ($config['debugMode']) {
            $mail->SMTPDebug = 2;
            $mail->Debugoutput = 'error_log';
        }

        return $mail;

    } catch (Exception $e) {
        error_log("Mailer init failed: " . $e->getMessage());
        throw $e;
    }
}