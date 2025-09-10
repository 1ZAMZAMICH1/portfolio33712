import styles from './MediaRenderer.module.css';

function MediaRenderer({ src, alt }) {
  if (!src) return <div className={styles.placeholder}>Нет медиа</div>;

  const isVideo = src.endsWith('.webm') || src.endsWith('.mp4');

  if (isVideo) {
    return <video className={styles.media} src={src} alt={alt} autoPlay loop muted playsInline />;
  }
  return <img className={styles.media} src={src} alt={alt} />;
}

export default MediaRenderer;