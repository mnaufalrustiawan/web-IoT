document.addEventListener('DOMContentLoaded', () => {
    const downloadCsvButton = document.getElementById('tombol-download');
    downloadCsvButton.addEventListener('click', async (event) => {
      event.preventDefault();
  
      // Show confirmation
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You want to download the data?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Download',
        cancelButtonText: 'Cancel',
      });
  
      // If the user confirms, proceed with the download
      if (result.isConfirmed) {
        try {
          const response = await fetch('api/download.php');
  
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
  
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Device Data.csv'); // File name to be downloaded
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('Failed to download data:', error);
          Swal.fire('Failed!', 'Failed to download data.', 'error');
        }
      }
    });
  });
  