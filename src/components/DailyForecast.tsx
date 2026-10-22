import React from 'react';
import type { DailyWeatherAPI } from '../types/weather';
import { parseDailyForecast } from '../utils/forecastParser';
import { convertTemp } from '../utils/temperature';
import styles from './DailyForecast.module.css';

interface DailyForecastProps {
  daily: DailyWeatherAPI | null;
  isFahrenheit: boolean;
}

export const DailyForecast: React.FC<DailyForecastProps> = ({ daily, isFahrenheit }) => {
  if (!daily || !daily.time || daily.time.length === 0) {
    return null;
  }

  const forecastItems = parseDailyForecast(daily);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Dự báo thời tiết 7 ngày tới</h3>
      <div className={styles.forecastGrid}>
        {forecastItems.map((item, index) => (
          <div key={`${item.date}-${index}`} className={styles.dayCard}>
            <span className={styles.dayOfWeek}>{item.dayOfWeek}</span>
            <span className={styles.date}>{item.date}</span>
            <span className={styles.icon}>{item.meta.icon}</span>
            <div className={styles.temps}>
              <span className={styles.maxTemp}>
                Cao: {convertTemp(item.tempMax, isFahrenheit)}
              </span>
              <span className={styles.minTemp}>
                Thấp: {convertTemp(item.tempMin, isFahrenheit)}
              </span>
            </div>
            <span className={styles.desc}>{item.meta.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};