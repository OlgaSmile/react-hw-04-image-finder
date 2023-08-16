import axios from 'axios';
const API_KEY = '33022988-27197d7be627ee112ee97c311';
const URL = 'https://pixabay.com/api';

export default class Api {
  constructor() {
    this.searchingWord = '';
    this.counter = 1;
  }
  async searchPhoto() {
    try {
      return await axios(
        `${URL}/?q=${this.searchingWord}&page=${this.counter}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
    } catch (error) {
      return error;
    }
  }

  incrementPage() {
    this.counter += 1;
  }
  resetPage() {
    this.counter = 1;
  }

  get word() {
    return this.searchingWord;
  }

  set word(newWord) {
    this.searchingWord = newWord;
  }
}