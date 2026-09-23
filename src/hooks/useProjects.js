import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const GIST_ID = '097b310908113d1547c991aad195dd01';
const FILENAME = 'database.json';
// ТОКЕН БОЛЬШЕ НЕ ХРАНИТСЯ НА ФРОНТЕНДЕ!

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
  
  const updateProjects = async (newData, username, password) => {
    try {
      // ТЕПЕРЬ МЫ ОТПРАВЛЯЕМ ЗАПРОС НЕ НА GITHUB, А НА НАШУ ФУНКЦИЮ NETLIFY!
      // Там на сервере проверится пароль и сервер сам обновит базу.
      const response = await axios.post('/.netlify/functions/saveProjects', {
        username,
        password,
        data: newData
      });
      
      if (response.data.success) {
        setData(newData);
      }
    } catch (e) {
      setError(e);
      console.error("Failed to update projects via Netlify:", e);
      if (e.response && e.response.status === 401) {
        alert('Ошибка доступа: Неверный логин или пароль для сохранения!');
      } else {
        alert('Ошибка при сохранении на сервере!');
      }
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
    saveProjects: (newWorks, username, password) => updateProjects({ ...data, works: newWorks }, username, password) 
  };
}