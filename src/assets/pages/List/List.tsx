import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { BsArrowDownCircle } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { IdataObject } from './interfaces';

const sortingOptions = {
  popularityDecreasing: 'popularityDecreasing',
  popularityIncreasing: 'popularityIncreasing',
  ratingDecreasing: 'ratingDecreasing',
  ratingIncreasing: 'ratingIncreasing',
};

const List = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const urlToApi = 'https://api.themoviedb.org/3';
  const urlForImage = 'https://image.tmdb.org/t/p/original';
  const { category, type } = useParams();
  const [data, setData] = useState<Array<IdataObject>>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const divRef = useRef<HTMLDivElement>(null);
  const [sortBy, setSortBy] = useState(' ');
  const maxPages = 500;
  const {
    popularityDecreasing,
    popularityIncreasing,
    ratingIncreasing,
    ratingDecreasing,
  } = sortingOptions;
  useEffect(() => {
    //loading elements after first render
    const loadPopular = async () => {
      const res = await fetch(
        `${urlToApi}/${type}/${category}?api_key=${API_KEY}&page=${pageNumber}`
      );
      const object = await res.json();
      setData(object.results);
    };
    loadPopular();
  }, []);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
    const pageNumber = 1; // setting variable instead of state pageNumber to fix loading categories not matching in one element
    setSortBy('popularityDecreasing');
    const loadPopular = async () => {
      const res = await fetch(
        `${urlToApi}/${type}/${category}?api_key=${API_KEY}&page=${pageNumber}`
      );
      const object = await res.json();
      setData(object.results);
    };
    setPageNumber(1); // setting state now will prevent taking the wrong pageNumber when changing category or type
    loadPopular();
  }, [category, type]);

  useEffect(() => {
    //fetching more elements to page after scrolling to bottom of the div
    const loadPopular = async () => {
      const res = await fetch(
        `${urlToApi}/${type}/${category}?api_key=${API_KEY}&page=${pageNumber}`
      );
      const object = await res.json();

      const sortData = () => {
        if (sortBy === popularityDecreasing) {
          return object.results.sort(
            (a: { popularity: number }, b: { popularity: number }) =>
              a.popularity < b.popularity
                ? 1
                : a.popularity > b.popularity
                ? -1
                : 0
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
    loadPopular();
  }, [pageNumber, sortBy]);

  const handleSelect = async (event: React.FormEvent<HTMLSelectElement>) => {
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

  const handleLoadOnScroll = (e: React.UIEvent<HTMLDivElement>) => {
    //calculating bottom of the scrolling div, after that setting pageNumber that triggers useEffect to load more on the page/div
    const containerHeight = e.currentTarget.clientHeight;
    const scrollHeight = e.currentTarget.scrollHeight;
    const scrollTop = e.currentTarget.scrollTop;
    if (((scrollTop + containerHeight) / scrollHeight) * 100 === 100) {
      let newPageNumber = pageNumber;
      if (sortBy === popularityDecreasing || sortBy === ratingDecreasing) {
        newPageNumber++;
      } else if (
        sortBy === popularityIncreasing ||
        sortBy === ratingIncreasing
      ) {
        newPageNumber--;
      }
      setPageNumber(newPageNumber);
    }
  };

  return (
    <div
      ref={divRef}
      onScroll={handleLoadOnScroll}
      className="flex flex-col w-screen max-h-[calc(100vh_-_5rem)] overflow-y-scroll pl-5 pr-5 bg-black gap-7"
    >
      <header>
        <form>
          <label
            htmlFor="sortBy"
            className="text-white border flex gap-3 h-fit p-2.5 flex-col overflow-hidden"
          >
            <span className="flex justify-between items-center text-3xl">
              Sort
            </span>
            <select
              value={sortBy}
              onChange={handleSelect}
              id="sortBy"
              className="bg-black border p-1"
            >
              <option value={popularityDecreasing}>
                Popularity decreasing
              </option>
              <option value={popularityIncreasing}>
                Popularity increasing
              </option>
              {type === 'person' ? null : (
                <>
                  <option value={ratingDecreasing}>Rating decreasing</option>
                  <option value={ratingIncreasing}>Rating Increasing</option>
                </>
              )}
            </select>
          </label>
        </form>
      </header>
      <div>
        <div
          className={
            type === 'person'
              ? 'grid place-items-center gap-4 grid-cols-2'
              : 'flex flex-col gap-5'
          }
        >
          {data &&
            data.map((object) => {
              return (
                <Link
                  className={
                    type === 'person' ? 'flex justify-center w-fit' : ' '
                  }
                  to={`/${type}/${object.id}`}
                >
                  <div
                    className={
                      object.poster_path
                        ? 'flex w-full border-2 h-40 rounded-lg'
                        : 'flex flex-col justify-center items-center w-40 border-2 h-64 rounded-lg'
                    }
                  >
                    <img
                      className={
                        object.poster_path
                          ? 'h-full rounded-l-lg'
                          : 'w-32 rounded-lg'
                      }
                      src={`${urlForImage}${
                        object.poster_path
                          ? object.poster_path
                          : object.profile_path
                      }`}
                      alt=""
                    />
                    <div className="flex flex-col justify-center p-2">
                      <div className="h-3/5">
                        <p className="text-white line-clamp-2">
                          {object.title ? object.title : object.name}
                        </p>
                        <p className="text-white">
                          {object.release_date
                            ? object.release_date
                            : object.first_air_date}
                        </p>
                      </div>
                      <p className="text-white line-clamp-2">
                        {object.overview}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          <div className="flex justify-center items-center">
            <BsArrowDownCircle className="text-white text-5xl animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
