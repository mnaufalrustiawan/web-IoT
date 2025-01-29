document.addEventListener('DOMContentLoaded', function () {
  const sliders = ['sliderminph', 'slidermaxph', 'sliderminkelembapan'];
  const displayElements = {
    sliderminph: 'ph-min',
    slidermaxph: 'ph-max',
    sliderminkelembapan: 'kelembapan-min',
  };

  const updateSliderDisplay = () => {
    sliders.forEach((id) => {
      const slider = document.getElementById(id);
      document.getElementById(displayElements[id]).textContent = slider.value;
    });
  };

  const getSliders = async () => {
    try {
      const response = await fetch(endpoint_url + '/api/slider.php');
      const data = await response.json();
      sliders.forEach((id) => {
        document.getElementById(id).value = data[id];
      });
      updateSliderDisplay();
    } catch (error) {
      console.error('Error loading slider values:', error);
    }
  };

  const saveSliderValue = async (id, value) => {
    const sliderData = { [id]: value };
    try {
      const response = await fetch(endpoint_url + '/api/slider.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sliderData),
      });
      const responseData = await response.json();
      console.log(`Slider ${id} updated to ${value}. Server response:`, responseData);
    } catch (error) {
      console.error(`Error sending value of slider ${id}:`, error);
    }
  };

  sliders.forEach((id) => {
    const slider = document.getElementById(id);
    slider.addEventListener('input', () => {
      updateSliderDisplay();
      saveSliderValue(id, slider.value); // Update satu per satu sesuai yang digeser
    });
  });

  getSliders();
});

//////////////////////////////////////////////////////////////////////////////////////////

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

load_waktu();

setInterval(() => {
  load_waktu();
}, 1000);
