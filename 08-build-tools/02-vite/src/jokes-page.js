// src/jokes-page.js
import { JokesService } from '@/services/jokes.service.js';

const jokesService = new JokesService();

jokesService.onClick(() => {
  // 1. Tampilkan modal dengan teks loading
  jokesService.bukaModal();
  jokesService.setModal('Sedang mengambil lelucon receh... ⏳');

  // 2. Panggil API candaan
  fetch('https://candaan-api.vercel.app/api/text/random')
    .then((response) => response.json())
    .then((data) => {
      jokesService.setModal(data.data);
    })
    .catch(() => {
      // Cadangan teks lelucon jika koneksi internet bermasalah
      const fallbacks = [
        'Kenapa programmer suka kopi? Karena hidupnya penuh bug butuh semangat!',
        'Ada 10 jenis orang di dunia: yang paham biner, dan yang tidak.',
        'Kenapa keyboard ada tombol ESC? Biar bisa kabur dari kenyataan.',
      ];
      const random = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      jokesService.setModal(random);
    });
});
