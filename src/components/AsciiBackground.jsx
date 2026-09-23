import { useEffect, useState } from 'react';
import styles from './AsciiBackground.module.css';

export default function AsciiBackground() {
  const [ascii, setAscii] = useState('');

  useEffect(() => {
    // Выбираем файл в зависимости от ширины экрана (мобилка или ПК)
    const isMobile = window.innerWidth <= 900;
    const artFile = isMobile ? '/ascii-art (4).txt' : '/ascii-art (2).txt';
    
    fetch(artFile)
      .then(res => res.text())
      .then(text => setAscii(text))
      .catch(console.error);
  }, []);

  return (
    <div className={styles.asciiContainer}>
      {/* GPU-ускоренный луч света с выжигающим свечением */}
      <div className={styles.lightSweeper}></div>

      <pre className={styles.asciiText}>{ascii}</pre>
    </div>
  );
}
