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
    'businessLogo' => 'http://localhost:8000/dist/img/Beach-Mountain-logo-black-image.png',
    
    'businessName' => 'Beach Mountain',

    'businessEmail' => '4beachmountain@gmail.com',

    'replyToEmail' => '4beachmountain@gmail.com',

    'replyToName' => 'Beach Mountain',


    /**********************************************
     * SMTP Settings (Gmail)
     **********************************************/
    'smtpHost' => 'smtp.gmail.com',

    'smtpPort' => 465,

    'smtpEncryption' => 'ssl',

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
    'smtpPassword' => 'zeypqwurbcogsbws',


    /**********************************************
     * Email Settings
     **********************************************/
    'sendCustomerConfirmation' => true,

    'sendBusinessNotification' => true,

    'debugMode' => false

];