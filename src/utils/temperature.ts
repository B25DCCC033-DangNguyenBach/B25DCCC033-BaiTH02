export const convertTemp = (celsius: number, isFahrenheit: boolean): string => {
  if (isFahrenheit) {
    const fahrenheit = (celsius * 9) / 5 + 32;
    return `${fahrenheit.toFixed(1)}°F`;
  }
  return `${celsius.toFixed(1)}°C`;
};