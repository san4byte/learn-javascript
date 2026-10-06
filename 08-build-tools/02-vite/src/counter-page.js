import { stateCounter } from './utils/state-counter.js';

const button = document.querySelector('#counter-btn');

const state = stateCounter({ count: 0 }, (currentState) => {
  if (button) {
    button.textContent = `Hitungan: ${currentState.count} (Reaktif!)`;
  }
});

button.addEventListener('click', () => {
  state.count += 1;
});
