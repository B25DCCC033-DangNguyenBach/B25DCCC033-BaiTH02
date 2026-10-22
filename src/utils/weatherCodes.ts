import type { WeatherMeta } from '../types/weather';

export const getWeatherMeta = (code: number): WeatherMeta => {
  if (code === 0) {
    return { description: 'Trời quang', icon: '☀️', theme: 'clear' };
  }
  if (code === 1 || code === 2) {
    return { description: 'Ít mây / Quang đãng', icon: '🌤️', theme: 'clear' };
  }
  if (code === 3) {
    return { description: 'Nhiều mây', icon: '☁️', theme: 'cloudy' };
  }
  if (code === 45 || code === 48) {
    return { description: 'Có sương mù', icon: '🌫️', theme: 'cloudy' };
  }
  if ([51, 53, 55, 56, 57].includes(code)) {
    return { description: 'Mưa phùn nhẹ', icon: '🌦️', theme: 'rain' };
  }
  if ([61, 63, 65, 66, 67].includes(code)) {
    return { description: 'Trời mưa', icon: '🌧️', theme: 'rain' };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) {
    return { description: 'Mưa tuyết / Băng giá', icon: '❄️', theme: 'snow' };
  }
  if ([80, 81, 82].includes(code)) {
    return { description: 'Mưa rào lớn', icon: '🌧️', theme: 'rain' };
  }
  if ([95, 96, 99].includes(code)) {
    return { description: 'Dông sét', icon: '⛈️', theme: 'thunderstorm' };
  }
  return { description: 'Thời tiết ổn định', icon: '🌤️', theme: 'cloudy' };
};