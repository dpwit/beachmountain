<?php

$config = require __DIR__ . '/../config.php';

?>
<!DOCTYPE html>
<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0">

<title><?= htmlspecialchars($config['businessName']) ?></title>

<style>

body{

    margin:0;
    padding:40px;
    background:#f4f4f4;
    font-family:Arial, Helvetica, sans-serif;

}

.container{

    max-width:700px;
    margin:auto;
    background:#ffffff;
    border-radius:10px;
    overflow:hidden;
    border:1px solid #dddddd;

}

.header{

    background:#0f4c81;
    color:white;
    padding:30px;

}

.header h1{

    margin:0;

}

.content{

    padding:30px;

}

table{

    width:100%;
    border-collapse:collapse;

}

td{

    padding:10px;
    border-bottom:1px solid #eeeeee;

}

.label{

    width:180px;
    font-weight:bold;

}

</style>

</head>

<body>

<div class="container">

<div class="header">

<h1><?= htmlspecialchars($config['businessName']) ?></h1>

</div>

<div class="content">