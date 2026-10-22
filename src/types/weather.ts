export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface CurrentWeatherAPI {
  time: string;
  temperature_2m: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
}

export interface DailyWeatherAPI {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
}

export interface WeatherApiResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  current: CurrentWeatherAPI;
  daily: DailyWeatherAPI;
}

export interface WeatherMeta {
  description: string;
  icon: string;
  theme: "clear" | "cloudy" | "rain" | "thunderstorm" | "snow";
}

export interface DailyForecastItem {
  date: string;
  dayOfWeek: string;
  weatherCode: number;
  tempMax: number;
  tempMin: number;
  meta: WeatherMeta;
}
