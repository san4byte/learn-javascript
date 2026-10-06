export function stateCounter(initialVal, renderFunc) {
  const state = new Proxy(initialVal, {
    set(target, property, value) {
      target[property] = value;
      renderFunc(target);
      return true;
    },
  });

  renderFunc(state);
  return state;
}
