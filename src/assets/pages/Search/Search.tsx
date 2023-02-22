import { useContext } from 'react';
import { BsSearch } from 'react-icons/bs';
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import SearchList from './SearchList/SearchList';

interface ISearch {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const Search = ({ searchInput, setSearchInput }: ISearch) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-screen min-h-screen bg-black gap-10 overflow-x-hidden">
      <header className="pl-5 pr-5">
        <form
          onSubmit={() => {
            if (searchInput.length === 0) return;
            navigate(`/search/${searchInput}`);
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
      <main className="pl-5 pr-5">
        <div>
          <ul className="text-white flex border justify-between rounded-lg">
            <NavLink to={`/search/movie/${searchInput}`}>
              <li className="flex-grow text-center border-r p-1">Movies</li>
            </NavLink>
            <NavLink to={`/search/tv/${searchInput}`}>
              <li className="flex-grow text-center border-r p-1">TV shows</li>
            </NavLink>
            <NavLink to={`/search/person/${searchInput}`}>
              <li className="flex-grow text-center p-1">People</li>
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
