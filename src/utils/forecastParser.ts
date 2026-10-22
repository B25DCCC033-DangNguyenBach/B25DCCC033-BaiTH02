import type { DailyWeatherAPI, DailyForecastItem } from '../types/weather';
import { getWeatherMeta } from './weatherCodes';

export const parseDailyForecast = (daily: DailyWeatherAPI): DailyForecastItem[] => {
  const result: DailyForecastItem[] = [];
  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];

  const length = daily.time.length;
  for (let i = 0; i < length; i += 1) {
    const rawDate = daily.time[i];
    const dateObj = new Date(rawDate);
    const dayName = daysOfWeek[dateObj.getDay()];
    const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;

    result.push({
      date: formattedDate,
      dayOfWeek: dayName,
      weatherCode: daily.weather_code[i],
      tempMax: daily.temperature_2m_max[i],
      tempMin: daily.temperature_2m_min[i],
      meta: getWeatherMeta(daily.weather_code[i]),
    });
  }

  return result;
};