<?php
header("Access-Control-Allow-Origin: *");  // Mengizinkan akses dari semua origin
header("Access-Control-Allow-Methods: DELETE");  // Mengizinkan metode DELETE
header("Access-Control-Allow-Headers: Content-Type");  // Mengizinkan header Content-Type

include 'koneksi.php';  // Pastikan koneksi ke database sudah benar

// Path ke file datagrafik.json
$file_path = "datagrafik.json";

// Cek apakah request method adalah DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Menghapus file datagrafik.json jika ada
    if (file_exists($file_path)) {
        if (unlink($file_path)) {
            // Menghapus data dari database
            $sql = "DELETE FROM sensor";  // Ganti dengan nama tabel yang sesuai

            if ($conn->query($sql) === TRUE) {
                echo json_encode(["message" => "File dan data berhasil dihapus."]);
            } else {
                echo json_encode(["message" => "Terjadi kesalahan saat menghapus data dari database: " . $conn->error]);
            }
        } else {
            echo json_encode(["message" => "Terjadi kesalahan saat menghapus file."]);
        }
    } else {
        echo json_encode(["message" => "File tidak ditemukan."]);
    }
} else {
    echo json_encode(["message" => "Metode request tidak valid."]);
}

// Menutup koneksi
$conn->close();
