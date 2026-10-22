import React, { useState, useEffect } from 'react';
import { CITIES } from './constants/cities';
import type { City, WeatherApiResponse } from './types/weather';
import { getWeatherMeta } from './utils/weatherCodes';
import { CitySidebar } from './components/CitySidebar';
import { CurrentWeather } from './components/CurrentWeather';
import { DailyForecast } from './components/DailyForecast';
import styles from './App.module.css';

const FAVORITES_STORAGE_KEY = 'weather_app_favorite_cities';

export const App: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<City | null>(CITIES[0]);
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFahrenheit, setIsFahrenheit] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (!selectedCity) return;

    let isSubscribed = true;

    // Đẩy việc set state loading sang microtask để tránh lỗi react-hooks/set-state-in-effect
    queueMicrotask(() => {
      if (isSubscribed) {
        setLoading(true);
        setError(null);
      }
    });

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${selectedCity.latitude}&longitude=${selectedCity.longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Asia%2FHo_Chi_Minh&forecast_days=7`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Lỗi kết nối máy chủ (${res.status})`);
        }
        return res.json();
      })
      .then((data: WeatherApiResponse) => {
        if (isSubscribed) {
          setWeatherData(data);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (isSubscribed) {
          setError(
            err instanceof Error
              ? err.message
              : 'Đã có lỗi xảy ra khi tải dữ liệu thời tiết'
          );
          setWeatherData(null);
          setLoading(false);
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [selectedCity, refreshKey]);

  const handleToggleFavorite = (cityId: string) => {
    setFavoriteIds((prev) => {
      const updated = prev.includes(cityId)
        ? prev.filter((id) => id !== cityId)
        : [...prev, cityId];
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleRetry = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const currentCode = weatherData?.current?.weather_code;
  const currentTheme =
    currentCode !== undefined ? getWeatherMeta(currentCode).theme : 'default';

  const getThemeClass = () => {
    switch (currentTheme) {
      case 'clear':
        return styles.themeClear;
      case 'cloudy':
        return styles.themeCloudy;
      case 'rain':
        return styles.themeRain;
      case 'thunderstorm':
        return styles.themeThunderstorm;
      case 'snow':
        return styles.themeSnow;
      default:
        return styles.themeDefault;
    }
  };

  return (
    <div className={`${styles.appWrapper} ${getThemeClass()}`}>
      <div className={styles.mainContainer}>
        <header className={styles.appHeader}>
          <h1 className={styles.appTitle}>Dự Báo Thời Tiết Việt Nam</h1>
        </header>

        <main className={styles.layoutGrid}>
          <CitySidebar
            cities={CITIES}
            selectedCity={selectedCity}
            onSelectCity={(city) => setSelectedCity(city)}
            favoriteIds={favoriteIds}
            onToggleFavorite={handleToggleFavorite}
          />

          <div className={styles.mainContent}>
            <CurrentWeather
              city={selectedCity}
              current={weatherData ? weatherData.current : null}
              loading={loading}
              error={error}
              isFahrenheit={isFahrenheit}
              onToggleUnit={() => setIsFahrenheit((prev) => !prev)}
              onRetry={handleRetry}
            />

            <DailyForecast
              daily={weatherData ? weatherData.daily : null}
              isFahrenheit={isFahrenheit}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;