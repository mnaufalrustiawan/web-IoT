<?php
// Mengizinkan akses CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

//mengatur timezone
date_default_timezone_set('Asia/Jakarta');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true); // Decode JSON

  // Menambahkan waktu dan tanggal dengan WIB
  $data['timestamp'] = date('d M Y - H:i:s') . ' WIB'; // Format: DD Month YYYY - HH:MM:SS WIB

  // Simpan data yang sudah ditambah timestamp ke file JSON
  file_put_contents('datasensor.json', json_encode($data, JSON_PRETTY_PRINT));

  // Mengirim respons
  echo json_encode('Data berhasil disimpan'); // Kembalikan pesan dan data
} else if (file_exists('datasensor.json')) {
  echo file_get_contents('datasensor.json');
}