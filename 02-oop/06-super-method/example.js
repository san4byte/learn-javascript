// Penjelasan lengkap dapat dibaca pada README.md
// Mengakses method milik parent class yang telah dioverride menggunakan 'super.namaMethod()'

class Shape {
  paint() {
    console.log('Menggambar bentuk Shape dasar');
  }
}

class Circle extends Shape {
  paint() {
    // Memanggil method paint milik parent class (Shape)
    super.paint();
    // Menambahkan aksi khusus milik Circle
    console.log('Menggambar lingkaran Circle');
  }
}

const lingkaran = new Circle();
lingkaran.paint();
