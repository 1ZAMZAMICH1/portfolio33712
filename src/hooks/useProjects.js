import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const GIST_ID = '097b310908113d1547c991aad195dd01';
const FILENAME = 'database.json';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

const API_URL = `https://api.github.com/gists/${GIST_ID}`;

// ЗАДАЕМ НАЧАЛЬНОЕ СОСТОЯНИЕ, чтобы ничего не было undefined
const initialState = { works: [], gallery: [] };

export function useProjects() {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async () => {
    // Сбрасываем состояние перед каждым запросом
    setLoading(true);
    setError(null);
    try {
      // Идем через API GitHub, чтобы избежать жесткого кэширования (которое ломает отображение свежих изменений).
      // Ответ API содержит актуальные файлы.
      const response = await axios.get(API_URL);
      const fileContent = response.data.files[FILENAME].content;
      const parsedData = JSON.parse(fileContent);

      // --- ГЛАВНАЯ ЗАЩИТА ТУТ ---
      if (parsedData && Array.isArray(parsedData.works)) {
        // Если все ОК - сохраняем данные
        setData(parsedData);
      } else {
        // Если пришла какая-то дичь - считаем это ошибкой
        throw new Error('Получены некорректные данные от сервера');
      }

    } catch (e) {
      setError(e);
      // В случае ошибки, НЕ МЕНЯЕМ ДАННЫЕ, чтобы не сломать приложение
      // setData(initialState); // Можно раскомментировать, чтобы сбросить до пустых массивов
      console.error("Failed to fetch projects:", e);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const updateProjects = async (newData) => {
    // ... (эта функция остается без изменений)
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
    // Гарантируем, что всегда возвращается массив, даже если data - null
    projects: data?.works || [], 
    gallery: data?.gallery || [], 
    loading, 
    error, 
    setProjects: (newWorks) => setData(prev => ({ ...prev, works: newWorks })), 
    saveProjects: (newWorks) => updateProjects({ ...data, works: newWorks }) 
  };
}