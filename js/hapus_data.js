document.getElementById("tombol-hapus-data").addEventListener("click", async function () {
    const confirmDelete = await Swal.fire({
      title: "Hapus Semua Data?",
      text: "Data grafik akan dihapus permanen!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!"
    });
  
    if (confirmDelete.isConfirmed) {
      try {
        // Mengirim permintaan DELETE ke server
        const response = await fetch(endpoint_url + '/api/hapusdata.php', {
          method: "DELETE",  // Menggunakan metode DELETE
          headers: { "Content-Type": "application/json" }  // Mengatur header Content-Type
        });
  
        const result = await response.json();  // Parsing hasil respons JSON
        if (response.ok) {
          Swal.fire("Dihapus!", result.message, "success");  // Menampilkan pesan sukses
        } else {
          Swal.fire("Gagal!", result.message, "error");  // Menampilkan pesan error
        }
      } catch (error) {
        console.error("Error:", error);
        Swal.fire("Error", "Tidak dapat menghubungi server.", "error");  // Menangani error jaringan
      }
    }

    if (confirmDelete.isConfirmed) {
        try {
          // Mengirim permintaan DELETE ke server
          const response = await fetch(endpoint_url + '/api/hapusdatabase.php', {
            method: "DELETE",  // Menggunakan metode DELETE
            headers: { "Content-Type": "application/json" }  // Mengatur header Content-Type
          });
    
          const result = await response.json();  // Parsing hasil respons JSON
          if (response.ok) {
            Swal.fire("Dihapus!", result.message, "success");  // Menampilkan pesan sukses
          } else {
            Swal.fire("Gagal!", result.message, "error");  // Menampilkan pesan error
          }
        } catch (error) {
          console.error("Error:", error);
          Swal.fire("Error", "Tidak dapat menghubungi server.", "error");  // Menangani error jaringan
        }
      }
  });

  

  
  