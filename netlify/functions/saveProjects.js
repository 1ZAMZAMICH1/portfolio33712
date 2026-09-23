import axios from 'axios';

const GIST_ID = '097b310908113d1547c991aad195dd01';
const FILENAME = 'database.json';
const API_URL = `https://api.github.com/gists/${GIST_ID}`;

export const handler = async function(event, context) {
  // Нам интересны только POST-запросы
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { username, password, data } = body;

    // СВЕРКА ПАРОЛЕЙ (НА СТОРОНЕ СЕРВЕРА)
    if (username !== 'hervam' || password !== 'net1337') {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Unauthorized: Неверный логин или пароль' })
      };
    }

    // Здесь GitHub токен скрыт на сервере (в Netlify Environment Variables)
    // Мы читаем его из process.env (а не из клиентского кода!)
    const githubToken = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN; 

    if (!githubToken) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Internal Server Error: GITHUB_TOKEN не задан на сервере' })
      };
    }

    // Если пароль подошел — сервер сам отправляет запрос с токеном на GitHub:
    await axios.patch(API_URL, {
      files: {
        [FILENAME]: {
          content: JSON.stringify(data, null, 2)
        }
      }
    }, {
      headers: {
        Authorization: `token ${githubToken}`
      }
    });

    // Возвращаем фронтенду "Всё круто!"
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };

  } catch (error) {
    console.error('Ошибка сохранения на Github:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Ошибка сохранения файла на сервере' })
    };
  }
};
