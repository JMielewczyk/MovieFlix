import { IdataObject } from './interfaces';

const API_KEY = import.meta.env.VITE_API_KEY;
const urlToApi = 'https://api.themoviedb.org/3';

export const loadContent = async (
  type: string | undefined,
  query: string | undefined,
  currentPage: number,
  setPages: React.Dispatch<React.SetStateAction<number[]>>,
  setData: React.Dispatch<React.SetStateAction<IdataObject[]>>
) => {
  const res = await fetch(
    `${urlToApi}/search/${type}?api_key=${API_KEY}&query=${query}&page=${currentPage}`
  );
  const data = await res.json();
  let pages: number[] = [];
  for (let i = 1; i <= data.total_pages; i++) {
    pages = [...pages, i];
  }
  //Change property name to match the same name for each type(movie, tv, person)
  for (let object in data.results) {
    if (!data.results[object].hasOwnProperty('poster_path')) {
      data.results[object].poster_path = data.results[object].profile_path;
      delete data.results[object].profile_path;
    }
  }
  setPages(pages);
  setData(data.results);
};
