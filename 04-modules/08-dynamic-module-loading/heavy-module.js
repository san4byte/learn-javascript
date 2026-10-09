// heavy-module.js - Simulasi pustaka analitik berat
console.log('-> [NETWORK]: heavy-module.js baru saja diunduh dan dieksekusi!');

export function renderChart(data) {
  return `[CHART]: Berhasil merender grafik untuk data: ${JSON.stringify(data)}`;
}

export const CHART_VERSION = '5.4.1';

export default {
  theme: 'dark',
  responsive: true,
};
