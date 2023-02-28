import { useEffect, useState } from 'react';
import { FaRegSadCry } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { loadContent } from './features';
import { IdataObject } from './interfaces';

const SearchList = () => {
  const { type, query } = useParams();
  const urlForImage = 'https://image.tmdb.org/t/p/original';
  const [data, setData] = useState<Array<IdataObject>>([]);
  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  useEffect(() => {
    loadContent(type, query, currentPage, setPages, setData);
    console.log(data);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    loadContent(type, query, 1, setPages, setData); // nr 1 is setting current page to 1
    setCurrentPage(1);
  }, [type, query]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    loadContent(type, query, currentPage, setPages, setData);
  }, [currentPage]);

  return (
    <div className="flex flex-col">
      <div
        className={
          type === 'person'
            ? 'grid w-full place-items-center gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'
            : 'grid gap-5 grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))]'
        }
      >
        {data.length === 0 ? (
          <p className="text-white text-xl">
            No results for {`${query}`} in {`${type}`} category
          </p>
        ) : (
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
                      className={
                        type !== 'person'
                          ? 'h-full rounded-l-lg'
                          : 'w-32 rounded-lg'
                      }
                      src={`${urlForImage}${object.poster_path}`}
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
          })
        )}
      </div>
      <div className="flex justify-evenly items-center pt-5">
        {pages.map((page) => {
          if (pages.length === 1) return;
          if (page <= currentPage && page >= currentPage - 5) {
            return (
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  setCurrentPage(Number(e.currentTarget.textContent));
                }}
                className="text-white flex-grow text-center"
              >
                {page}
              </button>
            );
          } else if (page > currentPage && page <= currentPage + 4) {
            return (
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  setCurrentPage(Number(e.currentTarget.textContent));
                }}
                className="text-white flex-grow text-center"
              >
                {page}
              </button>
            );
          } else if (page <= currentPage + 5 && page > currentPage - 5) {
            return (
              <span className="text-white flex-grow text-center">...</span>
            );
          } else if (page >= pages.length - 1) {
            return (
              <button
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  setCurrentPage(Number(e.currentTarget.textContent));
                }}
                className="text-white flex-grow text-center"
              >
                {page}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SearchList;
