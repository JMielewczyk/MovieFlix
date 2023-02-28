import { IdataObject } from './interfaces';

const API_KEY = import.meta.env.VITE_API_KEY;
const urlToApi = 'https://api.themoviedb.org/3';

export const loadPopular = async (
  type: string | undefined,
  category: string | undefined,
  pageNumber: number,
  setData: React.Dispatch<React.SetStateAction<IdataObject[]>>
) => {
  const res = await fetch(
    `${urlToApi}/${type}/${category}?api_key=${API_KEY}&page=${pageNumber}`
  );
  const object = await res.json();
  setData(object.results);
};

export const loadPopularSort = async (
  type: string | undefined,
  category: string | undefined,
  pageNumber: number,
  setData: React.Dispatch<React.SetStateAction<IdataObject[]>>,
  sortBy: string,
  popularityDecreasing: string,
  popularityIncreasing: string,
  ratingIncreasing: string,
  ratingDecreasing: string,
  maxPages: 500,
  data: IdataObject[]
) => {
  const res = await fetch(
    `${urlToApi}/${type}/${category}?api_key=${API_KEY}&page=${pageNumber}`
  );
  const object = await res.json();

  const sortData = () => {
    if (sortBy === popularityDecreasing) {
      return object.results.sort(
        (a: { popularity: number }, b: { popularity: number }) =>
          a.popularity < b.popularity ? 1 : a.popularity > b.popularity ? -1 : 0
      );
    } else if (sortBy === popularityIncreasing) {
      return object.results.sort(
        (a: { popularity: number }, b: { popularity: number }) =>
          a.popularity - b.popularity
      );
    } else if (sortBy === ratingIncreasing) {
      return object.results.sort(
        (a: { vote_average: number }, b: { vote_average: number }) =>
          a.vote_average - b.vote_average
      );
    } else if (sortBy === ratingDecreasing) {
      return object.results.sort(
        (a: { vote_average: number }, b: { vote_average: number }) =>
          a.vote_average < b.vote_average
            ? 1
            : a.vote_average > b.vote_average
            ? -1
            : 0
      );
    }
  };

  if (pageNumber > 1 && pageNumber < maxPages) {
    const sortedData = sortData();
    const newArray = [...data, ...sortedData];
    setData(newArray);
  } else {
    const sortedData = sortData();
    setData(sortedData);
  }
};

export const handleSelect = async (
  event: React.FormEvent<HTMLSelectElement>,
  popularityDecreasing: string,
  popularityIncreasing: string,
  ratingDecreasing: string,
  ratingIncreasing: string,
  setSortBy: React.Dispatch<React.SetStateAction<string>>,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>,
  maxPages: 500
) => {
  event.preventDefault();
  const selectOption = event.currentTarget.value;

  if (
    selectOption === popularityDecreasing ||
    selectOption === ratingDecreasing
  ) {
    setSortBy(selectOption);
    setPageNumber(1);
  } else if (
    selectOption === popularityIncreasing ||
    selectOption === ratingIncreasing
  ) {
    setSortBy(selectOption);
    setPageNumber(maxPages);
  }
};

export const handleLoadOnScroll = (
  e: React.UIEvent<HTMLDivElement>,
  pageNumber: number,
  sortBy: string,
  popularityDecreasing: string,
  popularityIncreasing: string,
  ratingDecreasing: string,
  ratingIncreasing: string,
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
) => {
  //calculating bottom of the scrolling div, after that setting pageNumber that triggers useEffect to load more on the page/div
  const containerHeight = e.currentTarget.clientHeight;
  const scrollHeight = e.currentTarget.scrollHeight;
  const scrollTop = e.currentTarget.scrollTop;
  if (((scrollTop + containerHeight) / scrollHeight) * 100 === 100) {
    let newPageNumber = pageNumber;
    if (sortBy === popularityDecreasing || sortBy === ratingDecreasing) {
      newPageNumber++;
    } else if (sortBy === popularityIncreasing || sortBy === ratingIncreasing) {
      newPageNumber--;
    }
    setPageNumber(newPageNumber);
  }
};
