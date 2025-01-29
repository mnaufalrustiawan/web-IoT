window.onload = () => {
  const statusElement = document.getElementById('device-status');
  const timestampElement = document.getElementById('last-update');
  const dotsElement = document.getElementById('dots');

  if (!statusElement || !timestampElement || !dotsElement) {
    console.error('⚠️ Beberapa elemen tidak ditemukan. Pastikan layout/header.html dimuat.');
    return;
  }

  let offlineTimeout;

  const updateStatusClasses = (isOnline) => {
    if (isOnline) {
      statusElement.textContent = 'Online';
      statusElement.classList.add('text-green-600');
      statusElement.classList.remove('text-red-600');
      dotsElement.classList.add('text-green-600');
      dotsElement.classList.remove('text-red-600');
      dotsElement.classList.remove('fa-fade');
    } else {
      statusElement.textContent = 'Offline';
      statusElement.classList.remove('text-green-600');
      statusElement.classList.add('text-red-600');
      dotsElement.classList.remove('text-green-600');
      dotsElement.classList.add('text-red-600');
      dotsElement.classList.add('fa-fade');
    }
  };

  const updateStatus = () => {
    updateStatusClasses(true); // Set status ke Online

    clearTimeout(offlineTimeout);
    offlineTimeout = setTimeout(() => {
      updateStatusClasses(false); // Set status ke Offline setelah 3 detik
    }, 3000);
  };

  const observer = new MutationObserver(() => {
    if (timestampElement.textContent) {
      updateStatus(); // Update status jika timestamp berubah
    }
  });

  observer.observe(timestampElement, { childList: true, characterData: true, subtree: true });

  updateStatus(); // Cek status awal
};
