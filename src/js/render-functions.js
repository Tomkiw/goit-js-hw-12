import SimpleLightbox from 'simplelightbox'; // Імпорт бібліотеки для модального вікна (галереї)
import 'simplelightbox/dist/simple-lightbox.min.css'; // Імпорт CSS стилів для SimpleLightbox

// Ініціалізація бібліотеки SimpleLightbox
// Створюємо екземпляр один раз поза функціями, щоб не перестворювати його при кожному рендері
let lightbox = new SimpleLightbox('.gallery a', {
  captions: true, // Вмикаємо підписи під зображеннями
  captionsData: 'alt', // Текст підпису береться з атрибута 'alt'
  captionDelay: 250, // Затримка появи підпису (250 мс)
});

// Отримуємо посилання на DOM-елементи
const galleryContainer = document.querySelector('.gallery'); // Контейнер (ul), куди будемо додавати картинки
const loader = document.querySelector('.loader'); // Елемент лоадера (індикатор завантаження)

// Функція для створення розмітки галереї
export function createGallery(images) {
  // Створюємо HTML-рядок з карток зображень, використовуючи метод map
  const markup = images
    .map(
      image =>
        `<li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img 
          class="gallery-image" 
          src="${image.webformatURL}" 
          alt="${image.tags}" 
        />
      </a>

      <div class="inf-container">
  <ul class="inf-list">
    <li class="inf-item">
      <h3>Likes</h3>
      <span>${image.likes}</span>
    </li>

     <li class="inf-item">
      <h3>Views</h3>
      <span>${image.views}</span>
    </li>

     <li class="inf-item">
      <h3>Comments</h3>
      <span>${image.comments}</span>
    </li>

     <li class="inf-item">
      <h3>Downloads</h3>
      <span>${image.downloads}</span>
    </li>

  </ul>
</div>
      </li>`
    )
    .join(''); // Об'єднуємо масив рядків в один суцільний рядок HTML

  // Вставляємо згенеровану розмітку в кінець контейнера галереї
  galleryContainer.insertAdjacentHTML('beforeend', markup);
  
  // Оновлюємо SimpleLightbox, щоб він "побачив" нові додані зображення
  // Це обов'язково робити після додавання нових елементів у DOM
  lightbox.refresh();
}

// Функція для очищення галереї перед новим пошуком
export function clearGallery() {
  galleryContainer.innerHTML = ''; // Видаляємо весь HTML вміст контейнера
}

// Функція для показу лоадера
export const showLoader = () => {
  // Видаляємо клас 'is-hidden', щоб зробити лоадер видимим
  loader.classList.remove('is-hidden');
};

// Функція для приховування лоадера
export const hideLoader = () => {
  // Додаємо клас 'is-hidden', щоб сховати лоадер
  loader.classList.add('is-hidden');
};
