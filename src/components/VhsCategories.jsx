import { Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import styles from './VhsCategories.module.css';

const categories = [
  { title: "Графический дизайн", slug: "graphic-design", internalSlug: "design" },
  { title: "Сайты", slug: "websites", internalSlug: "websites" },
  { title: "Презентации", slug: "presentations", internalSlug: "presentations" },
  { title: "Приложения", slug: "apps", internalSlug: "apps" },
];

function VhsCategories() {
  const { projects, loading } = useProjects();

  return (
    <section id="works" className={styles.section}>
      <div className={styles.container}>
        {categories.map((category) => {
          const previewProjects = projects.filter(p => p.category === category.internalSlug).slice(0, 4);
            
          return (
            <Link to={`/category/${category.slug}`} key={category.slug} className={styles.panel}>
              <div className={styles.background}>
                <h4 className={styles.hoverTitle}>{category.title}</h4>
                <div className={styles.hoverPreview}>
                  {!loading && previewProjects.map(p => (
                    <div key={p.id} className={styles.previewImage} style={{ backgroundImage: `url(${p.imageUrl})` }}></div>
                  ))}
                </div>
              </div>
              <div className={styles.overlayContainer}>
                <video className={styles.videoOverlay} src="/graf.webm" autoPlay loop muted playsInline />
              </div>
              <h3 className={styles.title}>{category.title}</h3>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default VhsCategories;