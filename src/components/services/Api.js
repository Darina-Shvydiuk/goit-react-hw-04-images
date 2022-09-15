import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29314229-ace3923ce808763a4f54eb251';
const SEARCH_SETTINGS = '&image_type=photo&orientation=horizontal&per_page=12';
export const fetchImages = async (query, page) => {
  try {
    const URL = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}${SEARCH_SETTINGS}`;
    const data = await axios.get(URL);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// const instance = axios.create({
//   baseUrl: 'https://pixabay.com/api/',
//   params: {
//     key: '29314229-ace3923ce808763a4f54eb251',
//     q: 'searchQuery',
//     page: 'currentPage',
//     searchSettings: '&image_type=photo&orientation=horizontal&per_page=12',
//   },
// });
// export const fetchImages = async () => {
//   const { data } = await instance.get('');
//   return data;
// };
