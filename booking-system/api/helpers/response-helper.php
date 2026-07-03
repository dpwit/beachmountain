<?php

/**************************************************
 * response-helper.php
 *
 * Sends consistent JSON responses.
 **************************************************/

function successResponse(array $data = []): void
{
    echo json_encode(array_merge([
        'success' => true
    ], $data));

    exit;
}

function errorResponse(string $message): void
{
    http_response_code(500);

    echo json_encode([
        'success' => false,
        'message' => $message
    ]);

    exit;
}