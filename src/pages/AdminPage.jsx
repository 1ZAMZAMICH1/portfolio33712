import { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import styles from './AdminPage.module.css';

// ... (Функция optimizeCloudinaryUrl без изменений) ...
const optimizeCloudinaryUrl = (url) => { if (!url || !url.includes('cloudinary.com')) return url; if (url.endsWith('.webm') || url.endsWith('.mp4')) { return url.replace('/upload/', '/upload/q_auto:good/'); } return url.replace('/upload/', '/upload/q_auto:good,f_auto/'); };

// Категории для выпадающего списка
const projectCategories = [
  { value: 'design', label: 'Графический дизайн' },
  { value: 'websites', label: 'Сайты' },
  { value: 'presentations', label: 'Презентации' },
  { value: 'apps', label: 'Приложения' },
];

function ProjectForm({ project, onSave, onCancel }) {
  const defaultProject = { title: '', description: '', category: 'design', imageUrl: '', additionalImages: [], tags: [], client: '', date: new Date().toISOString().split('T')[0] };
  const [formData, setFormData] = useState({ ...defaultProject, ...project });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleArrayChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value.split(',').map(s => s.trim().replace(/\s/g, '')) });
  
  const handleSubmit = (e) => { e.preventDefault(); onSave({ ...formData, imageUrl: optimizeCloudinaryUrl(formData.imageUrl), additionalImages: formData.additionalImages.map(optimizeCloudinaryUrl) }); };

  return (
    <div className={styles.modalOverlay}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{project?.id ? 'Редактировать проект' : 'Новый проект'}</h2>
        <input name="title" value={formData.title} onChange={handleChange} placeholder="Название" required />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Описание" />
        
        {/* ВОТ ВЫПАДАЮЩИЙ СПИСОК */}
        <select name="category" value={formData.category} onChange={handleChange}>
          {projectCategories.map(cat => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>

        <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="URL главной картинки/видео (webp, mp4, webm)" />
        <textarea name="additionalImages" value={formData.additionalImages.join(', ')} onChange={handleArrayChange} placeholder="Доп. картинки/видео (через запятую)" />
        <input name="client" value={formData.client} onChange={handleChange} placeholder="Клиент" />
        <input name="date" type="date" value={formData.date} onChange={handleChange} placeholder="Дата" />
        <div className={styles.formActions}>
          <button type="submit">Сохранить</button>
          <button type="button" onClick={onCancel}>Отмена</button>
        </div>
      </form>
    </div>
  );
}

function AdminPage() {
  const { projects, setProjects, saveProjects, loading } = useProjects();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false); // НОВЫЙ STATE ДЛЯ ФОРМЫ
  const [currentProject, setCurrentProject] = useState(null); // Для редактирования
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('works');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => { e.preventDefault(); if (username === 'admin' && password === '12345') setIsAuthenticated(true); };

  const openAddForm = () => { setCurrentProject(null); setIsFormOpen(true); };
  const openEditForm = (project) => { setCurrentProject(project); setIsFormOpen(true); };

  const handleSave = async (projectData) => {
    setIsSaving(true);
    let updatedProjects;
    if (projectData.id) { updatedProjects = projects.map(p => p.id === projectData.id ? projectData : p); } 
    else { updatedProjects = [{ ...projectData, id: Date.now().toString() }, ...projects]; }
    setProjects(updatedProjects);
    await saveProjects(updatedProjects);
    setIsFormOpen(false);
    setIsSaving(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Точно удалить?')) {
      setIsSaving(true);
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      await saveProjects(updatedProjects);
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) { /* ... (код логина без изменений) ... */ }

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1>Админ-панель</h1>
        <button onClick={() => setIsAuthenticated(false)}>Выйти</button>
      </header>
      
      <nav className={styles.tabs}>
        <button onClick={() => setActiveTab('works')} className={activeTab === 'works' ? styles.activeTab : ''}>Работы</button>
        <button onClick={() => setActiveTab('gallery')} className={activeTab === 'gallery' ? styles.activeTab : ''}>Галерея</button>
      </nav>

      {activeTab === 'works' && (
        <section>
          <div className={styles.sectionHeader}>
            <h2>Управление работами</h2>
            <button onClick={openAddForm} className={styles.addButton} disabled={isSaving}>
              {isSaving ? 'Сохранение...' : '+ Добавить работу'}
            </button>
          </div>
          {loading ? <div className={styles.loader}>Загрузка...</div> : (
            <div className={styles.projectList}>
              {projects.map(p => (
                <div key={p.id} className={styles.projectItem}>
                  <img src={p.imageUrl} alt={p.title} />
                  <h4>{p.title}</h4>
                  <div className={styles.itemActions}>
                    <button onClick={() => openEditForm(p)} disabled={isSaving}>Редактировать</button>
                    <button onClick={() => handleDelete(p.id)} disabled={isSaving} className={styles.deleteButton}>Удалить</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'gallery' && ( <section><h2>Управление галереей (в разработке)</h2></section> )}
      {isFormOpen && <ProjectForm project={currentProject} onSave={handleSave} onCancel={() => setIsFormOpen(false)} />}
    </div>
  );
}

export default AdminPage;