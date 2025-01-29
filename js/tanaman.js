// Fungsi untuk mengambil data dari API
const load_waktu = async () => {
  try {
      const response = await fetch(endpoint_url + '/api/data.php');
      if (!response.ok) {
          throw new Error('Network error!');
      }
      const data = await response.json();
      document.getElementById('last-update').textContent = (data.timestamp ?? '-');
  } catch (error) {
      console.error('Error loading data:', error);
  }
};

load_waktu();

// Panggil fungsi load_waktu setelah halaman selesai dimuat
document.addEventListener("DOMContentLoaded", load_waktu);

// Fungsi untuk mengambil data dari API
async function fetchDataFromAPI() {
  try {
      const response = await fetch('/api/data.php'); // Ganti dengan URL API Anda
      if (!response.ok) {
          throw new Error('Gagal mengambil data dari API');
      }
      const data = await response.json();
      return data; // Asumsikan API mengembalikan objek dengan struktur data yang sesuai
  } catch (error) {
      console.error('Error:', error);
      Swal.fire({
          icon: 'error',
          title: 'Gagal',
          text: 'Gagal mengambil data dari API. Cek koneksi atau API Anda.',
      });
      return null;
  }
}

// Fungsi rekomendasi
function rekomendasi(tanaman, ph, kelembapan, n, p, k) {
  const dataTanaman = {
      Padi: { pH: [6.0, 6.5], kelembapan: [60, 70], N: [20, 30], P: [10, 20], K: [15, 25] },
      Jagung: { pH: [5.8, 6.2], kelembapan: [50, 60], N: [25, 35], P: [15, 25], K: [20, 30] },
      // Data tanaman lainnya...
  };

  if (!dataTanaman[tanaman]) {
      return [`Data untuk tanaman ${tanaman} tidak tersedia.`];
  }

  const optimal = dataTanaman[tanaman];
  const rekomendasi = [];

  if (ph < optimal.pH[0]) {
      rekomendasi.push('Tambahkan kapur dolomit untuk menaikkan pH.');
  } else if (ph > optimal.pH[1]) {
      rekomendasi.push('Tambahkan sulfur untuk menurunkan pH.');
  }

  if (kelembapan < optimal.kelembapan[0]) {
      rekomendasi.push('Lakukan irigasi untuk meningkatkan kelembapan.');
  } else if (kelembapan > optimal.kelembapan[1]) {
      rekomendasi.push('Perbaiki drainase untuk mengurangi kelembapan.');
  }

  if (n < optimal.N[0]) {
      rekomendasi.push('Gunakan pupuk kaya nitrogen seperti urea.');
  }
  if (p < optimal.P[0]) {
      rekomendasi.push('Gunakan pupuk fosfat.');
  }
  if (k < optimal.K[0]) {
      rekomendasi.push('Gunakan pupuk kalium.');
  }

  return rekomendasi.length > 0 ? rekomendasi : ['Tanah sudah optimal, tidak perlu perbaikan.'];
}

// Fungsi utama untuk memproses data
async function handleRecommendation(event) {
  event.preventDefault(); // Mencegah form agar tidak refresh halaman

  // Ambil nilai dari form input
  const tanamanElement = document.getElementById('tanaman');
  const tanaman = tanamanElement.value;

  if (!tanaman) {
      Swal.fire({
          icon: 'warning',
          title: 'Peringatan',
          text: 'Silakan pilih jenis tanaman terlebih dahulu!',
      });
      return;
  }

  const apiData = await fetchDataFromAPI();
  if (!apiData) {
      return; // Sudah ditangani oleh SweetAlert2 dalam fetchDataFromAPI
  }

  const ph = apiData.ph || 0;
  const kelembapan = apiData.kelembapan || 0;
  const n = apiData.n || 0;
  const p = apiData.p || 0;
  const k = apiData.k || 0;

  const hasilRekomendasi = rekomendasi(tanaman, ph, kelembapan, n, p, k);

  // Menampilkan hasil menggunakan SweetAlert2
  Swal.fire({
      title: `Rekomendasi untuk ${tanaman}`,
      html: hasilRekomendasi.map((item) => `<p>${item}</p>`).join(''),
      icon: 'info',
      confirmButtonText: 'OK',
  });
}

// Menambahkan event listener pada form untuk menangani submit
document.getElementById('formTanaman').addEventListener('submit', handleRecommendation);
