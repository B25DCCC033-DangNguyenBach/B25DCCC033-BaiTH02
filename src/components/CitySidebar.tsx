import React, { useState } from 'react';
import type { City } from '../types/weather';
import { removeVietnameseTones } from '../utils/textUtils';
import styles from './CitySidebar.module.css';

interface CitySidebarProps {
  cities: City[];
  selectedCity: City | null;
  onSelectCity: (city: City) => void;
  favoriteIds: string[];
  onToggleFavorite: (cityId: string) => void;
}

export const CitySidebar: React.FC<CitySidebarProps> = ({
  cities,
  selectedCity,
  onSelectCity,
  favoriteIds,
  onToggleFavorite,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = cities.filter((city) => {
    const rawSearch = removeVietnameseTones(searchTerm);
    const rawCityName = removeVietnameseTones(city.name);
    return rawCityName.includes(rawSearch);
  });

  return (
    <aside className={styles.sidebar}>
      <input
        type="text"
        className={styles.searchBox}
        placeholder="Tìm thành phố (vd: da nang, Huế)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <ul className={styles.cityList}>
        {filteredCities.map((city) => {
          const isActive = selectedCity?.id === city.id;
          const isFavorite = favoriteIds.includes(city.id);

          return (
            <li
              key={city.id}
              className={`${styles.cityItem} ${isActive ? styles.active : ''}`}
              onClick={() => onSelectCity(city)}
            >
              <span className={styles.cityName}>
                {city.name} {isFavorite ? '★' : ''}
              </span>
              <button
                type="button"
                className={styles.favButton}
                aria-label={`Yêu thích ${city.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(city.id);
                }}
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            </li>
          );
        })}
        {filteredCities.length === 0 && (
          <li className={styles.emptyMessage}>Không tìm thấy thành phố phù hợp</li>
        )}
      </ul>
    </aside>
  );
};