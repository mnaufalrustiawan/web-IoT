const load_data1 = async () => {
  try {
    const response = await fetch(endpoint_url + '/api/data.php');
    if (!response.ok) {
      throw new Error('Network error!');
    }
    const data = await response.json();
    console.log(data);
    document.getElementById('sensorph').textContent = data.ph ?? '-';
    document.getElementById('sensorkelembapan').textContent = data.kelembapan ?? '-';
    document.getElementById('sensorsuhu').textContent = data.suhu ?? '-';
    document.getElementById('sensornitrogen').textContent = data.nitrogen ?? '-';
    document.getElementById('sensorfosfor').textContent = data.fosfor ?? '-';
    document.getElementById('sensorkalium').textContent = data.kalium ?? '-';
    document.getElementById('sensorhujan').textContent = data.curah_hujan ?? '-';
    document.getElementById('last-update').textContent = data.timestamp ?? '-';
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

const load_data2 = async () => {
  try {
    const response = await fetch(endpoint_url + '/api/slider.php');
    if (!response.ok) {
      throw new Error('Network error!');
    }
    const data = await response.json();
    // console.log(data);
    document.getElementById('phminset').textContent = data.sliderminph ?? '-';
    document.getElementById('phmaxset').textContent = data.slidermaxph ?? '-';
    document.getElementById('kelembapanminset').textContent = data.sliderminkelembapan ?? '-';
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

document.addEventListener('DOMContentLoaded', function () {
  load_data1();
  load_data2();
  setInterval(load_data1, 500);
});
