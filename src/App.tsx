import { useEffect, useState } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';
import { AiFillGithub, AiOutlineMenu } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';
import { CiLinkedin } from 'react-icons/ci';

import Home from './assets/pages/HomePage/Home';
import Movie from './assets/pages/Movie/Movie';
import Actors from './assets/pages/Actors/Actors';
import List from './assets/pages/List/List';
import Search from './assets/pages/Search/Search';

function App() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);
  const [moviesCategories, setMoviesCategories] = useState(false);
  const [tvCategories, setTVCategories] = useState(false);
  const [peopleActive, setPeopleActive] = useState(false);
  const [searchInputHome, setSearchInputHome] = useState('');
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
    <HashRouter>
      <div className="w-screen bg-black">
        <div className="min-h-screen max-w-screen-2xl w-screen bg-black m-auto ">
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
          <div className="w-full bg-black">
            <Routes>
              <Route
                path="/"
                element={
                  <Home
                    searchInput={searchInputHome}
                    setSearchInput={setSearchInputHome}
                  />
                }
              />
              <Route path="/:mediatype/:movieid" element={<Movie />} />
              <Route path="/person/:actorid" element={<Actors />} />
              <Route path="/list/:type/:category" element={<List />} />
              <Route
                path="/search/*"
                element={
                  <Search
                    searchInput={searchInputHome}
                    setSearchInput={setSearchInputHome}
                  />
                }
              />
            </Routes>
          </div>
          <footer className="bg-slate-700 flex flex-col text-center mt-10 gap-5 pt-2.5 pb-2.5 2xl:rounded-t-xl ">
            <p className="text-3xl ">MovieFlix</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero,
              voluptatem! Fuga soluta aspernatur iusto incidunt dolore in id
              eaque pariatur sit sunt quis magnam, nam explicabo, sed ea
              voluptatibus neque.
            </p>
            <p>Coded by:</p>
            <p>Jakub Mielewczyk</p>
            <div className="flex justify-center gap-5">
              <Link to="https://www.linkedin.com/in/jakub-mielewczyk-b411a6221/">
                <CiLinkedin className="text-5xl" />
              </Link>
              <Link to="https://github.com/JMielewczyk">
                <AiFillGithub className="text-5xl" />
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
