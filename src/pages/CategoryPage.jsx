import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import MediaRenderer from '../components/MediaRenderer';
import ProjectModal from '../components/ProjectModal'; // НАШ НОВЫЙ КОМПОНЕНТ
import styles from './CategoryPage.module.css';

function CategoryPage() {
  const { slug } = useParams();
  const { projects, loading } = useProjects();
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (!loading && projects.length > 0) {
      const categoryMap = { "graphic-design": "design", "websites": "websites", "presentations": "presentations", "apps": "apps" };
      const mappedSlug = categoryMap[slug] || slug;
      setFilteredProjects(projects.filter(p => p.category === mappedSlug));
    }
  }, [slug, projects, loading]);
  
  // Лайтбокс и блокировка скролла теперь не нужны, модалка делает это сама
  
  if (loading) return <div className={styles.loader}>ЗАГРУЗКА РАБОТ...</div>;

  return (
    <>
      <main className={styles.page}>
        <div className={styles.header}>
          <Link to="/" className={styles.backLink}>← На главную</Link>
          <h1 className={styles.pageTitle}>{slug.replace('-', ' ')}</h1>
        </div>
        
        <div className={styles.grid}>
          {filteredProjects.map(project => (
            <div key={project.id} className={styles.card} onClick={() => setSelectedProject(project)}>
              <div className={styles.cardImage}><MediaRenderer src={project.imageUrl} alt={project.title}/></div>
              <div className={styles.cardOverlay}><h3>{project.title}</h3></div>
            </div>
          ))}
        </div>
      </main>
      
      <ProjectModal project={selectedProject} isOpen={!!selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  );
}

export default CategoryPage;