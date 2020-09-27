import gallery from './gallery-items.js';

const galleryEl = document.querySelector('.js-gallery');
const modalEl = document.querySelector('.js-lightbox');
const closeModalBtn = document.querySelector(
  '.lightbox button[data-action="close-lightbox"]',
);
const changeModalImage = document.querySelector('.lightbox__image');
const modalOverlay = document.querySelector('.lightbox__overlay');

const galleryMarkup = createGalleryMakrup(gallery); //створення розмітки

galleryEl.innerHTML = galleryMarkup;
galleryEl.addEventListener('click', onGalleryElClick); //відкриття модалки

closeModalBtn.addEventListener('click', onCloseModalBtn); //закриття модалки

function createGalleryMakrup(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
      <a
        class="gallery__link"
        href=${original}
      >
        <img
          class="gallery__image"
          src=${preview}
          data-source=${original}
          alt=${description}
        />
      </a>
    </li>`;
    })
    .join('');
}

function onGalleryElClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== 'IMG') {
    return;
  }

  modalEl.classList.add('is-open');
  changeModalImage.src = evt.target.dataset.source;
  changeModalImage.alt = evt.target.alt;

  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrrowPress);
}

function onCloseModalBtn(evt) {
  modalEl.classList.remove('is-open');
  changeModalImage.src = '';
  changeModalImage.alt = '';

  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrrowPress);
}

modalOverlay.addEventListener('click', onOverlayClick);
function onOverlayClick(evt) {
  if (evt.currentTarget === evt.target) {
    onCloseModalBtn();
  }
}

function onEscKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = evt.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModalBtn();
  }
}

function onArrrowPress(evt) {
  const RIGHT_KEY_CODE = 'ArrowRight';
  const LEFT_KEY_CODE = 'ArrowLeft';
  const isArrowRight = evt.code === RIGHT_KEY_CODE;
  const isArrowLeft = evt.code === LEFT_KEY_CODE;

  let currentImage = gallery
    .map(({ original }) => original)
    .indexOf(changeModalImage.src);

  if (isArrowLeft) {
    if (currentImage === 0) {
      return;
    }
    currentImage -= 1;
  }

  if (isArrowRight) {
    if (currentImage === gallery.length - 1) {
      return;
    }
    currentImage += 1;
  }
  changeModalImage.src = gallery[currentImage].original;
  changeModalImage.alr = gallery[currentImage].description;
}
