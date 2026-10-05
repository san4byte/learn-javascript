// PZN: AJAX Klasik menggunakan XMLHttpRequest (XHR)
const btn = document.getElementById("btn-request");
const output = document.getElementById("output");

btn?.addEventListener("click", () => {
  const xhr = new XMLHttpRequest();
  const url = "https://jsonplaceholder.typicode.com/posts/1";

  // Membuka koneksi HTTP GET secara asynchronous (true)
  xhr.open("GET", url, true);

  // Event listener saat status koneksi berubah
  xhr.onreadystatechange = function () {
    // readyState 4: DONE, status 200: OK
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const responseData = JSON.parse(xhr.responseText);
        output.textContent = JSON.stringify(responseData, null, 2);
        console.log("AJAX Sukses:", responseData);
      } else {
        console.error("AJAX Gagal:", xhr.statusText);
      }
    }
  };

  // Mengirim request
  xhr.send();
});
