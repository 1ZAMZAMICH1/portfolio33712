import { useState, useEffect, useMemo, useRef } from 'react';
import { Icon } from '@iconify/react';
import MediaRenderer from './MediaRenderer';
import Lightbox from './Lightbox';
import styles from './ProjectModal.module.css';

function ProjectModal({ project, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const thumbnailStripRef = useRef(null);

  useEffect(() => {
    setCurrentIndex(0);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [project, isOpen]);

  const allImages = useMemo(() => {
    if (!project) return [];
    return [project.imageUrl, ...(project.additionalImages || [])];
  }, [project]);

  const activeImage = allImages[currentIndex] || "";

  const scrollThumbnails = (direction) => {
    if (thumbnailStripRef.current) {
      const scrollAmount = thumbnailStripRef.current.clientWidth * 0.8;
      thumbnailStripRef.current.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }
  };

  if (!isOpen || !project) return null;

  return (
    <>
      <div className={styles.overlay} onClick={onClose}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <header className={styles.header}>
            <h2>{project.title}</h2>
            <button onClick={onClose} className={styles.closeButton}><Icon icon="lucide:x" /></button>
          </header>
          
          <div className={styles.body}>
            <div className={styles.mainMedia} onClick={() => setLightboxIndex(currentIndex)}>
              <MediaRenderer src={activeImage} alt={project.title} />
              {allImages.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p - 1 + allImages.length) % allImages.length); }} className={`${styles.navButton} ${styles.prevButton}`}><Icon icon="lucide:chevron-left" /></button>
                  <button onClick={(e) => { e.stopPropagation(); setCurrentIndex((p) => (p + 1) % allImages.length); }} className={`${styles.navButton} ${styles.nextButton}`}><Icon icon="lucide:chevron-right" /></button>
                </>
              )}
            </div>

            {allImages.length > 1 && (
              <div className={styles.thumbnailContainer}>
                <button className={`${styles.thumbNavButton} ${styles.thumbPrev}`} onClick={() => scrollThumbnails(-1)}>‹</button>
                <div className={styles.thumbnailStrip} ref={thumbnailStripRef}>
                  {allImages.map((imgUrl, index) => (
                    <div key={index} className={`${styles.thumbnail} ${index === currentIndex ? styles.activeThumbnail : ''}`} onClick={() => setCurrentIndex(index)}>
                      <MediaRenderer src={imgUrl} alt={`thumbnail ${index + 1}`} />
                    </div>
                  ))}
                </div>
                <button className={`${styles.thumbNavButton} ${styles.thumbNext}`} onClick={() => scrollThumbnails(1)}>›</button>
              </div>
            )}
            
            <p className={styles.description}>{project.description}</p>

            <div className={styles.metaGrid}>
              <div className={styles.metaItem}>
                <Icon icon="lucide:calendar" className={styles.metaIcon} />
                <div>
                  <p className={styles.metaLabel}>Дата</p>
                  <p>{new Date(project.date).toLocaleDateString('ru-RU')}</p>
                </div>
              </div>
              {project.client && (
                <div className={styles.metaItem}>
                  <Icon icon="lucide:briefcase" className={styles.metaIcon} />
                  <div>
                    <p className={styles.metaLabel}>Клиент</p>
                    <p>{project.client}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <footer className={styles.footer}>
            <button onClick={onClose} className={styles.footerCloseButton}>Закрыть</button>
          </footer>
        </div>
      </div>
      
      <Lightbox
        images={allImages}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNext={() => setLightboxIndex((prev) => (prev + 1) % allImages.length)}
        onPrev={() => setLightboxIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
      />
    </>
  );
}

export default ProjectModal;