import { useState } from 'react';
import styles from './MenuPreview.module.css';

export default function MenuPreviewPage() {
  const [activeVariant, setActiveVariant] = useState('none');
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'SYSTEM' },
    { id: 'works', label: 'WORKS' },
    { id: 'about', label: 'MANIFESTO' },
    { id: 'contacts', label: 'NETWORK' }
  ];

  return (
    <div className={styles.previewContainer}>
      <h1 className={styles.title}>ПРЕВЬЮ ВАРИАНТОВ НАВИГАЦИИ</h1>
      <p className={styles.subtitle}>Нажми на вариант, чтобы развернуть его дизайн.</p>
      
      <div className={styles.variantSelector}>
        <button onClick={() => setActiveVariant('giant')} className={activeVariant === 'giant' ? styles.active : ''}>ГИГАНТСКАЯ ТИПОГРАФИКА</button>
        <button onClick={() => setActiveVariant('glitch')} className={activeVariant === 'glitch' ? styles.active : ''}>ХАОТИЧНЫЙ ГЛИТЧ</button>
        <button onClick={() => setActiveVariant('hud')} className={activeVariant === 'hud' ? styles.active : ''}>SCIFI HUD СКАНЕР</button>
        <button onClick={() => setActiveVariant('tabs')} className={activeVariant === 'tabs' ? styles.active : ''}>АГРЕССИВНЫЕ folder-ВКЛАДКИ</button>
      </div>

      <div className={styles.showcaseArea}>
        
        {/* ВАРИАНТ 1: ГИГАНТСКАЯ ТИПОГРАФИКА */}
        {activeVariant === 'giant' && (
          <nav className={styles.giantMenu}>
            {tabs.map(t => (
              <button 
                key={t.id} 
                className={activeTab === t.id ? styles.activeGiant : ''}
                onClick={() => setActiveTab(t.id)}
                data-text={t.label}
              >
                {t.label}
              </button>
            ))}
          </nav>
        )}

        {/* ВАРИАНТ 2: ХАОТИЧНЫЙ ГЛИТЧ */}
        {activeVariant === 'glitch' && (
          <nav className={styles.glitchMenu}>
            {tabs.map((t, idx) => (
              <button 
                key={t.id} 
                className={activeTab === t.id ? styles.activeGlitch : ''}
                onClick={() => setActiveTab(t.id)}
                style={{ '--d': `${idx * 0.2}s`, '--ang': `${(idx % 2 === 0 ? 1 : -1) * (idx * 5)}deg` }}
              >
                [{t.label}]
              </button>
            ))}
          </nav>
        )}

        {/* ВАРИАНТ 3: SCIFI HUD СКАНЕР */}
        {activeVariant === 'hud' && (
          <nav className={styles.hudMenu}>
            <div className={styles.hudCircle}></div>
            {tabs.map((t, idx) => (
              <button 
                key={t.id} 
                className={`${activeTab === t.id ? styles.activeHud : ''} ${styles[`hudBtn${idx}`]}`}
                onClick={() => setActiveTab(t.id)}
              >
                 <span className={styles.hudDot}></span>
                 <span className={styles.hudText}>{t.label}</span>
                 <span className={styles.hudLine}></span>
              </button>
            ))}
          </nav>
        )}

        {/* ВАРИАНТ 4: АГРЕССИВНЫЕ Вкладки (Clip-Path) */}
        {activeVariant === 'tabs' && (
          <nav className={styles.tabsMenu}>
            {tabs.map(t => (
              <button 
                key={t.id} 
                className={activeTab === t.id ? styles.activeTabs : ''}
                onClick={() => setActiveTab(t.id)}
              >
                <div className={styles.tabBg}></div>
                <span>// {t.label}</span>
              </button>
            ))}
          </nav>
        )}

      </div>
    </div>
  );
}
