import heroImg from './assets/hero.png';
import javascriptLogo from './assets/javascript.svg';
import viteLogo from './assets/vite.svg';

document.querySelector('#app').innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${javascriptLogo}" class="framework" alt="JavaScript logo"/>
    <img src="${viteLogo}" class="vite" alt="Vite logo" />
  </div>
</section>`;

// Title halaman
const titleElement = document.querySelector('h1');
if (titleElement && import.meta.env.VITE_APP_TITLE) {
  titleElement.textContent = import.meta.env.VITE_APP_TITLE;
}

// Membaca Environment Variables
console.log('--- Vite Environment Variables ---');
console.log('Mode:', import.meta.env.MODE);
console.log('Apakah mode Dev?:', import.meta.env.DEV);
console.log('Judul Aplikasi:', import.meta.env.VITE_APP_TITLE);
console.log('API URL:', import.meta.env.VITE_API_URL);
