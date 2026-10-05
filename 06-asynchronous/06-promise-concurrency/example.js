// Async: Concurrency Promise (all, race, any, allSettled)

const createPromise = (name, delayMs, succeed = true) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (succeed) {
        resolve(`[SUKSES] ${name} selesai dalam ${delayMs}ms`);
      } else {
        reject(new Error(`[GAGAL] ${name} error`));
      }
    }, delayMs);
  });
};

const p1 = createPromise('Service User', 100);
const p2 = createPromise('Service Payment', 200);
const p3 = createPromise('Service Notifikasi', 150);

// 1. Promise.all: Menunggu SEMUA selesai, gagal jika 1 saja gagal
Promise.all([p1, p2, p3])
  .then((results) => {
    console.log('--- Promise.all Selesai Bersama ---');
    console.log(results);
  })
  .catch((err) => console.error(err));

// 2. Promise.race: Mengambil yang PALING CEPAT selesai (baik resolve maupun reject)
const f1 = createPromise('Fast Server', 80);
const f2 = createPromise('Slow Server', 300);

Promise.race([f1, f2]).then((winner) => {
  console.log('--- Promise.race Winner ---');
  console.log('Pemenang:', winner);
});
