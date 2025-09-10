import styles from './Projects.module.css';

const projectsData = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A dark-themed music player interface with neon accents and fluid animations.',
    imageUrl: 'https://via.placeholder.com/600x400/111111/ffd700?text=Project+Alpha',
    tags: ['React', 'Figma', 'Web Audio API']
  },
  {
    id: 2,
    title: 'Cyber-Calligraphy',
    description: 'Generative art project creating unique calligraphic patterns based on user input.',
    imageUrl: 'https://via.placeholder.com/600x400/111111/ffd700?text=Cyber-Calligraphy',
    tags: ['p5.js', 'WebGL', 'Generative Art']
  },
  {
    id: 3,
    title: 'NEON-X',
    description: 'E-commerce platform for a futuristic fashion brand. Focus on micro-interactions.',
    imageUrl: 'https://via.placeholder.com/600x400/111111/ffd700?text=NEON-X',
    tags: ['Next.js', 'Stripe', 'Framer Motion']
  },
  {
    id: 4,
    title: 'Project Omega',
    description: 'Data visualization dashboard for a high-frequency trading firm.',
    imageUrl: 'https://via.placeholder.com/600x400/111111/ffd700?text=Project+Omega',
    tags: ['D3.js', 'React', 'WebSocket']
  }
];

function Projects() {
  return (
    <section className={styles.projectsSection}>
      <h2 className={styles.sectionTitle}>Проекты</h2>
      <hr className={styles.titleHr} />
      <div className={styles.projectsContainer}>
        {projectsData.map(project => (
          <div key={project.id} className={styles.projectCard}>
            <div className={styles.cardImage}>
              <img src={project.imageUrl} alt={project.title} />
            </div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{project.title}</h3>
              <p className={styles.cardDescription}>{project.description}</p>
              <div className={styles.cardTags}>
                {project.tags.map(tag => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;