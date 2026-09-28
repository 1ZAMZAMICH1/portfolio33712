import { useState } from 'react';
import AnimatedBackground from '../components/AnimatedBackground';
import AsciiBackground from '../components/AsciiBackground';
import LiquidGold from '../components/LiquidGold';
import VhsCategories from '../components/VhsCategories';
import About from '../components/About';
import Contacts from '../components/Contacts';
import styles from '../App.module.css';

function HomePage() {
  const [activeTab, setActiveTab] = useState('home');
  const [isSwitching, setIsSwitching] = useState(false);

  const switchTab = (tab) => {
    if (tab === activeTab) return;
    setIsSwitching(true);
    // Мягкий и красивый эффект выключения ЭЛТ-монитора (450ms)
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => setIsSwitching(false), 50);
    }, 450);
  };

  return (
    <div className={styles.osWindow}>
      {/* ASCII-фон ТОЛЬКО на главной странице - Не демонтируем, просто скрываем! */}
      <div 
        className={styles.bgParallax}
        style={{ display: activeTab === 'home' ? 'block' : 'none' }}
      >
        <AsciiBackground />
      </div>

      {/* Огромный глитчующий логотип на заднем фоне (виден при сворачивании окон) */}
      <div className={styles.transitionLogoBg}>
        <img src="/logo.png" className={isSwitching ? styles.logoGlitching : ''} alt="ZAMZAMICH" />
      </div>

      {/* Окно активной программы с плавным ТВ-переходом */}
      <main className={`${styles.osContent} ${isSwitching ? styles.contentGlitching : ''}`}>
        
        {/* ГЛАВНАЯ СТРАНИЦА */}
        <div 
          className={styles.homeViewport} 
          style={{ display: activeTab === 'home' ? '' : 'none' }}
        >
          <div className={styles.photoContainer}>
            <div className={`${styles.frameContainer} ${styles.backFrame}`}></div>
            <div className={`${styles.frameContainer} ${styles.frontFrame}`}></div>
          </div>

          <img src="/my-photo.png" alt="Портрет" className={styles.userPhoto} />

          <div className={styles.textContainer}>
            <img src="/3456743.png" alt="Имя Фамилия" className={styles.nameImage} />
            <div className={styles.roleContainer}>
              <span className={styles.roleLine}>ГРАФИЧЕСКИЙ ДИЗАЙНЕР</span>
              <span className={styles.roleLine}>FRONTEND-РАЗРАБОТЧИК</span>
            </div>
          </div>
        </div>

        {/* ДРУГИЕ СТРАНИЦЫ - Сохраняем в DOM, скрываем через CSS */}
        <div style={{ display: activeTab === 'works' ? 'block' : 'none', height: '100%', width: '100%' }}>
          <VhsCategories />
        </div>
        
        <div style={{ display: activeTab === 'about' ? 'block' : 'none', height: '100%', width: '100%' }}>
          <About />
        </div>
        
        <div style={{ display: activeTab === 'contacts' ? 'block' : 'none', height: '100%', width: '100%' }}>
          <Contacts />
        </div>
      </main>

      {/* Операционное меню Терминала */}
      <nav className={styles.osMenu}>
        <button onClick={() => switchTab('home')} className={activeTab === 'home' ? styles.activeTab : ''}>ГЛАВНАЯ</button>
        <button onClick={() => switchTab('works')} className={activeTab === 'works' ? styles.activeTab : ''}>РАБОТЫ</button>
        <button onClick={() => switchTab('about')} className={activeTab === 'about' ? styles.activeTab : ''}>ОБО МНЕ</button>
        <button onClick={() => switchTab('contacts')} className={activeTab === 'contacts' ? styles.activeTab : ''}>КОНТАКТЫ</button>
      </nav>
    </div>
  );
}

export default HomePage;
