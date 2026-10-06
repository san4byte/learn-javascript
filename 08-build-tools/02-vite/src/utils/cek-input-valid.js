export const cekInputValid = (...inputs) => {
  return inputs.every((inp) => typeof inp === 'number' && !Number.isNaN(inp));
};
