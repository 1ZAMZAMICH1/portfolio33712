import MediaRenderer from './MediaRenderer';
import styles from './Lightbox.module.css';

function Lightbox({ images, activeIndex, onClose, onNext, onPrev }) {
  if (activeIndex === null) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <button className={`${styles.navButton} ${styles.prevButton}`} onClick={(e) => { e.stopPropagation(); onPrev(); }}>‹</button>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <MediaRenderer src={images[activeIndex]} alt={`Image ${activeIndex + 1}`} />
      </div>
      <button className={`${styles.navButton} ${styles.nextButton}`} onClick={(e) => { e.stopPropagation(); onNext(); }}>›</button>
      <button className={styles.closeButton} onClick={onClose}>×</button>
    </div>
  );
}

export default Lightbox;