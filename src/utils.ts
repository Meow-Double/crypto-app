export const percentDifference = (a: number, b: number) => {
  return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2);
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.substr(1)
};
