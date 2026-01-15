import axios from 'axios'; // Імпорт бібліотеки axios для виконання HTTP-запитів

// Експортуємо функцію, яка приймає пошуковий запит (query)
export function getImagesByQuery(query) {
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
      per_page: 9, // Кількість зображень, що повертаються за один запит
    },
  };

  // Виконуємо GET-запит на сервер, передаючи базову URL та об'єкт налаштувань
  return axios.get(BASE_URL, searchParams).then(response => {
    // Якщо запит успішний, повертаємо дані відповіді (response.data)
    // response.data містить масив зображень (hits) та загальну кількість (totalHits)
    return response.data;
  });
}

// console.log(getImagesByQuery("dog"));
