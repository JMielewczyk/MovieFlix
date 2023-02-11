import { useState } from 'react';
import { HashRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { ImCross } from 'react-icons/im';

import Home from './assets/pages/HomePage/Home';
import Movie from './assets/pages/Movie/Movie';
import Actors from './assets/pages/Actors/Actors';

function App() {
  const [isAsideOpen, setIsAsideOpen] = useState(false);

  return (
    <HashRouter>
      <div className="w-screen bg-black">
        <nav className="w-screen h-16 bg-transparent fixed top-0 left-0 z-10 flex justify-between items-center p-5 backdrop-blur-sm">
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
              ? 'flex flex-col w-screen h-screen fixed top-0 left-0 z-20 flex-grow bg-black/50 backdrop-blur-md  translate-x-0 transition-all'
              : 'flex flex-col w-screen h-screen fixed top-0 left-0 z-20 flex-grow  bg-black/50 backdrop-blur-md  translate-x-full transition-all'
          }
        >
          <div className="flex w-full h-16 justify-end items-center p-4">
            <ImCross
              onClick={() => {
                setIsAsideOpen((prevState) => !prevState);
              }}
              className="text-white h-full w-10"
            />
          </div>
          <div className="flex flex-grow flex-col items-center justify-evenly gap-10 pb-16">
            <NavLink className="text-white text-4xl" to={'/'}>
              Home
            </NavLink>
            <NavLink className="text-white text-4xl" to={'/'}>
              Home
            </NavLink>
            <NavLink className="text-white text-4xl" to={'/'}>
              Home
            </NavLink>
            <NavLink className="text-white text-4xl" to={'/'}>
              Home
            </NavLink>
            <NavLink className="text-white text-4xl" to={'/'}>
              Home
            </NavLink>
          </div>
        </aside>
        <div className="w-screen bg-black pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:movieid" element={<Movie />} />
            <Route path="/actors/:actorid" element={<Actors />} />
          </Routes>
        </div>
        <footer className="bg-slate-400">
          <p className="text-white">This is footer</p>
        </footer>
      </div>
    </HashRouter>
  );
}

export default App;
