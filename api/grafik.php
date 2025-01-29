<?php
// Mengizinkan akses CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Mengatur timezone ke Jakarta
date_default_timezone_set('Asia/Jakarta');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true); // Decode JSON

  // Menambahkan waktu dan tanggal dengan WIB
  $data['timestamp'] = date('d M Y - H:i:s') . ' WIB'; // Format: DD Month YYYY - HH:MM:SS WIB

  // Membaca file JSON yang sudah ada
  $existingData = file_exists('datagrafik.json') ? json_decode(file_get_contents('datagrafik.json'), true) : [];

  // Menambahkan data baru ke array existingData
  $existingData[] = $data;

  // Memastikan hanya 100 data terbaru yang disimpan
  $existingData = array_slice($existingData, -50);

  // Menyimpan kembali data ke file JSON dengan format pretty
  file_put_contents('datagrafik.json', json_encode($existingData, JSON_PRETTY_PRINT));

  // Mengirim respons
  echo json_encode('Data grafik berhasil disimpan'); // Kembalikan pesan
} else if (file_exists('datagrafik.json')) {
  echo file_get_contents('datagrafik.json');
}
