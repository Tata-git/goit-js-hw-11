import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

import { ImageService } from './js/query-service';
import { getRefs } from './js/refs';
const { searchForm, gallery, loadMoreBtn } = getRefs();
import { renderGallery } from './js/render-gallery';

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

loadMoreBtn.classList.add('is-hidden');

function loadImages() {
  // ф-я має повернути promise в зовнішній код
  return ImageService.fetchImages().then(({ hits, totalHits, hasNextPage }) => {
    // console.log(hits);

    if (hits.length === 0) {
      loadMoreBtn.classList.add('is-hidden');

      return Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }

    if (hasNextPage) {
      loadMoreBtn.classList.remove('is-hidden');
    }

    renderGallery(hits, gallery);
    return Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);

    

  });
}

function onLoadMore() {
  loadImages()
    .then(() => {
      // ImageService.incrementPage();
      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      console.error(error);
      return Notiflix.Notify.info(
        'We are sorry, but you have reached the end of search results.'
      );
    }); // notification
}

function onSearch(event) {
  event.preventDefault();
  const { value } = event.target.elements.searchQuery;
  gallery.innerHTML = '';

  ImageService.resetPage();
  ImageService.query = value.trim();

  if (!ImageService.query) return;

  loadImages().catch(error => console.error(error));

  event.currentTarget.reset();

  // console.log(searchQueryValue);
}

//--------------------------------------------------------------------------
// Notiflix.Notify.success('');

// Notiflix.Notify.failure('');

// Notiflix.Notify.warning('Memento te hominem esse');

//

// console.dir(searchForm);
//----
// const searchQueryValue = value.trim();
//   if (searchQueryValue === '') return;
//---
// console.log(searchQueryValue);
// ImageService.fetchImages(searchQueryValue).then(response =>
//   console.log(response)
// );
//---- тепер нічого не передаємо в ()  ImageService.fetchImages().then(
