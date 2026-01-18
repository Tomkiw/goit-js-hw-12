import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showBtnLoadMore,
  hideBtnLoadMore,
} from './js/render-functions.js';

const form = document.querySelector('.form');
const btnLoadMore = document.querySelector('.btn-load-more');
let page = 1;
let currentQuery = ''; // зберігаємо запит для подальшого використання
const limitPagesItems = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const input = event.target.querySelector('input');
  const query = input.value.trim();
  currentQuery = query; // Зберігаємо запит у глобальну змінну

  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }

  clearGallery();
  showLoader();
  hideBtnLoadMore();
  page = 1;

  try {
    const data = await getImagesByQuery(query, page);
    if (data.hits.length === 0) {
      hideBtnLoadMore();
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    // Перевіряємо, чи є ще сторінки для завантаження
    if (data.totalHits > limitPagesItems) {
      showBtnLoadMore();
    } else {
      hideBtnLoadMore();
    }

    page += 1;


  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Something went wrong! Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
});

// Додаємо обробник події для кнопки Load More
btnLoadMore.addEventListener('click', async () => {
  hideBtnLoadMore(); // Ховаємо кнопку на час завантаження
  showLoader();

  try {
    // Використовуємо збережений currentQuery та поточну сторінку (яка вже була збільшена в submit)
    const data = await getImagesByQuery(currentQuery, page);
    createGallery(data.hits);

    // Плавний скрол
    const card = document.querySelector('.gallery-item');
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      left: 0,
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    // Перевіряємо, чи досягли кінця колекції
    const totalPages = Math.ceil(data.totalHits / limitPagesItems);
    
    if (page >= totalPages) {
      hideBtnLoadMore();
      iziToast.info({
        position: 'topRight',
        message: "We're sorry, but you've reached the end of search results.",
      });
    } else {
      showBtnLoadMore();
      page += 1; // Збільшуємо лічильник сторінки тільки якщо є ще що вантажити
    }
  } catch (error) {
    console.error(error);
    iziToast.error({ position: 'topRight', message: 'Something went wrong!' });
  } finally {
    hideLoader();
  }
});
