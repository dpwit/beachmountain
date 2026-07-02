<?php

/**************************************************
 * config.php
 *
 * Professional Appointment Booking System (PABS)
 *
 * Purpose:
 * Stores all email configuration settings.
 *
 * Changing email providers should only require
 * updating this file.
 **************************************************/

return [

    /**********************************************
     * Business Details
     **********************************************/
    'businessName' => 'Beach Mountain Appointment Booking System',

    'businessEmail' => '4beachmountain@gmail.com',

    'replyToEmail' => '4beachmountain@gmail.com',

    'replyToName' => 'Beach Mountain Appointment Booking System',


    /**********************************************
     * SMTP Settings (Gmail)
     **********************************************/
    'smtpHost' => 'smtp.gmail.com',

    'smtpPort' => 587,

    'smtpEncryption' => 'tls',

    'smtpUsername' => '4beachmountain@gmail.com',

    /*
     * IMPORTANT
     *
     * This is NOT your Gmail password.
     *
     * Create an App Password:
     *
     * Google Account
     * → Security
     * → 2-Step Verification
     * → App Passwords
     */
    'smtpPassword' => 'wpebiwvtlezsrnbl',


    /**********************************************
     * Email Settings
     **********************************************/
    'sendCustomerConfirmation' => true,

    'sendBusinessNotification' => true,

    'debugMode' => false

];