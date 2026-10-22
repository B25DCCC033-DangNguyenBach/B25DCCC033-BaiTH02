import React from 'react';
import type { City, CurrentWeatherAPI } from '../types/weather';
import { getWeatherMeta } from '../utils/weatherCodes';
import { convertTemp } from '../utils/temperature';
import styles from './CurrentWeather.module.css';

interface CurrentWeatherProps {
  city: City | null;
  current: CurrentWeatherAPI | null;
  loading: boolean;
  error: string | null;
  isFahrenheit: boolean;
  onToggleUnit: () => void;
  onRetry: () => void;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  city,
  current,
  loading,
  error,
  isFahrenheit,
  onToggleUnit,
  onRetry,
}) => {
  if (!city) {
    return (
      <div className={styles.stateBox}>
        <p>Vui lòng chọn một thành phố từ danh sách để xem thông tin thời tiết.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.stateBox}>
        <p>Đang tải dữ liệu thời tiết cho {city.name}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.stateBox}>
        <p className={styles.errorText}>Lỗi: {error}</p>
        <button type="button" className={styles.retryBtn} onClick={onRetry}>
          Thử lại
        </button>
      </div>
    );
  }

  if (!current) {
    return null;
  }

  const meta = getWeatherMeta(current.weather_code);
  const formattedTime = new Date(current.time).toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>{city.name}</h2>
        <button type="button" className={styles.unitToggle} onClick={onToggleUnit}>
          Đổi sang {isFahrenheit ? '°C' : '°F'}
        </button>
      </div>

      <div className={styles.mainInfo}>
        <span className={styles.icon}>{meta.icon}</span>
        <div>
          <div className={styles.temp}>{convertTemp(current.temperature_2m, isFahrenheit)}</div>
          <div className={styles.desc}>{meta.description}</div>
        </div>
      </div>

      <div className={styles.gridStats}>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Độ ẩm</span>
          <span className={styles.statValue}>{current.relative_humidity_2m}%</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Tốc độ gió</span>
          <span className={styles.statValue}>{current.wind_speed_10m} km/h</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statLabel}>Mã thời tiết</span>
          <span className={styles.statValue}>WMO {current.weather_code}</span>
        </div>
      </div>

      <p className={styles.updateTime}>Cập nhật lần cuối: {formattedTime}</p>
    </div>
  );
};