export const toMetters = (decimeter: number): string => {
  const metter = 0.1;
  return `${(decimeter * metter).toLocaleString()} m`;
};

export const toFeet = (decimeter: number): string => {
  const feet = 0.328084;
  return `${(decimeter * feet).toFixed(2)} ft`;
};

export const toKilos = (hectogram: number): string => {
  const kilos = 0.1;
  return `${(hectogram * kilos).toLocaleString()} kg`;
};

export const toPounds = (hectogram: number): string => {
  const pound = 0.220462;
  return `${(hectogram * pound).toFixed(2)} lbs`;
};
