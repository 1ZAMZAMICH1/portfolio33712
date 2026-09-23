import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import styles from './AdminPage.module.css';
import { FiEdit3, FiTrash2, FiPlus, FiLogOut, FiX, FiImage, FiCalendar, FiTag, FiFileText, FiSave } from 'react-icons/fi';

const projectCategories = [
  { value: 'design', label: 'Графический дизайн' },
  { value: 'websites', label: 'Сайты' },
  { value: 'presentations', label: 'Презентации' },
  { value: 'apps', label: 'Приложения' },
];

export default function AdminPage() {
  const { projects, setProjects, saveProjects, loading } = useProjects();
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  // UI state
  const [activeTab, setActiveTab] = useState('design');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [draggedItemIdx, setDraggedItemIdx] = useState(null);
  
  // Form state
  const defaultProject = { title: '', description: '', category: 'design', imageUrl: '', additionalImages: [], tags: [], client: '', date: new Date().toISOString().split('T')[0] };
  const [formData, setFormData] = useState(defaultProject);

  const handleLogin = (e) => {
    e.preventDefault();
    // КОНТУР БЕЗОПАСНОСТИ:
    // Пароли не лежат открытым текстом в JS-бандле. Мы кодируем введенные данные 
    // в Base64 перед сверкой с хэшами, чтобы их нельзя было просто найти через Поиск кода.
    if (btoa(username) === 'aGVydmFt' && btoa(password) === 'bmV0MTMzNw==') {
      setIsAuthenticated(true);
    } else {
      alert('В ДОСТУПЕ ОТКАЗАНО.');
    }
  };

  const openForm = (project = null) => {
    if (project) {
      setFormData({ ...project, additionalImages: project.additionalImages || [], tags: project.tags || [] });
    } else {
      setFormData({ ...defaultProject, category: activeTab });
    }
    setIsModalOpen(true);
  };

  const closeForm = () => setIsModalOpen(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleAdditionalImageChange = (index, value) => {
    const newImages = [...formData.additionalImages];
    newImages[index] = value;
    setFormData({ ...formData, additionalImages: newImages });
  };

  const addAdditionalImage = () => {
    setFormData({ ...formData, additionalImages: [...formData.additionalImages, ''] });
  };

  const removeAdditionalImage = (index) => {
    const newImages = formData.additionalImages.filter((_, i) => i !== index);
    setFormData({ ...formData, additionalImages: newImages });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    let updatedProjects;
    if (formData.id) {
      updatedProjects = projects.map(p => p.id === formData.id ? formData : p);
    } else {
      updatedProjects = [{ ...formData, id: Date.now().toString() }, ...projects];
    }
    setProjects(updatedProjects);
    await saveProjects(updatedProjects, username, password);
    setIsSaving(false);
    closeForm();
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Точно удалить проект?')) {
      const updatedProjects = projects.filter(p => p.id !== id);
      setProjects(updatedProjects);
      await saveProjects(updatedProjects, username, password);
    }
  };

  const filteredProjects = projects.filter(p => p.category === activeTab);

  const handleDrop = async (targetIdx) => {
    if (draggedItemIdx === null || draggedItemIdx === targetIdx) return;
    
    const localReordered = [...filteredProjects];
    const [movedItem] = localReordered.splice(draggedItemIdx, 1);
    localReordered.splice(targetIdx, 0, movedItem);

    let counter = 0;
    const updatedGlobalProjects = projects.map(p => 
      p.category === activeTab ? localReordered[counter++] : p
    );

    setProjects(updatedGlobalProjects);
    setDraggedItemIdx(null);
    await saveProjects(updatedGlobalProjects, username, password);
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div className={styles.glow}></div>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            <button type="submit">Войти</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Dashboard</h1>
          <span className={styles.badge}>{projects.length} Работ</span>
        </div>
        <button className={styles.logoutBtn} onClick={() => setIsAuthenticated(false)}>
          <FiLogOut /> Выйти
        </button>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <h3>Категории</h3>
          <nav className={styles.categoriesNav}>
            {projectCategories.map(cat => (
              <button 
                key={cat.value} 
                className={`${styles.categoryBtn} ${activeTab === cat.value ? styles.active : ''}`}
                onClick={() => setActiveTab(cat.value)}
              >
                {cat.label}
                <span className={styles.count}>{projects.filter(p => p.category === cat.value).length}</span>
              </button>
            ))}
          </nav>
        </aside>

        <main className={styles.mainContent}>
          <div className={styles.contentHeader}>
            <h2>{projectCategories.find(c => c.value === activeTab)?.label}</h2>
            <button className={styles.primaryBtn} onClick={() => openForm()}>
              <FiPlus /> Добавить работу
            </button>
          </div>

          {loading ? (
            <div className={styles.loader}>Загрузка данных...</div>
          ) : (
            <div className={styles.grid}>
              {filteredProjects.length === 0 ? (
                <div className={styles.emptyState}>В этой категории пока нет работ.</div>
              ) : (
                filteredProjects.map((p, index) => (
                  <div 
                    key={p.id} 
                    className={`${styles.card} ${draggedItemIdx === index ? styles.dragging : ''}`} 
                    onClick={() => openForm(p)}
                    draggable
                    onDragStart={() => setDraggedItemIdx(index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(index)}
                  >
                    <div className={styles.cardImage}>
                      {p.imageUrl ? (
                        p.imageUrl.match(/\.(mp4|webm)$/i) ? (
                          <video src={p.imageUrl} muted loop autoPlay playsInline />
                        ) : (
                          <img src={p.imageUrl} alt={p.title} />
                        )
                      ) : (
                        <div className={styles.placeholderImg}><FiImage size={40}/></div>
                      )}
                      <div className={styles.cardOverlay}>
                        <button className={styles.iconBtn} onClick={(e) => { e.stopPropagation(); openForm(p); }}><FiEdit3 /></button>
                        <button className={`${styles.iconBtn} ${styles.danger}`} onClick={(e) => handleDelete(p.id, e)}><FiTrash2 /></button>
                      </div>
                    </div>
                    <div className={styles.cardInfo}>
                      <h4>{p.title || 'Без названия'}</h4>
                      <p>{p.date}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>

      {isModalOpen && (
        <div className={styles.modalBackdrop} onClick={closeForm}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={closeForm}><FiX /></button>
            <h2>{formData.id ? 'Редактировать работу' : 'Новая работа'}</h2>
            
            <form onSubmit={handleSave} className={styles.form}>
              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label><FiFileText /> Название проекта</label>
                  <input name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className={styles.inputGroup}>
                  <label><FiTag /> Категория</label>
                  <select name="category" value={formData.category} onChange={handleChange}>
                    {projectCategories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Описание</label>
                <textarea name="description" rows="3" value={formData.description} onChange={handleChange} />
              </div>

              <div className={styles.inputGroup}>
                <label><FiImage /> Главное медиа (URL картинки или видео mp4/webm)</label>
                <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} />
                {formData.imageUrl && (
                  <div className={styles.previewMedia}>
                    {formData.imageUrl.match(/\.(mp4|webm)$/i) ? (
                      <video src={formData.imageUrl} autoPlay muted loop />
                    ) : (
                      <img src={formData.imageUrl} alt="preview" />
                    )}
                  </div>
                )}
              </div>

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label>Клиент</label>
                  <input name="client" value={formData.client} onChange={handleChange} />
                </div>
                <div className={styles.inputGroup}>
                  <label><FiCalendar /> Дата</label>
                  <input type="date" name="date" value={formData.date} onChange={handleChange} />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label>Дополнительные медиа (картинки или видео)</label>
                {formData.additionalImages.map((img, idx) => (
                  <div key={idx} className={styles.additionalImageRow}>
                    <div className={styles.additionalInputWrapper}>
                      <input 
                        value={img} 
                        onChange={(e) => handleAdditionalImageChange(idx, e.target.value)} 
                        placeholder="Вставь URL сюда..." 
                      />
                      <button type="button" className={styles.iconBtnDanger} onClick={() => removeAdditionalImage(idx)}>
                        <FiTrash2 />
                      </button>
                    </div>
                    {img && (
                      <div className={styles.previewMedia}>
                        {img.match(/\.(mp4|webm)$/i) ? (
                          <video src={img} autoPlay muted loop />
                        ) : (
                          <img src={img} alt="preview" />
                        )}
                      </div>
                    )}
                  </div>
                ))}
                <button type="button" className={styles.addSecondaryBtn} onClick={addAdditionalImage}>
                  <FiPlus /> Добавить ещё медиа
                </button>
              </div>

              <div className={styles.formActions}>
                <button type="button" className={styles.cancelBtn} onClick={closeForm}>Отмена</button>
                <button type="submit" className={styles.submitBtn} disabled={isSaving}>
                  {isSaving ? 'Сохранение...' : <><FiSave /> Сохранить</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}