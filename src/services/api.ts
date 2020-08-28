import axios from 'axios';
import {API_KEY} from '@env';

const api = axios.create({
  baseURL: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US`,
});

export default api;
