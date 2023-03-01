//React Router
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
//React Icons
import { BsSearch } from 'react-icons/bs';
//Interfaces
import { ISearch } from './interfaces';
//Pages
import SearchList from './SearchList/SearchList';

const Search = ({ searchInput, setSearchInput }: ISearch) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full min-h-screen bg-black gap-10 overflow-x-hidden">
      <header className="pl-5 pr-5">
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            if (searchInput.length === 0) return;
            navigate(`/search/movie/${searchInput}`);
          }}
        >
          <label className="flex w-full bg-white rounded-lg overflow-hidden p-1">
            <input
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setSearchInput(e.currentTarget.value);
              }}
              value={searchInput}
              className="flex-grow p-2"
              placeholder={searchInput}
              type="text"
            />
            <button className="pl-5 pr-5 border-2 rounded-lg border-black active:bg-green-400 ">
              <BsSearch />
            </button>
          </label>
        </form>
      </header>
      <main className="flex flex-col gap-10  pl-5 pr-5">
        <div>
          <ul className="text-white flex border justify-between rounded-lg ">
            <NavLink
              className={({ isActive }) =>
                isActive ? 'flex-grow bg-green-400 rounded-l-lg' : 'flex-grow'
              }
              to={`/search/movie/${searchInput}`}
            >
              <li className="text-center border-r p-1">Movies</li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'flex-grow bg-green-400' : 'flex-grow'
              }
              to={`/search/tv/${searchInput}`}
            >
              <li className="text-center border-r p-1">TV shows</li>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? 'flex-grow bg-green-400 rounded-r-lg' : 'flex-grow'
              }
              to={`/search/person/${searchInput}`}
            >
              <li className="text-center p-1">People</li>
            </NavLink>
          </ul>
        </div>
        <Routes>
          <Route path={`/:type/:query`} element={<SearchList />} />
        </Routes>
      </main>
    </div>
  );
};

export default Search;
