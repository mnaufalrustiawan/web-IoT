// #include <WiFi.h>
// #include <HTTPClient.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#include <ArduinoJson.h>
// #include <ArduinoOTA.h>
#include <ESPAsyncWebServer.h>

int ledPin = 2;

// INISIALISASI GLOBAL
float ph, kelembapan;
float set_kelembapan_min, set_kelembapan_max, set_ph_min, set_ph_max;
// String stat_pompa_up, stat_pompa_down, stat_pompa_a, stat_pompa_b;
String status_pompa;

// Create an instance of the server
AsyncWebServer server(80);

// INISIALISASI HTTP
String endpoint = "http://naufalrzt.my.id/api";  //sesuaikan


// Ganti SSID dan password STA
const char *ssid = "RAJWA";
const char *password = "rajwahilal01";

// IP addresses STA
// IPAddress local_ip(192, 168, 100, 10);  // Custom IP
// IPAddress gateway(192, 168, 100, 1);    // Custom Gateway
// IPAddress subnet(255, 255, 255, 0);     // Subnet mask

void setup() {
  Serial.begin(115200);
  
  // Menentukan mode pin sebagai OUTPUT
  pinMode(ledPin, OUTPUT);
  // Setup WiFi dengan IP kustom
  // WiFi.config(local_ip, gateway, subnet);  // Set IP statis
  WiFi.begin(ssid, password);              // Connect to WiFi

  Serial.println("");
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println("");
  Serial.print("Connected to WiFi. IP Address: ");
  Serial.println(WiFi.localIP());

  // Start the server
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  digitalWrite(ledPin, HIGH);
  sensor_random();
  proses();
  get_data();
  post_data();

  digitalWrite(ledPin, LOW);
  // print();
  delay(2000);

}