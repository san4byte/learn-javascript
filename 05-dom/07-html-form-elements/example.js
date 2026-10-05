// DOM: Mengelola form, value, dan submit event
const form = document.getElementById('comment-form');
const outputDiv = document.getElementById('output');

form.addEventListener('submit', function (event) {
  // 1. Mencegah perilaku default browser (page reload)
  event.preventDefault();

  // 2. Mengakses nilai input form
  const inputNama = document.getElementById('nama').value;
  const inputPesan = document.getElementById('pesan').value;

  // 3. Menampilkan hasil
  outputDiv.style.display = 'block';
  outputDiv.innerHTML = `<strong>Komentar Berhasil Terkirim:</strong><br>
                         Pengirim: <em>${inputNama}</em><br>
                         Pesan: <em>${inputPesan}</em>`;

  // 4. Reset form
  form.reset();
});
