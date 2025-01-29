// Fungsi untuk memuat waktu (timestamp)
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

  // Memanggil fungsi load_waktu saat halaman dimuat
  load_waktu();

  // Fetch data untuk tabel dan tampilkan data
  fetch('api.php')
    .then(response => response.json())
    .then(data => {
      const tableBody1 = document.querySelector('#data-table-1 tbody');
      const tableBody2 = document.querySelector('#data-table-2 tbody');

      // Limit to 3 entries and display data
      const limitedData = data.slice(0, 3);  // Hanya mengambil 3 data pertama

      limitedData.forEach((row, index) => {
        const tr1 = document.createElement('tr');
        tr1.classList.add('border-b', 'border-gray-200');
        tr1.innerHTML = `
          <td class="py-1 px-2">${index + 1}</td>
          <td class="py-1 px-2">${row.ph}</td>
          <td class="py-1 px-2">${row.kelembapan}</td>
          <td class="py-1 px-2">${row.curah_hujan}</td>
          <td class="py-1 px-2">${row.timestamp}</td>
        `;
        tableBody1.appendChild(tr1);

        const tr2 = document.createElement('tr');
        tr2.classList.add('border-b', 'border-gray-200');
        tr2.innerHTML = `
          <td class="py-1 px-2">${index + 1}</td>
          <td class="py-1 px-2">${row.nitrogen}</td>
          <td class="py-1 px-2">${row.fosfor}</td>
          <td class="py-1 px-2">${row.kalium}</td>
          <td class="py-1 px-2">${row.timestamp}</td>
        `;
        tableBody2.appendChild(tr2);
      });
    })
    .catch(error => console.error('Error:', error));