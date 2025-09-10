import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const GIST_ID = '097b310908113d1547c991aad195dd01';
const FILENAME = 'database.json';
// БЕРЕМ ТОКЕН ИЗ БЕЗОПАСНОГО МЕСТА (.env файла)
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const API_URL = `https://api.github.com/gists/${GIST_ID}`;

export function useProjects() {
  const [data, setData] = useState({ works: [], gallery: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      const content = response.data.files[FILENAME].content;
      setData(JSON.parse(content));
    } catch (e) {
      setError(e);
      console.error("Failed to fetch projects:", e);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const updateProjects = async (newData) => {
    try {
      await axios.patch(API_URL, {
        files: {
          [FILENAME]: {
            content: JSON.stringify(newData, null, 2),
          },
        },
      }, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      });
      setData(newData);
    } catch (e) {
      setError(e);
      console.error("Failed to update projects:", e);
      alert('Ошибка при сохранении на Gist!');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { 
    projects: data.works, 
    gallery: data.gallery, 
    loading, 
    error, 
    setProjects: (newWorks) => setData(prev => ({ ...prev, works: newWorks })), 
    saveProjects: (newWorks) => updateProjects({ ...data, works: newWorks }) 
  };
}