// Содержимое для файла: /netlify/functions/getProjects.js

const axios = require('axios');

// Прямая ссылка на твой "сырой" JSON-файл на GitHub
const GIST_URL = 'https://gist.githubusercontent.com/1ZAMZAMICH1/097b310908113d1547c991aad195dd01/raw/database.json';

exports.handler = async function(event, context) {
  try {
    const response = await axios.get(GIST_URL);

    // Успешный ответ: возвращаем данные с правильными заголовками
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Разрешаем доступ для твоего сайта
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    // Если произошла ошибка при загрузке с GitHub
    return {
      statusCode: 502, // Bad Gateway - ошибка на стороне сервера
      body: JSON.stringify({ error: 'Failed to fetch data from Gist' }),
    };
  }
};