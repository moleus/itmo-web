<?php

require_once 'vendor/autoload.php';

session_start();
if (!isset($_SESSION['hit_results'])) {
    $_SESSION['hit_results'] = [];
}

//TODO: return error code if params are invalid
//TODO: check float conversion (replace , with .)
//TODO: check numeric

$x = floatval($_POST['paramX']);
$y = floatval($_POST['paramY']);
$unitR = floatval($_POST['paramR']);

$validator = new Validator();
$isValid = $validator->isPointInShape($x, $y, $unitR) ? "true" : "false";

date_default_timezone_set('Europe/Moscow');
$currentTime = date('H:i:s', time());
$executionTime = round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 5);

$data = [
    "x" => $x,
    "y" => $y,
    "r" => $unitR,
    "inShape" => $isValid,
    "currentTime" => $currentTime,
    "executionTime" => $executionTime
];

$_SESSION['hit_results'][] = $data;

include 'get_results.php';