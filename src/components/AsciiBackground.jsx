import { useEffect, useState } from 'react';
import styles from './AsciiBackground.module.css';

export default function AsciiBackground() {
  const [ascii, setAscii] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Грузим тяжелый текст только на ПК, на мобилах теперь идеальная картинка!
    if (!isMobile) {
      fetch('/ascii-art (2).txt')
        .then(res => res.text())
        .then(text => setAscii(text))
        .catch(console.error);
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  return (
    <div className={styles.asciiContainer}>
      {/* GPU-ускоренный луч света с выжигающим свечением */}
      <div className={styles.lightSweeper}></div>

      {isMobile ? (
        <img src="/ascii-art.png" alt="ASCII Art" className={styles.mobileImage} />
      ) : (
        <pre className={styles.asciiText}>{ascii}</pre>
      )}
    </div>
  );
}
