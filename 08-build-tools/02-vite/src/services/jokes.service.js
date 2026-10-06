export class JokesService {
  constructor() {
    this.tombolJokes = document.querySelector('#jokes-receh');
    this.modal = document.querySelector('#jokes-modal');
    this.modalText = document.querySelector('#jokes-text');
    this.tombolTutup = document.querySelector('#jokes-close');

    // Listener otomatis untuk menutup modal saat tombol tutup diklik
    if (this.tombolTutup && this.modal) {
      this.tombolTutup.addEventListener('click', () => this.tutupModal());
    }
  }

  /**
   * Mengisi teks lelucon ke dalam modal
   */
  setModal(teks) {
    if (this.modalText) {
      this.modalText.textContent = teks;
    }
  }

  /**
   * Membuka tampilan modal (hapus class hidden)
   */
  bukaModal() {
    if (this.modal) {
      this.modal.classList.remove('hidden');
    }
  }

  /**
   * Menutup tampilan modal (tambah class hidden)
   */
  tutupModal() {
    if (this.modal) {
      this.modal.classList.add('hidden');
    }
  }

  /**
   * Mendaftarkan aksi ketika tombol jokes diklik
   */
  onClick(callback) {
    if (this.tombolJokes) {
      this.tombolJokes.addEventListener('click', callback);
    }
  }
}
