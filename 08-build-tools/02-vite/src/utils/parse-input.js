export const parseInput = (...inputs) => {
  return inputs.map((str) => (str.trim() === '' ? '' : Number(str)));
};
