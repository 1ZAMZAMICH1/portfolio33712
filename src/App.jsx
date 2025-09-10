import React, { useState, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Preloader from './components/Preloader'; // ИМПОРТИРУЕМ
import styles from './App.module.css';

const HomePage = React.lazy(() => import('./pages/HomePage'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage'));
const AdminPage = React.lazy(() => import('./pages/AdminPage'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.App}>
      {isLoading && <Preloader onLoaded={() => setIsLoading(false)} />}
      
      <Suspense fallback={<div className={styles.loader}>ЗАГРУЗКА...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;