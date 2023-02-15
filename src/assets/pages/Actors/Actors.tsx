import { useEffect, useState } from 'react';
import {
  AiFillTwitterSquare,
  AiOutlineArrowDown,
  AiOutlineFacebook,
  AiOutlineInstagram,
} from 'react-icons/ai';
import { FaRegSadCry } from 'react-icons/fa';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ICredits, IdataDetails, Iexternal } from './interfaces';

const Actors = () => {
  const urlToApi = 'https://api.themoviedb.org/3';
  const urlForImage = 'https://image.tmdb.org/t/p/original';
  const API_KEY = import.meta.env.VITE_API_KEY;
  const { actorid } = useParams();
  const [dataDetails, setDataDetails] = useState<IdataDetails>([]);
  const [yearsOld, setYearsOld] = useState<number>(0);
  const [external, setExternal] = useState<Iexternal>({});
  const [movieCredits, setMovieCredits] = useState<ICredits>([]);
  const [tvCredits, setTVCredits] = useState<ICredits>([]);
  const [movieTimeline, setMovieTimeline] = useState<ICredits>([]);
  const [tvTimeline, setTVTimeline] = useState<ICredits>([]);
  const [fullBiography, setFullBiography] = useState(false);
  const [fullMovieTimeline, setFullMovieTimeline] = useState(false);
  const [fullTVTimeline, setFullTVTimeline] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const getDetails = async () => {
      const resDetails = await fetch(
        `${urlToApi}/person/${actorid}?api_key=${API_KEY}`
      );
      const dataDetails = await resDetails.json();
      setDataDetails(dataDetails);

      const dateNow = dataDetails.deathday
        ? new Date(dataDetails.deathday).getTime()
        : new Date().getTime();
      const birthDate = new Date(dataDetails.birthday).getTime();
      let yearsOld = Math.floor(
        (dateNow - birthDate) / (1000 * 60 * 60 * 24 * 365.25)
      );
      setYearsOld(yearsOld);
      const resExternal = await fetch(
        `${urlToApi}/person/${actorid}/external_ids?api_key=${API_KEY}`
      );
      const dataExternal = await resExternal.json();
      setExternal(dataExternal);

      const loadMoviesAndTV = async (type: string) => {
        const resCredits = await fetch(
          `${urlToApi}/person/${actorid}/${type}?api_key=${API_KEY}`
        );
        const dataCredits = await resCredits.json();
        const sortedByPopularity = dataCredits.cast.sort(
          (a: { popularity: number }, b: { popularity: number }) =>
            b.popularity - a.popularity
        );

        const popularOnlyReleased = sortedByPopularity.filter(
          (object: { release_date?: string; first_air_date?: string }) => {
            if (object.release_date) {
              const releaseDate = new Date(object.release_date);
              const nowDate = new Date();
              return releaseDate < nowDate;
            } else if (object.first_air_date) {
              const releaseDate = new Date(object.first_air_date);
              const nowDate = new Date();
              return releaseDate < nowDate;
            }
          }
        );
        const sortedByDate = dataCredits.cast.sort(
          (
            a: { release_date?: string; first_air_date?: string },
            b: { release_date?: string; first_air_date?: string }
          ) => {
            if (a.release_date && b.release_date) {
              return (
                (new Date(b.release_date) as any) -
                (new Date(a.release_date) as any)
              );
            } else if (a.first_air_date && b.first_air_date) {
              return (
                (new Date(b.first_air_date) as any) -
                (new Date(a.first_air_date) as any)
              );
            }
          }
        );
        const byDateOnlyReleased = sortedByDate.filter(
          (object: { release_date?: string; first_air_date?: string }) => {
            if (object.release_date) {
              const nowDate = new Date();
              const movieDate = new Date(object.release_date);
              return nowDate > movieDate;
            } else if (object.first_air_date) {
              const nowDate = new Date();
              const movieDate = new Date(object.first_air_date);
              return nowDate > movieDate;
            }
          }
        );
        const onlyYear = byDateOnlyReleased.map(
          (object: { release_date?: any; first_air_date?: any }) => {
            if (object.release_date) {
              object.release_date = new Date(object.release_date).getFullYear();
              return object;
            } else if (object.first_air_date) {
              object.first_air_date = new Date(
                object.first_air_date
              ).getFullYear();
              return object;
            }
          }
        );
        if (type === 'movie_credits') {
          setMovieCredits(popularOnlyReleased);
          setMovieTimeline(onlyYear);
        } else if (type === 'tv_credits') {
          setTVCredits(popularOnlyReleased);
          setTVTimeline(onlyYear);
        }
      };
      loadMoviesAndTV('movie_credits');
      loadMoviesAndTV('tv_credits');
    };
    getDetails();
  }, []);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);
  console.log(tvTimeline);
  return (
    <div className="flex flex-col w-screen min-h-screen overflow-hidden pl-5 pr-5 bg-black gap-7">
      <header className="w-full h-4/5 flex flex-col gap-2.5">
        <div className="w-full flex justify-center items-center">
          <div className="w-40 h-40 rounded-lg overflow-hidden">
            <img
              className="w-full -translate-y-5"
              src={`${urlForImage}${dataDetails.profile_path}`}
              alt=""
            />
          </div>
        </div>
        <h1 className="text-white text-3xl text-center">{dataDetails.name}</h1>
        <div className="flex justify-center items-center">
          {external.facebook_id && (
            <Link to={`https://www.facebook.com/${external.facebook_id}`}>
              <AiOutlineFacebook className="text-white text-5xl" />
            </Link>
          )}
          {external.instagram_id && (
            <Link to={`https://www.instagram.com/${external.instagram_id}`}>
              <AiOutlineInstagram className="text-white text-5xl" />
            </Link>
          )}
          {external.twitter_id && (
            <Link to={`https://twitter.com/${external.twitter_id}`}>
              <AiFillTwitterSquare className="text-white text-5xl" />
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="text-white text-xl">Personal information</p>
          <div>
            <p className="text-white">Known for</p>
            <p className="text-white font-light">
              {dataDetails.known_for_department}
            </p>
          </div>
          <div>
            <p className="text-white">Birthday:</p>
            <p className="text-white font-light">
              {dataDetails.birthday}
              {dataDetails.deathday ? null : ` (${yearsOld} years old)`}
            </p>
          </div>
          <div>
            <p className="text-white">Date of death:</p>
            <p className="text-white font-light">
              {dataDetails.deathday}
              {dataDetails.deathday ? ` (${yearsOld} years old)` : null}
            </p>
          </div>
          <div>
            <p className="text-white">Place of birth:</p>
            <p className="text-white font-light">
              {dataDetails.place_of_birth}
            </p>
          </div>
        </div>
      </header>
      <main className="w-full flex flex-col gap-5">
        <div className="flex flex-col gap-2.5">
          <p className="text-white text-xl">Biography</p>
          <p
            className={
              fullBiography
                ? 'text-white font-light'
                : 'text-white font-light max-h-60 overflow-hidden'
            }
          >
            {dataDetails.biography}
          </p>
          <button
            onClick={() => {
              setFullBiography((prevState) => !prevState);
            }}
            className="text-white flex justify-center gap-2.5 items-center border-t-2"
          >
            {fullBiography ? (
              <>
                <AiOutlineArrowDown className="rotate-180" />
                <p>Show less</p>
                <AiOutlineArrowDown className="rotate-180" />
              </>
            ) : (
              <>
                <AiOutlineArrowDown />
                <p>Show more</p>
                <AiOutlineArrowDown />
              </>
            )}
          </button>
        </div>
        <div className="flex flex-col w-full overflow-x-scroll transition-all gap-2.5">
          <p className="text-xl text-white ">Acted in movies</p>
          <div className="flex overflow-x-scroll">
            {movieCredits &&
              movieCredits.map((object) => (
                <Link to={`/movie/${object.id}`}>
                  <div className="flex flex-col justify-between w-44 min-h-full border-2 flex-shrink-0 mr-3 rounded-lg">
                    {typeof object.poster_path === 'string' ? (
                      <img
                        className="object-cover rounded-t-lg"
                        src={`${urlForImage}${object.poster_path}`}
                        alt=""
                      />
                    ) : (
                      <div className="flex flex-col justify-center gap-5 items-center w-full h-3/4 mb-2">
                        <p className="text-white text-center">
                          Sorry, no image for this movie
                        </p>
                        <FaRegSadCry className="text-white text-5xl" />
                      </div>
                    )}
                    <div className="w-full flex-grow flex justify-center items-center">
                      <p className="text-white font-bold">{object.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col w-full overflow-x-scroll transition-all gap-2.5">
          <p className="text-xl text-white ">Was in TV Shows</p>
          <div className="flex overflow-x-scroll">
            {tvCredits &&
              tvCredits.map((object) => (
                <Link to={`/tv/${object.id}`}>
                  <div className="flex flex-col justify-between w-44 min-h-full border-2 flex-shrink-0 mr-3 rounded-lg">
                    {typeof object.poster_path === 'string' ? (
                      <img
                        className="object-cover rounded-t-lg"
                        src={`${urlForImage}${object.poster_path}`}
                        alt=""
                      />
                    ) : (
                      <div className="flex flex-col justify-center gap-5 items-center w-full h-3/4 mb-2">
                        <p className="text-white text-center">
                          Sorry, no image for this movie
                        </p>
                        <FaRegSadCry className="text-white text-5xl" />
                      </div>
                    )}
                    <div className="w-full flex-grow flex justify-center items-center">
                      <p className="text-white font-bold">{object.title}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <p className="text-white text-3xl">Timeline</p>
          <div className="flex overflow-x-scroll gap-5">
            {movieTimeline && (
              <div className="flex flex-col gap-2.5 flex-shrink-0 w-full">
                <p className="text-white">Movies</p>
                <div
                  className={
                    fullMovieTimeline
                      ? 'flex flex-col gap-1 border-2 border-slate-500 rounded-lg max-h-max'
                      : 'flex flex-col gap-1 border-2 border-slate-500 rounded-lg  h-60 overflow-hidden'
                  }
                >
                  {movieTimeline.map((object) => (
                    <Link to={`/movie/${object.id}`}>
                      <div className="flex gap-5 border-b border-slate-500 pl-2.5">
                        <div className="flex justify-center items-center ">
                          <p className="text-white">{object.release_date}</p>
                        </div>
                        <div>
                          <p className="text-white">{object.title}</p>
                          {object.character && (
                            <p className="text-white">as {object.character}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setFullMovieTimeline((prevState) => !prevState);
                  }}
                  className="text-white flex justify-center gap-2.5 items-center border-t-2"
                >
                  {fullMovieTimeline ? (
                    <>
                      <AiOutlineArrowDown className="rotate-180" />
                      <p>Show less</p>
                      <AiOutlineArrowDown className="rotate-180" />
                    </>
                  ) : (
                    <>
                      <AiOutlineArrowDown />
                      <p>Show more</p>
                      <AiOutlineArrowDown />
                    </>
                  )}
                  {fullMovieTimeline ? 'Show less' : 'Show more'}
                </button>
              </div>
            )}
            {tvTimeline && (
              <div className="flex flex-col gap-2.5 flex-shrink-0 w-full">
                <p className="text-white">TV Shows</p>
                <div
                  className={
                    fullTVTimeline
                      ? 'flex flex-col gap-1 border-2 border-slate-500 rounded-lg h-full'
                      : 'flex flex-col gap-1 border-2 border-slate-500 rounded-lg  h-60 overflow-hidden'
                  }
                >
                  {tvTimeline.map((object) => (
                    <Link to={`/tv/${object.id}`}>
                      <div className="flex gap-5 border-b border-slate-500 pl-2.5">
                        <div className="flex justify-center items-center ">
                          <p className="text-white">{object.first_air_date}</p>
                        </div>
                        <div>
                          <p className="text-white">{object.original_name}</p>
                          {object.character && (
                            <p className="text-white">as {object.character}</p>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setFullTVTimeline((prevState) => !prevState);
                  }}
                  className="text-white flex justify-center gap-2.5 items-center border-t-2"
                >
                  {fullTVTimeline ? (
                    <>
                      <AiOutlineArrowDown className="rotate-180" />
                      <p>Show less</p>
                      <AiOutlineArrowDown className="rotate-180" />
                    </>
                  ) : (
                    <>
                      <AiOutlineArrowDown />
                      <p>Show more</p>
                      <AiOutlineArrowDown />
                    </>
                  )}
                  {fullTVTimeline ? 'Show less' : 'Show more'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Actors;
