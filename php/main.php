<?php

require_once '../vendor/autoload.php';

session_start();
if (!isset($_SESSION['hit_results'])) {
    $_SESSION['hit_results'] = [];
}

function check_param(mixed $param): bool
{
    return is_numeric($param);
}

function main(): void
{
    $x_param = $_POST['paramX'];
    $y_param = $_POST['paramY'];
    $unitR_param = $_POST['paramR'];

    if (!(check_param($x_param) && check_param($y_param) && check_param($unitR_param))) {
        http_response_code(400);
        echo "Invalid parameters";
        return;
    }

    $x = floatval($x_param);
    $y = floatval($y_param);
    $unitR = floatval($unitR_param);

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
}

main();