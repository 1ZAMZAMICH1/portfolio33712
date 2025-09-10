import { useState, useEffect, useRef } from 'react'; // ВОТ ЭТА СТРОЧКА
import Typed from 'typed.js';
import styles from './Preloader.module.css';

function Preloader({ onLoaded }) {
  const [isHiding, setIsHiding] = useState(false);
  const el = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHiding(true);
    }, 7000);

    const typed = new Typed(el.current, {
      strings: ["Обожди...", "Ща загрузится..."],
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1500,
      loop: true,
    });

    return () => {
      clearTimeout(timer);
      typed.destroy();
    };
  }, []);

  return (
    <div 
      className={`${styles.preloader} ${isHiding ? styles.hiding : ''}`}
      onTransitionEnd={onLoaded}
    >
      <div className={styles.content}>
        <img src="/logo.png" alt="Загрузка..." className={styles.logo} />
        <p className={styles.loadingText}>
          <span ref={el}></span>
        </p>
      </div>
    </div>
  );
}

export default Preloader;