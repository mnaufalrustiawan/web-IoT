document.getElementById('predict-button').addEventListener('click', function () {
  // Menyiapkan data yang akan dikirim ke server
  const data = {
    N: parseFloat(document.getElementById('sensorph').textContent) || 0, // pH
    P: parseFloat(document.getElementById('sensorkelembapan').textContent) || 0, // Kelembapan
    K: parseFloat(document.getElementById('sensorsuhu').textContent) || 0, // Suhu
    temperature: parseFloat(document.getElementById('sensornitrogen').textContent) || 0, // Nitrogen
    humidity: parseFloat(document.getElementById('sensorfosfor').textContent) || 0, // Fosfor
    ph: parseFloat(document.getElementById('sensorkalium').textContent) || 0, // Kalium
    rainfall: parseFloat(document.getElementById('sensorhujan').textContent) || 0, // Curah Hujan
  };

  // Pemetaan hasil prediksi (Inggris ke Indonesia)
  const crop_translation = Object.freeze({
    rice: 'Padi',
    maize: 'Jagung',
    chickpea: 'Kacang Arab',
    kidneybeans: 'Kacang Merah',
    pigeonpeas: 'Kacang Gude',
    mothbeans: 'Kacang Moth',
    mungbean: 'Kacang Hijau',
    blackgram: 'Kacang Hitam',
    lentil: 'Kacang Lentil',
    pomegranate: 'Delima',
    banana: 'Pisang',
    mango: 'Mangga',
    grapes: 'Anggur',
    watermelon: 'Semangka',
    muskmelon: 'Blewah',
    apple: 'Apel',
    orange: 'Jeruk',
    papaya: 'Pepaya',
    coconut: 'Kelapa',
    cotton: 'Kapas',
    jute: 'Rami',
    coffee: 'Kopi',
  });

  // URL server sebagai konstanta
  const API_URL = 'https://crop-recommendation-app-197090184914.asia-southeast1.run.app/predict';

  // Mengirimkan data ke server menggunakan fetch API
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // Menerjemahkan hasil prediksi jika ada di dalam daftar
      const cropName = data.crop;
      const translatedCrop = crop_translation[cropName] || cropName; // Jika tidak ada di daftar, tetap pakai aslinya

      // Menampilkan hasil prediksi menggunakan SweetAlert dengan hasil di title
      Swal.fire({
        title: `${translatedCrop}`,
        text: 'tanaman yang bagus untuk di tanam',
        icon: 'success',
        confirmButtonText: 'Oke'
      });
    })
    .catch((error) => {
      console.error('Terjadi kesalahan:', error);
      Swal.fire({
        title: 'Kesalahan',
        text: 'Terjadi kesalahan saat mengirim data.',
        icon: 'error',
        confirmButtonText: 'Coba Lagi'
      });
    });
});
