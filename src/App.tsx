import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Home from './assets/pages/HomePage/Home';
import Movie from './assets/pages/Movie/Movie';
import Actors from './assets/pages/Actors/Actors';
import List from './assets/pages/List/List';
import Search from './assets/pages/Search/Search';
import Nav from './assets/layers/nav/Nav';
import Footer from './assets/layers/footer/Footer';

function App() {
  const [searchInputHome, setSearchInputHome] = useState('');

  return (
    <HashRouter>
      <Nav />
      <div className="min-h-screen max-w-screen-2xl w-screen bg-black m-auto ">
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
      <Footer />
    </HashRouter>
  );
}

export default App;
