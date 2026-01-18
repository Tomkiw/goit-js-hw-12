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
let page = 1;
let currentQuery = '';
let hitsCount = 0;
const limitPagesItems = 15;

form.addEventListener('submit', async event => {
  event.preventDefault();

  const input = event.target.querySelector('input');
  const query = input.value.trim();

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
      btnLoadMore.classList.add('is-hidden');
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
 
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
