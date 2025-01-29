
# Tutorial Clone Repository dari GitHub

Untuk meng-clone repository GitHub ke komputer kamu, ikuti langkah-langkah di bawah ini:

### 1. **Salin URL Repository**
Pertama, kamu perlu menyalin URL dari repository yang ingin di-clone.  
URL ini bisa ditemukan di halaman utama repository di GitHub. Klik tombol **"Code"** dan salin URL yang muncul, seperti berikut:
- **HTTPS**: `https://github.com/username/repository_name.git`
- **SSH**: `git@github.com:username/repository_name.git` (jika sudah mengkonfigurasi SSH key)

### 2. **Buka Terminal atau Command Prompt**
Buka terminal di komputer kamu (atau command prompt jika menggunakan Windows).

### 3. **Pilih Lokasi Penyimpanan**
Arahkan terminal ke folder di mana kamu ingin menyimpan salinan repository. Gunakan perintah `cd` untuk berpindah direktori. Contoh:
```bash
cd /path/to/your/directory
```

### 4. **Clone Repository**
Setelah berada di lokasi yang tepat, jalankan perintah berikut untuk meng-clone repository ke komputer kamu:
```bash
git clone https://github.com/username/repository_name.git
```
Jika kamu menggunakan SSH, gunakan perintah:
```bash
git clone git@github.com:username/repository_name.git
```

### 5. **Masuk ke Folder Repository**
Setelah proses clone selesai, masuk ke folder repository yang baru saja kamu clone dengan perintah:
```bash
cd repository_name
```

### 6. **Cek Isi Repository**
Kamu bisa mengecek isi folder repository dengan perintah `ls` (Linux/macOS) atau `dir` (Windows). Pastikan file dan folder dari repository telah ter-clone dengan benar.
