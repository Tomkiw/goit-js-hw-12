import iziToast from 'izitoast'; // Імпорт бібліотеки iziToast для відображення повідомлень
import 'izitoast/dist/css/iziToast.min.css'; // Імпорт стилів бібліотеки iziToast

// Імпорт функції для запиту на сервер з файлу pixabay-api.js
import { getImagesByQuery } from './js/pixabay-api.js';
// Імпорт функцій для роботи з інтерфейсом (DOM) з файлу render-functions.js
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.querySelector('.form'); // Отримання елемента форми з DOM

// Додавання слухача події 'submit' на форму
form.addEventListener('submit', event => {
  event.preventDefault(); // Скасування перезавантаження сторінки при відправці форми

  const input = event.target.querySelector('input'); // Пошук поля вводу всередині форми
  const query = input.value.trim(); // Отримання введеного тексту без зайвих пробілів

  // Перевірка: якщо поле порожнє, виводимо попередження
  if (!query) {
    iziToast.warning({
      title: 'Warning', // Заголовок попередження
      message: 'Please enter a search query!', // Текст попередження
    });
    return; // Перериваємо виконання функції
  }
  
  // 1. Підготовка інтерфейсу: очищення галереї та показ лоадера
  clearGallery();
  showLoader();

  // 2. Виконання запиту на сервер за введеним словом
  getImagesByQuery(query)
    .then(data => { // Успішна відповідь від сервера
      // Перевірка: якщо масив зображень порожній
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error', // Заголовок помилки
          message:
            'Sorry, there are no images matching your search query. Please try again!', // Текст помилки
          position: 'topRight', // Позиція повідомлення
        });
        return; // Вихід, якщо нічого не знайдено
      }
      // Якщо зображення є — викликаємо функцію рендеру
      createGallery(data.hits); 
    })
    .catch(error => { // Обробка помилки запиту
      console.error(error); // Вивід помилки в консоль
      iziToast.error({
        message: 'Something went wrong! Please try again later.', // Повідомлення для користувача
        position: 'topRight', // Розташування повідомлення
      });
    })
    .finally(() => { // Виконується завжди (успіх чи помилка)
      hideLoader(); // Ховаємо лоадер
      form.reset(); // Очищуємо форму
    });
});
