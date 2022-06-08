import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { ImageService } from './js/query-service';
import { getRefs } from './js/refs';
const { searchForm, gallery, loadMoreBtn } = getRefs();
import { renderGallery } from './js/render-gallery';

// const lightbox = new SimpleLightbox('.gallery a')
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

loadMoreBtn.classList.add('is-hidden');

function loadImages() {
  return ImageService.fetchImages().then(({ hits, hasNextPage, totalHits }) => {
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
    lightbox.refresh();

    return totalHits;
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
      // loadMoreBtn.classList.add('is-hidden');
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
  loadMoreBtn.classList.add('is-hidden');

  ImageService.resetPage();
  ImageService.query = value.trim();

  if (!ImageService.query)
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );

  // loadImages().catch(error => console.error(error));
  loadImages()
    .then(totalHits => {
      Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
    })
    .catch(error => console.error(error));
  event.currentTarget.reset();
}

//------------------------------------------------------------------
