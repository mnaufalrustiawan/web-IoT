document.addEventListener('DOMContentLoaded', function () {
    let touchStartY = 0;
  
    document.addEventListener(
      'touchstart',
      function (event) {
        touchStartY = event.touches[0].clientY; // Simpan posisi awal sentuhan
      },
      { passive: false }
    );
  
    document.addEventListener(
      'touchmove',
      function (event) {
        let touchEndY = event.touches[0].clientY;
  
        // Cegah pull-to-refresh hanya jika pengguna geser ke bawah di bagian atas halaman
        if (window.scrollY === 0 && touchEndY > touchStartY) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
  });