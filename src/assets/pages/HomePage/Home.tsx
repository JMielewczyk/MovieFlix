import { useEffect, useState } from 'react';
import { BsDot } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import {
  loadFeatured,
  loadPopularActors,
  loadTopRated,
  loadTrending,
} from '../../utils/fetchFunctions';

const Home = () => {
  const [mediaType, setMediaType] = useState('movie');
  const [timeWindow, setTimeWindow] = useState('day');
  const [featuredMovieID, setFeaturedMovieID] = useState('');
  const [featuredMovieImage, setFeaturedMovieImage] = useState('');
  const [genres, setGenres] = useState<string[]>([]);
  const [trending, setTrending] = useState<null | Array<Object>>(null);
  const [topRated, setTopRated] = useState<null | Array<Object>>(null);
  const [actors, setActors] = useState<null | Array<Object>>(null);
  const navigate = useNavigate();
  const urlForImageFetch = 'https://image.tmdb.org/t/p/original';
  useEffect(() => {
    loadFeatured(
      setFeaturedMovieImage,
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
      setFeaturedMovieImage,
      setFeaturedMovieID,
      setGenres,
      mediaType,
      timeWindow
    );
    loadTrending(setTrending, mediaType, timeWindow);
    loadTopRated(setTopRated, mediaType);
  }, [mediaType, timeWindow]);

  return (
    <div className="flex flex-col w-screen min-h-screen bg-black gap-10 overflow-x-hidden">
      <header className="w-screen h-4/5 pl-5 pr-5">
        <div className="w-full h-full relative rounded-lg overflow-hidden">
          <img
            className="w-full h-full object-fill"
            src={featuredMovieImage}
            alt=" "
          />
          <Link
            to={`${mediaType}/${featuredMovieID}`}
            className="absolute top-0 w-full h-5/6"
          ></Link>
          <div className="absolute flex-col flex-wrap bottom-0 w-full flex h-1/5 justify-evenly items-center pr-5 pl-5 backdrop-blur-sm">
            <div className="flex flex-row justify-evenly w-full items-center">
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
            <div className="w-full h-10 flex justify-between gap-5">
              <button
                onClick={() => {
                  navigate(`movie/${featuredMovieID}`);
                }}
                className="bg-white w-full h-full rounded-lg"
              >
                Show
              </button>
              <button className="bg-white w-full h-full rounded-lg">
                Add to list
              </button>
            </div>
          </div>
        </div>
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
        <div className="flex w-full overflow-x-scroll transition-all">
          {trending &&
            trending.map((object: { poster_path?: string; id?: number }) => (
              <Link to={`${mediaType}/${object.id}`}>
                <div className="w-44 flex-shrink-0 pr-3">
                  <img
                    className="rounded-lg object-fill "
                    src={urlForImageFetch + object.poster_path}
                    alt=""
                  />
                </div>
              </Link>
            ))}
        </div>
        <p className="text-white text-4xl">Top Rated</p>
        <div className="flex w-full overflow-x-scroll">
          {topRated &&
            topRated.map((object: { poster_path?: string; id?: number }) => (
              <Link to={`movie/${object.id}`}>
                <div className="w-44 flex-shrink-0 pr-3">
                  <img
                    className="rounded-lg object-fill "
                    src={urlForImageFetch + object.poster_path}
                    alt=""
                  />
                </div>
              </Link>
            ))}
        </div>
        <p className="text-white text-4xl">Popular Actors</p>
        <div className="flex w-full overflow-x-scroll">
          {actors &&
            actors.map(
              (object: {
                profile_path?: string;
                name?: string;
                id?: number;
              }) => (
                <Link to={`person/${object.id}`}>
                  <div className="flex flex-col gap-1">
                    <div className="w-44 flex-shrink-0 pr-3 relative">
                      <img
                        className="rounded-lg object-fill"
                        src={urlForImageFetch + object.profile_path}
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
