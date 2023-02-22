import { useEffect, useState } from 'react';
import { BsArrowDownCircle } from 'react-icons/bs';
import { FaRegSadCry } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { IdataObject } from './interfaces';

const SearchList = () => {
  const { type, query } = useParams();
  const API_KEY = import.meta.env.VITE_API_KEY;
  const urlToApi = 'https://api.themoviedb.org/3';
  const urlForImage = 'https://image.tmdb.org/t/p/original';
  const [data, setData] = useState<Array<IdataObject>>([]);
  useEffect(() => {
    const loadContent = async () => {
      const res = await fetch(
        `${urlToApi}/search/${type}?api_key=${API_KEY}&query=${query}`
      );
      const data = await res.json();
      setData(data.results);
    };
    loadContent();
  }, []);

  useEffect(() => {
    const loadContent = async () => {
      const res = await fetch(
        `${urlToApi}/search/${type}?api_key=${API_KEY}&query=${query}`
      );
      const data = await res.json();
      setData(data.results);
    };
    loadContent();
  }, [type, query]);
  console.log(data);
  return (
    <div className="flex flex-col">
      {' '}
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
                  type !== 'person' ? 'flex w-full justify-center' : ' '
                }
                to={`/${type}/${object.id}`}
              >
                <div
                  className={
                    type !== 'person'
                      ? 'flex w-full border-2 h-40 rounded-lg'
                      : 'flex flex-col justify-center items-center w-40 border-2 h-64 rounded-lg'
                  }
                >
                  {object.poster_path ? (
                    <img
                      className="h-full rounded-l-lg"
                      src={`${urlForImage}${
                        type !== 'person'
                          ? object.poster_path
                          : object.profile_path
                      }`}
                      alt=""
                    />
                  ) : (
                    <div className="flex flex-col w-28 justify-center p-2 gap-2 items-center h-full">
                      <p className="text-white text-center">
                        Sorry, no image available
                      </p>
                      <FaRegSadCry className="text-white text-5xl" />
                    </div>
                  )}
                  <div
                    className={
                      type !== 'person'
                        ? 'flex flex-col w-60 justify-center p-2'
                        : 'flex flex-col w-full justify-center p-2'
                    }
                  >
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
        <div className="flex justify-center items-center">
          <BsArrowDownCircle className="text-white text-5xl animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default SearchList;
