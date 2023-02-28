import { useEffect, useState } from 'react';
import { BsDot, BsSearch } from 'react-icons/bs';
import { FaRegSadCry } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import {
  loadFeatured,
  loadPopularActors,
  loadTopRated,
  loadTrending,
} from './features';

interface IHome {
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
}

const Home = ({ searchInput, setSearchInput }: IHome) => {
  const [mediaType, setMediaType] = useState('movie');
  const [timeWindow, setTimeWindow] = useState('day');
  const [featuredMovieTitle, setFeaturedMovieTitle] = useState(' ');
  const [featuredMovieID, setFeaturedMovieID] = useState('');
  const [featuredMoviePoster, setFeaturedMoviePoster] = useState('');
  const [featuredMovieBackdrop, setFeaturedMovieBackdrop] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [trending, setTrending] = useState<null | Array<Object>>(null);
  const [topRated, setTopRated] = useState<null | Array<Object>>(null);
  const [actors, setActors] = useState<null | Array<Object>>(null);
  const navigate = useNavigate();
  const urlForImage = 'https://image.tmdb.org/t/p/original';
  useEffect(() => {
    loadFeatured(
      setFeaturedMovieTitle,
      setFeaturedMoviePoster,
      setFeaturedMovieBackdrop,
      setFeaturedMovieID,
      setGenres,
      mediaType,
      timeWindow
    );
    loadTrending(setTrending, mediaType, timeWindow);
    loadTopRated(setTopRated, mediaType);
    loadPopularActors(setActors);
  }, []);
  useEffect(() => {
    loadFeatured(
      setFeaturedMovieTitle,
      setFeaturedMoviePoster,
      setFeaturedMovieBackdrop,
      setFeaturedMovieID,
      setGenres,
      mediaType,
      timeWindow
    );
    loadTrending(setTrending, mediaType, timeWindow);
    loadTopRated(setTopRated, mediaType);
  }, [mediaType, timeWindow]);

  return (
    <div className="flex flex-col w-full min-h-screen bg-black gap-10 overflow-x-hidden">
      <header className="flex flex-col gap-10 w-full pl-5 pr-5">
        <Link
          className="flex flex-col gap-2.5"
          to={`${mediaType}/${featuredMovieID}`}
        >
          <div className="flex flex-col gap-2.5 w-full justify-center items-center">
            <div className="w-full h-full relative overflow-hidden rounded-lg max-h-[60vh]">
              <div className="absolute h-full md:w-48 w-full bg-black md:bg-inherit md:from-black md:via-black bg-gradient-to-r"></div>
              <div className="absolute h-full w-full flex justify-center md:justify-start items-center">
                <img
                  className="rounded-lg h-full md:h-2/4 2xl:h-3/4"
                  src={`${urlForImage}${featuredMoviePoster}`}
                  alt=""
                />
              </div>
              <div className="flex justify-center">
                <img
                  className="ml-2.5 rounded-lg max-w-screen-lg h-full"
                  src={`${urlForImage}${featuredMovieBackdrop}`}
                />
              </div>
              <div className="flex absolute bottom-0 backdrop-blur-lg flex-row justify-center gap-2.5 w-full items-center">
                {genres &&
                  genres.map((element, index) => {
                    if (index + 1 === genres.length) {
                      return <span className="text-white">{element}</span>;
                    } else {
                      return (
                        <>
                          <span className="text-white">{element}</span>
                          <BsDot className="text-white" />
                        </>
                      );
                    }
                  })}
              </div>
            </div>
          </div>
          <p className="text-white text-xl text-center">{featuredMovieTitle}</p>
        </Link>
        <form
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            if (searchInput.length === 0) return;
            navigate(`/search/movie/${searchInput}`);
          }}
          className="flex flex-col gap-2.5 md:items-center"
        >
          <h1 className="text-white text-3xl">Welcome</h1>
          <h3 className="text-white ">
            Millions of movies, TV shows and people to discover. Explore now.
          </h3>
          <label className="flex w-full max-w-screen-sm bg-white rounded-lg overflow-hidden p-1">
            <input
              onChange={(e: React.FormEvent<HTMLInputElement>) => {
                setSearchInput(e.currentTarget.value);
              }}
              value={searchInput}
              className="flex-grow p-2"
              placeholder="Search"
              type="text"
            />
            <button className="pl-5 pr-5 border-2 rounded-lg border-black active:bg-green-400 ">
              <BsSearch />
            </button>
          </label>
        </form>
      </header>
      <main className="flex flex-col gap-5 w-full overflow-hidden pl-5">
        <div className="flex flex-col gap-2.5">
          <p className="text-white text-4xl">Trending</p>
          <div className="flex w-full h-7 gap-5">
            <button
              onClick={() => {
                setTimeWindow('day');
              }}
              className={
                timeWindow === 'day'
                  ? 'bg-green-400 rounded-lg pl-2.5 pr-2.5'
                  : 'bg-white rounded-lg pl-2.5 pr-2.5'
              }
            >
              Today
            </button>
            <button
              onClick={() => {
                setTimeWindow('week');
              }}
              className={
                timeWindow === 'week'
                  ? 'bg-green-400 rounded-lg pl-2.5 pr-2.5'
                  : 'bg-white rounded-lg pl-2.5 pr-2.5'
              }
            >
              Weekly
            </button>
          </div>
          <div className="flex w-full h-7 gap-5">
            <button
              onClick={() => {
                setMediaType('movie');
              }}
              className={
                mediaType === 'movie'
                  ? 'bg-green-400 rounded-lg pl-2.5 pr-2.5'
                  : 'bg-white rounded-lg pl-2.5 pr-2.5'
              }
            >
              Movies
            </button>
            <button
              onClick={() => {
                setMediaType('tv');
              }}
              className={
                mediaType === 'tv'
                  ? 'bg-green-400 rounded-lg pl-2.5 pr-2.5'
                  : 'bg-white rounded-lg pl-2.5 pr-2.5'
              }
            >
              TV shows
            </button>
            <button
              onClick={() => {
                setMediaType('person');
              }}
              className={
                mediaType === 'person'
                  ? 'bg-green-400 rounded-lg pl-2.5 pr-2.5'
                  : 'bg-white rounded-lg pl-2.5 pr-2.5'
              }
            >
              People
            </button>
          </div>
        </div>
        <div className="flex w-full overflow-x-scroll md:overflow-visible md:grid md:gap-2.5  md:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
          {trending &&
            trending.map(
              (object: {
                poster_path?: string;
                id?: number;
                title?: string;
                original_name?: string;
                known_for_department?: string;
              }) => (
                <Link
                  className="flex justify-center"
                  to={`${mediaType}/${object.id}`}
                >
                  <div className="w-44 h-fit flex-shrink-0 pr-3 md:pr-0">
                    {object.poster_path ? (
                      <img
                        className="rounded-lg object-fill "
                        src={`${urlForImage}${object.poster_path}`}
                        alt=""
                      />
                    ) : (
                      <div className="flex flex-col justify-center gap-5 items-center border rounded-lg w-full h-5/6">
                        <p className="text-white text-center">
                          Sorry, no image
                        </p>
                        <FaRegSadCry className="text-white text-5xl" />
                      </div>
                    )}

                    <p className="text-white text-center line-clamp-1">
                      {object.title}
                      {object.original_name}
                    </p>
                    {mediaType === 'person' ? (
                      <p className="text-white text-center line-clamp-1">
                        {object.known_for_department}
                      </p>
                    ) : null}
                  </div>
                </Link>
              )
            )}
        </div>
        {mediaType !== 'person' ? (
          <>
            <p className="text-white text-4xl">Top Rated</p>
            <div className="flex w-full overflow-x-scroll md:overflow-visible md:grid md:gap-2.5  md:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
              {topRated &&
                topRated.map(
                  (object: { poster_path?: string; id?: number }) => (
                    <Link
                      className="flex justify-center"
                      to={`movie/${object.id}`}
                    >
                      <div className="w-44 h-fit flex-shrink-0 pr-3 md:pr-0">
                        <img
                          className=" rounded-lg object-fill "
                          src={urlForImage + object.poster_path}
                          alt=""
                        />
                      </div>
                    </Link>
                  )
                )}
            </div>
          </>
        ) : null}

        <p className="text-white text-4xl">Popular Actors</p>
        <div className="flex w-full overflow-x-scroll md:overflow-visible md:grid md:gap-2.5 md:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
          {actors &&
            actors.map(
              (object: {
                profile_path?: string;
                name?: string;
                id?: number;
              }) => (
                <Link
                  className="flex justify-center"
                  to={`person/${object.id}`}
                >
                  <div className="flex flex-col gap-1">
                    <div className="w-44 h-fit flex-shrink-0 pr-3 md:pr-0">
                      <img
                        className="rounded-lg object-fill"
                        src={urlForImage + object.profile_path}
                        alt=""
                      />
                    </div>
                    <p className="text-white text-center pr-2.5">
                      {object.name}
                    </p>
                  </div>
                </Link>
              )
            )}
        </div>
      </main>
    </div>
  );
};

export default Home;
