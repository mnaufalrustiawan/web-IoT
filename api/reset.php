<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

function writeSliderData($data)
{
    file_put_contents('dataslider.json', json_encode($data, JSON_PRETTY_PRINT));
}

// Mengatur nilai default
$defaultValues = [

    "sliderminkelembapan" => 55,
    "slidermaxph" => 7,
    "sliderminph" => 4
];

// Menangani permintaan POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    writeSliderData($defaultValues);
    echo json_encode(['message' => 'Data reset to default values']);
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed']);
}
