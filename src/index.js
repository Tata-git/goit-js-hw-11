import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import GetImages from './js/query-service';
//------------------?------------------import './css/styles.css';
import GetImages from './js/query-service';
const GetImages = new GetImages();

import { getRefs } from './js/refs';
const { searchBox, gallery } = getRefs();
// // Описан в документации
// import SimpleLightbox from "simplelightbox";
// // Дополнительный импорт стилей
// import "simplelightbox/dist/simple-lightbox.min.css";

const axios = require('axios').default;

function onSearch(e) {
  e.preventDefault();

  // GetImages.query = e.currentTarget.elements.query.value;
}

function renderGallery(images) {
    const imageCard = images.map(
      ({ webformatURL,}) => `
    <div class="photo-card">
  <img src="" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>
    `
    );

}

//--------------------------------------------------------------------------
// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Qui timide rogat docet negare');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Cogito ergo sum');
