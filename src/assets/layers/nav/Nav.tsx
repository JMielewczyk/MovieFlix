//Hooks
import React, { useEffect, useState } from 'react';
//React Router
import { Link } from 'react-router-dom';
//Icons
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';

const Nav = () => {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [moviesCategories, setMoviesCategories] = useState(false);
  const [tvCategories, setTVCategories] = useState(false);
  const [peopleActive, setPeopleActive] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<string>(' ');

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener('scroll', updateScrollDirection);
    return () => {
      window.removeEventListener('scroll', updateScrollDirection); // clean up
    };
  }, [scrollDirection]);
  return (
    <>
      <nav
        className={`w-full ${
          scrollDirection === 'down' ? '-top-24' : 'top-0'
        } h-16 bg-transparent sticky top-0 left-0 z-10 flex justify-between items-center p-5 backdrop-blur-sm transition-all`}
      >
        <Link to="/" className="text-3xl font-bold text-white">
          MovieFlix
        </Link>

        <AiOutlineMenu
          onClick={() => {
            setIsAsideOpen((prevState) => !prevState);
          }}
          className="text-white h-full w-6"
        />
      </nav>
      <aside
        className={
          isAsideOpen
            ? 'flex flex-col w-screen overflow-y-scroll h-screen fixed top-0 left-0 z-20 flex-grow bg-black/50 backdrop-blur-md  translate-x-0 transition-all'
            : 'flex flex-col w-screen overflow-y-scroll h-screen fixed top-0 left-0 z-20 flex-grow  bg-black/50 backdrop-blur-md  translate-x-full transition-all'
        }
      >
        <div className="flex w-full h-16 justify-end items-center p-4">
          <ImCross
            onClick={() => {
              setIsAsideOpen((prevState) => !prevState);
              setMoviesCategories(false);
              setTVCategories(false);
              setPeopleActive(false);
            }}
            className="text-white h-full w-10"
          />
        </div>
        <div className="flex flex-grow flex-col items-center justify-start gap-12 pt-20">
          <div
            onClick={() => {
              setMoviesCategories((prevState) => !prevState);
              setTVCategories(false);
              setPeopleActive(false);
            }}
            className={
              moviesCategories
                ? 'flex flex-col text-5xl gap-12 w-full h-fit overflow-hidden text-white text-center '
                : 'flex flex-col text-5xl w-full h-12 overflow-hidden text-white text-center'
            }
          >
            Movies
            <ul
              className={
                moviesCategories
                  ? 'flex flex-col gap-5 translate-x-0 transition-all'
                  : 'flex flex-col gap-5 translate-x-full transition-all'
              }
            >
              <Link
                onClick={() => {
                  setIsAsideOpen(false);
                }}
                to={`list/movie/popular`}
              >
                <li className="text-xl">Popular</li>
              </Link>
              <Link
                onClick={() => {
                  setIsAsideOpen(false);
                }}
                to={`list/movie/top_rated`}
              >
                <li className="text-xl">Best rating</li>
              </Link>
              <Link
                onClick={() => {
                  setIsAsideOpen(false);
                }}
                to={`list/movie/upcoming`}
              >
                <li className="text-xl">Upcoming</li>
              </Link>
              <Link
                onClick={() => {
                  setIsAsideOpen(false);
                }}
                to={`list/movie/now_playing`}
              >
                <li className="text-xl">In Theaters</li>
              </Link>
            </ul>
          </div>
          <div
            onClick={() => {
              setTVCategories((prevState) => !prevState);
              setMoviesCategories(false);
              setPeopleActive(false);
            }}
            className={
              tvCategories
                ? 'flex flex-col text-5xl gap-12 w-full h-fit overflow-hidden text-white text-center '
                : 'flex flex-col text-5xl w-full h-12 overflow-hidden text-white text-center'
            }
          >
            TV shows
            <ul
              className={
                tvCategories
                  ? 'flex flex-col gap-5 translate-x-0 transition-all'
                  : 'flex flex-col gap-5 translate-x-full transition-all'
              }
            >
              <Link
                onClick={() => {
                  setIsAsideOpen(false);
                }}
                to={`list/tv/popular`}
              >
                <li className="text-xl">Popular</li>
              </Link>
              <Link
                onClick={() => {
                  setIsAsideOpen(false);
                }}
                to={`list/tv/top_rated`}
              >
                <li className="text-xl">Best rating</li>
              </Link>
              <Link
                onClick={() => {
                  setIsAsideOpen(false);
                }}
                to={`list/tv/on_the_air`}
              >
                <li className="text-xl">In TV</li>
              </Link>
              <Link
                onClick={() => {
                  setIsAsideOpen(false);
                }}
                to={`list/tv/airing_today`}
              >
                <li className="text-xl">Today in TV</li>
              </Link>
            </ul>
          </div>
          <div
            onClick={() => {
              setPeopleActive((prevState) => !prevState);
              setMoviesCategories(false);
              setTVCategories(false);
            }}
            className={
              peopleActive
                ? 'flex flex-col text-5xl gap-12 w-full h-fit overflow-hidden text-white text-center '
                : 'flex flex-col text-5xl w-full h-12 overflow-hidden text-white text-center'
            }
          >
            People
            <ul
              className={
                peopleActive
                  ? 'flex flex-col gap-5 translate-x-0 transition-all'
                  : 'flex flex-col gap-5 translate-x-full transition-all'
              }
            >
              <Link
                onClick={() => {
                  setIsAsideOpen(false);
                }}
                to={`list/person/popular`}
              >
                <li className="text-xl">Popular people</li>
              </Link>
            </ul>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Nav;
