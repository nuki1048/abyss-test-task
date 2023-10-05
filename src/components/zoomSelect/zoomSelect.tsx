import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

import styles from './zoomSelect.module.css';

const array = Array.from({ length: 10 }, (_, index) => (index + 1) * 10);

const ZoomSelect = (): JSX.Element => {
  const { zoom, setZoom } = useTheme();
  useEffect(() => {}, [zoom]);

  return (
    <select
      className={styles.select}
      value={zoom}
      onChange={(e) => setZoom(e.target.value)}
    >
      {array.map((item) => (
        <option value={`${item}%`} key={`id-${item}`}>
          {item}%
        </option>
      ))}
    </select>
  );
};

export default ZoomSelect;
