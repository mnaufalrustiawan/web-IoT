<?php
// Mengizinkan akses dari semua domain (CORS)
header("Access-Control-Allow-Origin: *");

// Mengizinkan metode HTTP GET dan POST
header("Access-Control-Allow-Methods: GET, POST");

// Mengizinkan pengiriman data dengan format JSON
header("Access-Control-Allow-Headers: Content-Type");

/**
 * Fungsi untuk membaca data slider dari file JSON
 * @return array Data yang dibaca dari 'dataslider.json' atau array kosong jika file tidak ditemukan
 */
function readSliderData()
{
    // Membaca isi file 'dataslider.json', jika kosong, gunakan '{}'
    return json_decode(file_get_contents('dataslider.json') ?: '{}', true);
}

/**
 * Fungsi untuk menulis data slider ke file JSON
 * @param array $data Data yang akan disimpan ke 'dataslider.json'
 */
function writeSliderData($data)
{
    // Menyimpan data dalam format JSON yang rapi
    file_put_contents('dataslider.json', json_encode($data, JSON_PRETTY_PRINT));
}

// Menangani permintaan GET: Mengirim data slider dalam format JSON
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sliderData = readSliderData(); // Membaca data dari file JSON
    header('Content-Type: application/json'); // Mengatur header respons JSON

    // Jika data ditemukan, kirimkan. Jika tidak, kirim pesan 'Data not found'
    echo json_encode($sliderData ?: ['message' => 'Data not found']);
    exit; // Menghentikan eksekusi skrip
}

// Menangani permintaan POST: Menyimpan atau memperbarui data slider
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Membaca data JSON yang dikirim oleh client
    $incomingData = json_decode(file_get_contents('php://input'), true);

    // Jika data yang dikirim valid
    if ($incomingData) {
        $sliderData = readSliderData(); // Membaca data lama
        $sliderData = array_merge($sliderData, $incomingData); // Menggabungkan data lama dengan yang baru
        writeSliderData($sliderData); // Menyimpan data yang diperbarui

        // Mengirimkan respons sukses dalam format JSON
        echo json_encode(['message' => 'Data updated successfully']);
    } else {
        // Jika data yang dikirim tidak valid, kirim status HTTP 400 (Bad Request)
        http_response_code(400);
        echo json_encode(['message' => 'Invalid data']);
    }
}
?>
