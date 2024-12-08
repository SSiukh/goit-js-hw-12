import getApi from './js/pixabay-api';
import iziToast from 'izitoast';
import createMarkUp from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loading = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more');

loadMoreButton.classList.replace('load-more', 'visually-hidden');

let keyWord = '';
let page = 1;

form.addEventListener('submit', submitHandler);
loadMoreButton.addEventListener('click', onLoadMore);

async function submitHandler(event) {
  loadMoreButton.classList.replace('load-more', 'visually-hidden');
  event.preventDefault();
  page = 1;
  keyWord = event.target.elements.formInput.value.trim();
  loading.classList.remove('visually-hidden');
  gallery.innerHTML = '';

  if (!keyWord) {
    iziToast.show({
      message: 'Please enter a search term.',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    loading.classList.add('visually-hidden');
    return;
  }

  const images = await getApi(keyWord, page);

  try {
    const totalPages = Math.ceil(images.totalHits / 20);

    if (!images.hits.length) {
      throw new Error(
        'Sorry, there are no images matching <br /> your search query. Please try again!'
      );
    }
    const markUp = createMarkUp(images.hits);
    gallery.innerHTML = markUp;

    const lightbox = new SimpleLightbox('.gallery a', {
      captionSelector: 'img',
      captionsData: 'alt',
      captionPosition: 'bottom',
    });
    lightbox.refresh();

    if (page < totalPages) {
      loadMoreButton.classList.replace('visually-hidden', 'load-more');
    }
  } catch (error) {
    iziToast.show({
      message: error.message,
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  } finally {
    loading.classList.add('visually-hidden');
  }

  event.target.reset();
}

async function onLoadMore() {
  page++;
  loading.classList.remove('visually-hidden');

  try {
    const data = await getApi(keyWord, page);
    const markUp = createMarkUp(data.hits);
    gallery.insertAdjacentHTML('beforeend', markUp);

    const elementSize = document
      .querySelector('.gallery-item')
      .getBoundingClientRect().height;

    window.scrollBy({
      top: elementSize * 2,
      behavior: 'smooth',
    });

    const totalPages = Math.ceil(data.totalHits / 20);

    if (page >= totalPages) {
      loadMoreButton.classList.replace('load-more', 'visually-hidden');

      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    }

    const lightbox = new SimpleLightbox('.gallery a', {
      captionSelector: 'img',
      captionsData: 'alt',
      captionPosition: 'bottom',
    });
    lightbox.refresh();
    loading.classList.add('visually-hidden');
  } catch (error) {
    console.log(error.message);
  }
}
