import React, { useEffect, useRef, useState } from 'react';
import { BsArrowDownCircle } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import {
  handleLoadOnScroll,
  handleSelect,
  loadPopular,
  loadPopularSort,
} from './features';
import { IdataObject } from './interfaces';

const sortingOptions = {
  popularityDecreasing: 'popularityDecreasing',
  popularityIncreasing: 'popularityIncreasing',
  ratingDecreasing: 'ratingDecreasing',
  ratingIncreasing: 'ratingIncreasing',
};

const List = () => {
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
  const urlForImage = 'https://image.tmdb.org/t/p/original';
  useEffect(() => {
    //loading elements after first render
    loadPopular(type, category, pageNumber, setData);
  }, []);

  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = 0;
    }
    const pageNumber = 1; // setting variable instead of state pageNumber to fix loading categories not matching in one element
    setSortBy('popularityDecreasing');
    loadPopular(type, category, pageNumber, setData);
    setPageNumber(1); // setting state now will prevent taking the wrong pageNumber when changing category or type
  }, [category, type]);

  useEffect(() => {
    //fetching more elements to page after scrolling to bottom of the div and sorting new elements
    loadPopularSort(
      type,
      category,
      pageNumber,
      setData,
      sortBy,
      popularityDecreasing,
      popularityIncreasing,
      ratingIncreasing,
      ratingDecreasing,
      maxPages,
      data
    );
  }, [pageNumber, sortBy]);

  return (
    <div
      ref={divRef}
      onScroll={(e) =>
        handleLoadOnScroll(
          e,
          pageNumber,
          sortBy,
          popularityDecreasing,
          popularityIncreasing,
          ratingDecreasing,
          ratingIncreasing,
          setPageNumber
        )
      }
      className="flex flex-col w-full xl:max-h-[calc(87vh_-_5rem)] max-h-[calc(100vh_-_5rem)] overflow-y-scroll pl-5 pr-5 bg-black gap-7 scrollbar scrollbar-track-slate-500 scrollbar-track-rounded-lg scrollbar-thumb-slate-300 scrollbar-thumb-rounded-lg"
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
              onChange={(e) =>
                handleSelect(
                  e,
                  popularityDecreasing,
                  popularityIncreasing,
                  ratingDecreasing,
                  ratingIncreasing,
                  setSortBy,
                  setPageNumber,
                  maxPages
                )
              }
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
      <div
        className={
          type === 'person'
            ? 'grid w-full place-items-center gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
            : 'grid gap-5 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]'
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
                    <p className="text-white line-clamp-2">{object.overview}</p>
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      <div className="flex justify-center items-center">
        <BsArrowDownCircle className="text-white text-5xl animate-bounce" />
      </div>
    </div>
  );
};

export default List;
