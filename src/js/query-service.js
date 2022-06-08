// Імпорт бібліотеки
import axios from 'axios';
// Наш ключ API
const API_KEY = '27859261-e9073de67394be7ab7216c452';
// Дефолтні налаштування для запиту axios
axios.defaults.baseURL = 'https://pixabay.com/api';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};
// Об'єкт для запитів до API
export const ImageService = {
  page: 1,
  per_page: 40,
  searchQuery: '',

  async fetchImages() {
    // запит до API
    const { data } = await axios.get(
      `/?q=${this.query}&page=${this.page}&per_page=${this.per_page}`
    );

    this.incrementPage();
    // ф-я має повернути promise в зовнішній код

    const { hits, tags, total, totalHits } = data;
    return {
      hits,
      tags,
      totalHits,
      hasNextPage: this.page * this.per_page < total,
    };
  },

  incrementPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },

  get query() {
    return this.searchQuery;
  },

  set query(newQuery) {
    this.searchQuery = newQuery;
  },
};
