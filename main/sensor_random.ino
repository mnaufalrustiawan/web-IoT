void sensor_random() {
  // ppm = random(0, 10000) / 10.0;
  ph = random(0, 120) / 10.0;
  // suhu = random(0, 1000) / 10.0;
  kelembapan = random(0, 1000) / 10.0;
  // tank1 = random(0, 100);
  // tank2 = random(0, 100);
  // tank3 = random(0, 100);
  // tank4 = random(0, 100);
}

void proses(){
  if (kelembapan > set_kelembapan_min  ) {
    status_pompa = "OFF";
    // digitalWrite(relay, LOW);
  }else {
    status_pompa = "ON";
    // digitalWrite(relay, ON);
  }
}
// void proses() {
//   // handle pompa ppm
//   if (ppm >= set_ppm_min && ppm <= set_ppm_max) {
//     stat_pompa_a = "OFF";
//     stat_pompa_b = "OFF";
//     // digitalWrite(relayA, LOW);
//     // digitalWrite(relayB, LOW);
//     // kalau salah tinggal dibalik
//   } else {
//     stat_pompa_a = "ON";
//     stat_pompa_b = "ON";
//     // digitalWrite(relayA, HIGH);
//     // digitalWrite(relayB, HIGH);
//     // kalau salah tinggal dibalik
//   }

//   // handle pompa ph
//   if (ph >= set_ph_min && ph <= set_ph_max) {
//     stat_pompa_up = "OFF";
//     stat_pompa_down = "OFF";
//     // digitalWrite(relayUP, LOW);
//     // digitalWrite(relayDOWN, LOW);
//     // kalau salah tinggal dibalik
//   } else if (ph < set_ph_min) {
//     stat_pompa_up = "OFF";
//     stat_pompa_down = "ON";
//     // digitalWrite(relayUP, LOW);
//     // digitalWrite(relayDOWN, HIGH);
//     // kalau salah tinggal dibalik
//   } else if (ph > set_ph_max) {
//     stat_pompa_up = "ON";
//     stat_pompa_down = "OFF";
//     // digitalWrite(relayUP, HIGH);
//     // digitalWrite(relayDOWN, LOW);
//     // kalau salah tinggal dibalik
//   }
// }
