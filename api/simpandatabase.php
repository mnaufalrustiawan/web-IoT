<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'koneksi.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    die(json_encode(["status" => "error", "message" => "JSON tidak valid"]));
}

if (isset($data['ph']) && isset($data['kelembapan']) && isset($data['suhu']) && isset($data['nitrogen']) && isset($data['fosfor']) && isset($data['kalium']) && isset($data['curah_hujan'])) {
    $ph = floatval($data['ph']);
    $kelembapan = floatval($data['kelembapan']);
    $suhu = floatval($data['suhu']);
    $nitrogen = floatval($data['nitrogen']);
    $fosfor = floatval($data['fosfor']);
    $kalium = floatval($data['kalium']);
    $curah_hujan = floatval($data['curah_hujan']);

    // Mengecek apakah tabel kosong dan reset auto-increment jika kosong
    $result = mysqli_query($conn, "SELECT COUNT(*) FROM sensor");
    $row = mysqli_fetch_row($result);
    if ($row[0] == 0) {
        mysqli_query($conn, "ALTER TABLE sensor AUTO_INCREMENT = 1");
    }

    // Menyisipkan data ke tabel sensor
    $query = "INSERT INTO sensor (ph, kelembapan, suhu, nitrogen, fosfor, kalium, curah_hujan) VALUES ('$ph', '$kelembapan', $suhu, $nitrogen, $fosfor, $kalium, $curah_hujan)";
    if (mysqli_query($conn, $query)) {
        echo json_encode(["status" => "success", "message" => "Data berhasil disimpan"]);
    } else {
        echo json_encode(["status" => "error", "message" => mysqli_error($conn)]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
}

mysqli_close($conn);
