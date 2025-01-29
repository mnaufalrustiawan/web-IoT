const API_URL = endpoint_url + '/api/grafik.php';
const FETCH_INTERVAL = 3000;
const TIME_FETCH_INTERVAL = 1000; // Lebih cepat dari FETCH_INTERVAL

const DEFAULT_FONT_OPTIONS = {
  color: 'gray',
  size: 13,
  family: 'Montserrat',
  weight: '600'
};

const chartConfigs = [
  { label: 'pH', yMin: 0, yMax: 14, color: '#32a4ea' },
  { label: 'Humidity', yMin: 0, yMax: 100, color: '#fc5c91' },
  { label: 'Temperature', yMin: 0, yMax: 50, color: '#ffad33' },
  { label: 'Nitrogen', yMin: 0, yMax: 200, color: '#32a4ea' },
  { label: 'Phosphorus', yMin: 0, yMax: 500, color: '#fc5c91' },
  { label: 'Potassium', yMin: 0, yMax: 300, color: '#ffad33' },
  { label: 'Curah Hujan', yMin: 0, yMax: 300, color: '#32a4ea' }
];

const charts = chartConfigs.map((config, index) =>
  new Chart(document.getElementById(`chart-${index + 1}`).getContext('2d'), createChartConfig(config))
);

function createChartConfig({ label, yMin, yMax, color }) {
  const ctx = document.getElementById(`chart-${chartConfigs.findIndex(config => config.label === label) + 1}`).getContext('2d');

  const gradient = ctx.createLinearGradient(0, 0, 0, 300);
  gradient.addColorStop(0, color);
  gradient.addColorStop(1, `${color}00`); // Transparan di bawah

  return {
    type: 'line',
    data: {
      labels: [],
      datasets: [{
        label,
        data: [],
        borderColor: color,
        backgroundColor: gradient,
        fill: true,
        tension: 0.5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          enabled: false // Menyembunyikan tooltip
        }
      },
      scales: {
        y: {
          min: yMin,
          max: yMax,
          ticks: {
            color: DEFAULT_FONT_OPTIONS.color,
            font: {
              size: DEFAULT_FONT_OPTIONS.size,
              family: DEFAULT_FONT_OPTIONS.family,
              weight: DEFAULT_FONT_OPTIONS.weight
            }
          },
          grid: { display: false }
        },
        x: {
          ticks: {
            color: DEFAULT_FONT_OPTIONS.color,
            font: {
              size: DEFAULT_FONT_OPTIONS.size,
              family: DEFAULT_FONT_OPTIONS.family,
              weight: DEFAULT_FONT_OPTIONS.weight
            },
            maxRotation: 45, // Memutar label agar tidak tumpang tindih
            minRotation: 45
          },
          grid: { display: false }
        }
      }
    }
  };
}

const updateCharts = (data) => {
  const dataArrays = charts.map(chart => chart.data.datasets[0].data);
  const labelsArrays = charts.map(chart => chart.data.labels);

  dataArrays[0].splice(0, dataArrays[0].length, ...data.map(entry => entry.ph)); // pH
  dataArrays[1].splice(0, dataArrays[1].length, ...data.map(entry => entry.kelembapan)); // Kelembapan
  dataArrays[2].splice(0, dataArrays[2].length, ...data.map(entry => entry.suhu)); // Suhu
  dataArrays[3].splice(0, dataArrays[3].length, ...data.map(entry => entry.nitrogen)); // Nitrogen
  dataArrays[4].splice(0, dataArrays[4].length, ...data.map(entry => entry.fosfor)); // Fosfor
  dataArrays[5].splice(0, dataArrays[5].length, ...data.map(entry => entry.kalium)); // Kalium
  dataArrays[6].splice(0, dataArrays[6].length, ...data.map(entry => entry.curah_hujan)); // Curah Hujan

  const timestamps = data.map(entry => {
    const timeMatch = entry.timestamp.match(/\d{2}:\d{2}:\d{2}/);
    return timeMatch ? timeMatch[0] : ''; // Jika match, ambil hasilnya
  });
  labelsArrays.forEach(labels => labels.splice(0, labels.length, ...timestamps));

  charts.forEach(chart => chart.update());
};

const load_grafik = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    updateCharts(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const load_waktu = async () => {
  try {
    const response = await fetch(endpoint_url + '/api/data.php');
    if (!response.ok) {
      throw new Error('Network error!');
    }
    const data = await response.json();
    document.getElementById('last-update').textContent = data.timestamp ?? '-';
  } catch (error) {
    console.error('Error loading data:', error);
  }
};

load_grafik();
load_waktu();

setInterval(load_grafik, FETCH_INTERVAL);
setInterval(load_waktu, TIME_FETCH_INTERVAL);
