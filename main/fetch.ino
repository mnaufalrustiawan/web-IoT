void simpan_ke_database(String method, String endpoint_path) {
  // Menyiapkan objek JSON untuk data yang akan dikirim
  StaticJsonDocument<1000> json_doc;
  json_doc["ph"] = String(ph, 1); // Menyimpan nilai ph
  json_doc["kelembapan"] = String(kelembapan, 1); // Menyimpan nilai kelembapan

  String datastream;
  serializeJson(json_doc, datastream);

  // Membuat objek HTTPClient dan mengirim request
  WiFiClient client;
  HTTPClient http;
  http.begin(client, endpoint + endpoint_path);  // Menggunakan endpoint dinamis

  http.addHeader("Content-Type", "application/json");

  int httpcode = 0;
  if (method == "POST") {
    // Mengirim request POST dengan data
    httpcode = http.POST(datastream);
  } else if (method == "GET") {
    // Jika metode GET, bisa digunakan jika diperlukan untuk mengambil data (misalnya dari database)
    httpcode = http.GET();
  }

  // Mengecek respons dari server
  if (httpcode == 200) {
    String respon = http.getString();
    Serial.println("Respons: " + respon); // Menampilkan respons server jika berhasil
  } else {
    Serial.println("Error POST!"); // Menampilkan error jika POST gagal
  }

  // Menutup koneksi HTTP
  http.end();
}


void fetch_data(String method, String endpoint_path) {
  WiFiClient client;
  HTTPClient http;
  http.begin(client, endpoint + endpoint_path);

  int httpcode;
  if (method == "GET") {
    httpcode = http.GET();
  } else if (method == "POST") {
    StaticJsonDocument<1000> json_doc;
    // json_doc["ppm"] = String(ppm, 0);
    json_doc["ph"] = String(ph, 1);
    // json_doc["suhu"] = String(suhu, 1);
    json_doc["kelembapan"] = String(kelembapan, 1);
    json_doc["status_pompa"] = status_pompa;
    // json_doc["stat_pompa_down"] = stat_pompa_down;
    // json_doc["stat_pompa_up"] = stat_pompa_up;
    // json_doc["stat_pompa_a"] = stat_pompa_a;
    // json_doc["stat_pompa_b"] = stat_pompa_b;
    // json_doc["tank1"] = String(tank1, 0);
    // json_doc["tank2"] = String(tank2, 0);
    // json_doc["tank3"] = String(tank3, 0);
    // json_doc["tank4"] = String(tank4, 0);

    String datastream;
    serializeJson(json_doc, datastream);
    http.addHeader("Content-Type", "application/json");
    httpcode = http.POST(datastream);
  }

  if (httpcode == 200) {
    String respon = http.getString();
    Serial.println(String() + "Respons " + method + ": " + respon);

    if (method == "GET" && respon != "") {
      DynamicJsonDocument doc(100);
      deserializeJson(doc, respon);
      set_kelembapan_min = doc["sliderminkelembapan"];
      set_ph_max = doc["slidermaxph"];
      set_ph_min = doc["sliderminph"];
    }
  } else {
    Serial.println(method + " Error!");
  }

  http.end();
}

// Fungsi untuk GET data
void get_data() {
  fetch_data("GET", "/slider.php");
}

// Fungsi untuk POST data ke api_data.php
void post_data() {
  simpan_ke_database("POST", "/simpandatabase.php");
  fetch_data("POST", "/data.php");
  fetch_data("POST", "/grafik.php");

}