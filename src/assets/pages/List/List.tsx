import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const List = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const urlToApi = 'https://api.themoviedb.org/3';
  const urlForImage = 'https://image.tmdb.org/t/p/original';
  const { category, type } = useParams();
  const [data, setData] = useState<Array<Object>>([]);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
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
    const loadPopular = async () => {
      const res = await fetch(
        `${urlToApi}/${type}/${category}?api_key=${API_KEY}&page=${pageNumber}`
      );
      const object = await res.json();
      setData(object.results);
    };
    loadPopular();
  }, [category, type]);

  return (
    <div className="flex flex-col w-screen min-h-screen overflow-hidden pl-5 pr-5 bg-black gap-7">
      <main>
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
                        <p className="text-white">
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
        </div>
      </main>
    </div>
  );
};

export default List;
