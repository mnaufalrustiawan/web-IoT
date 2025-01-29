document.addEventListener('DOMContentLoaded', function () {
  function updatePumpTextColor() {
    var pumpIds = ['statuspompa'];
    for (var i = 0; i < pumpIds.length; i++) {
      var pumpElement = document.getElementById(pumpIds[i]);
      if (pumpElement) {
        if (pumpElement.textContent.trim() === 'ON') {
          pumpElement.classList.add('bg-green-500', 'bg-opacity-80', 'text-black', 'text-opacity-80');
          pumpElement.classList.remove('bg-white', 'text-white');
        } else {
          pumpElement.classList.add('bg-gray-500', 'text-white');
          pumpElement.classList.remove('bg-green-500', 'bg-opacity-80', 'text-black', 'text-opacity-80');
        }
      }
    }
  }

  var observer = new MutationObserver(function () {
    updatePumpTextColor();
  });

  var config = {
    childList: true,
    characterData: true,
    subtree: true,
  };

  var sensorNodes = [document.getElementById('statuspompa')].filter(Boolean);

  // Mulai mengawasi elemen-elemen yang ada
  sensorNodes.forEach(function (node) {
    if (node) observer.observe(node, config);
  });

  updatePumpTextColor();
});
