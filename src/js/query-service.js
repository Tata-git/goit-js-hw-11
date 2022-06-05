// Для HTTP запросов использована библиотека axios.
const axios = require('axios').default;

// В качестве бэкенда используй публичный API сервиса Pixabay.
const API_KEY = '27859261-e9073de67394be7ab7216c452';
const BASE_URL = 'https://pixabay.com/api';
const options = new URLSearchParams({
  key: API_KEY,
  // //----------------------!!!------------------------------
  // // q   //  термин для поиска. То, что будет вводить пользователь.
  // // URL-кодированный поисковый запрос. Если опущено, возвращаются все изображения. Это значение не может превышать 100 символов. Пример: Example: "yellow+flower"  "желтый+цветок"
  // //----------------------!!!------------------------------
  // image_type: photo, // тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
  // orientation: horizontal, // ориентация фотографии. Задай значение horizontal.
  // safesearch: true, // фильтр по возрасту. Задай значение true.
  // // per_page: ,
});
//----------------export --
// top-headlines - главные заголовки class getImages ---------------------
export default class GetImages {
  constructor() {
    this.page = 1;
  }
  fetchImages() {
    //   https://pixabay.com/api/?key=27859261-e9073de67394be7ab7216c452&q=yellow+flowers&image_type=photo
    const url = `${BASE_URL}/top-headlines?${options}&per_page=40&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(x => console.log(x))
      .catch(error => console.log(error));
  }
}
