import axios from 'axios'; // Імпорт бібліотеки axios для виконання HTTP-запитів

// Експортуємо функцію, яка приймає пошуковий запит (query)
export async function getImagesByQuery(query, page) {
  const API_KEY = '54182222-bc9f62244d35838f397753c37'; // Ваш персональний ключ API Pixabay
  const BASE_URL = 'https://pixabay.com/api/'; // Базова адреса API Pixabay
  

  // Налаштування параметрів запиту (query parameters)
  // Ці параметри будуть додані до URL (наприклад: ?key=...&q=cat&image_type=photo...)
  const searchParams = {
    params: {
      key: API_KEY, // Ключ доступу (обов'язково)
      q: query, // Слово для пошуку, яке ввів користувач
      image_type: 'photo', // Шукаємо тільки фотографії
      orientation: 'horizontal', // Орієнтація зображення - горизонтальна
      safesearch: true, // Увімкнення безпечного пошуку (фільтрація контенту 18+)
      page: page, // Номер сторінки
      per_page: 15, // Кількість зображень, що повертаються за один запит
    },
  };

  // Виконуємо GET-запит на сервер, передаючи базову URL та об'єкт налаштувань
  const response = await axios.get(BASE_URL, searchParams)
    return response.data;
}

 