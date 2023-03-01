//Hooks
import { useEffect, useState } from 'react';
//React Router
import { Link, useParams } from 'react-router-dom';
//Utils
import {
  getDetails,
  getExternal,
  getImages,
  loadMoviesAndTV,
} from './features';
//React Icons
import {
  AiFillTwitterSquare,
  AiOutlineArrowDown,
  AiOutlineFacebook,
  AiOutlineInstagram,
} from 'react-icons/ai';
import {
  BsFillArrowDownCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { FaRegSadCry } from 'react-icons/fa';
//Interfaces
import { ICredits, IdataDetails, Iexternal } from './interfaces';

const Actors = () => {
  const urlForImage = 'https://image.tmdb.org/t/p/original';
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
  const [loadMoreMoviesBtn, setLoadMoreMoviesBtn] = useState(false);
  const [maxMoviesVisible, setMaxMoviesVisible] = useState(10);
  const [loadMoreTVBtn, setLoadMoreTVBtn] = useState(false);
  const [maxTVVisible, setMaxTVVisible] = useState(10);
  const [images, setImages] = useState([]);
  const [type, setType] = useState(' ');

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    getDetails(actorid, setDataDetails, setYearsOld);
    getExternal(actorid, setExternal);
    loadMoviesAndTV(
      'movie_credits',
      actorid,
      setMovieCredits,
      setMovieTimeline,
      setTVCredits,
      setTVTimeline,
      maxMoviesVisible,
      maxTVVisible,
      setLoadMoreMoviesBtn,
      setLoadMoreTVBtn
    );
    loadMoviesAndTV(
      'tv_credits',
      actorid,
      setMovieCredits,
      setMovieTimeline,
      setTVCredits,
      setTVTimeline,
      maxMoviesVisible,
      maxTVVisible,
      setLoadMoreMoviesBtn,
      setLoadMoreTVBtn
    );
    getImages(actorid, setImages);
  }, []);

  useEffect(() => {
    loadMoviesAndTV(
      type,
      actorid,
      setMovieCredits,
      setMovieTimeline,
      setTVCredits,
      setTVTimeline,
      maxMoviesVisible,
      maxTVVisible,
      setLoadMoreMoviesBtn,
      setLoadMoreTVBtn
    );
  }, [maxMoviesVisible, maxTVVisible]);

  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden pl-5 pr-5 bg-black gap-7">
      <header className="w-full h-4/5 flex flex-col gap-2.5">
        {dataDetails.profile_path ? (
          <div className="w-full flex justify-center items-center">
            <div className="w-40 h-40 md:w-[300px] md:h-auto lg:w-[400px] rounded-lg overflow-hidden">
              <img
                className="w-fit -translate-y-5 rounded-lg md:-translate-y-0"
                src={`${urlForImage}${dataDetails.profile_path}`}
                alt=""
              />
            </div>
          </div>
        ) : null}
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
          {dataDetails.known_for_department ? (
            <div>
              <p className="text-white">Known for</p>
              <p className="text-white font-light">
                {dataDetails.known_for_department}
              </p>
            </div>
          ) : null}
          {dataDetails.birthday ? (
            <div>
              <p className="text-white">Birthday:</p>
              <p className="text-white font-light">
                {dataDetails.birthday}
                {dataDetails.deathday ? null : ` (${yearsOld} years old)`}
              </p>
            </div>
          ) : null}
          {dataDetails.deathday ? (
            <div>
              <p className="text-white">Date of death:</p>
              <p className="text-white font-light">
                {dataDetails.deathday}
                {dataDetails.deathday ? ` (${yearsOld} years old)` : null}
              </p>
            </div>
          ) : null}
          {dataDetails.place_of_birth ? (
            <div>
              <p className="text-white">Place of birth:</p>
              <p className="text-white font-light">
                {dataDetails.place_of_birth}
              </p>
            </div>
          ) : null}
        </div>
      </header>
      <main className="w-full flex flex-col gap-5 md:gap-10">
        {dataDetails.biography ? (
          <div className="flex flex-col gap-2.5">
            <p className="text-white text-xl">Biography</p>
            <p
              className={
                fullBiography
                  ? 'text-white font-light'
                  : 'text-white font-light max-h-60 md:max-h-fit overflow-hidden'
              }
            >
              {dataDetails.biography}
            </p>
            <button
              onClick={() => {
                setFullBiography((prevState) => !prevState);
              }}
              className="text-white flex md:hidden justify-center gap-2.5 items-center border-t-2"
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
        ) : null}
        {movieCredits.length > 0 ? (
          <div className="flex flex-col w-full transition-all gap-2.5">
            <p className="text-xl text-white ">Movies</p>
            <div className="flex w-full overflow-x-scroll overflow-y-hidden md:overflow-x-visible md:grid md:gap-2.5 md:gap-y-5 md:justify-items-center  md:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
              {movieCredits.map((object) => (
                <Link key={object.id} to={`/movie/${object.id}`}>
                  <div className="flex flex-col justify-between w-44 h-[300px] border-2 flex-shrink-0 mr-3 rounded-lg">
                    {typeof object.poster_path === 'string' ? (
                      <img
                        className=" h-5/6 object-cover rounded-t-lg"
                        src={`${urlForImage}${object.poster_path}`}
                        alt=""
                      />
                    ) : (
                      <div className="flex h-5/6 flex-col justify-center gap-5 items-center w-full mb-2">
                        <p className="text-white text-center">
                          Sorry, no image for this movie
                        </p>
                        <FaRegSadCry className="text-white text-5xl" />
                      </div>
                    )}
                    <div className="w-full flex-grow flex justify-center items-center pt-1 pb-1">
                      <p className="text-white font-bold text-center line-clamp-2">
                        {object.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              {loadMoreMoviesBtn && (
                <div className="flex md:hidden justify-center items-center">
                  <BsFillArrowRightCircleFill
                    onClick={() => {
                      let maxNumber = maxMoviesVisible;
                      maxNumber += 10;
                      setType('movie_credits');
                      setMaxMoviesVisible(maxNumber);
                    }}
                    className="text-white text-5xl"
                  />
                </div>
              )}
            </div>
            {loadMoreMoviesBtn && (
              <div className="hidden md:flex justify-center items-center pt-5">
                <BsFillArrowDownCircleFill
                  onClick={() => {
                    let maxNumber = maxMoviesVisible;
                    maxNumber += 10;
                    setType('movie_credits');
                    setMaxMoviesVisible(maxNumber);
                  }}
                  className="text-white text-5xl hover:animate-bounce"
                />
              </div>
            )}
          </div>
        ) : null}
        {tvCredits.length > 0 ? (
          <div className="flex flex-col w-full transition-all gap-2.5">
            <p className="text-xl text-white ">TV Shows</p>
            <div className="flex w-full overflow-x-scroll overflow-y-hidden md:overflow-x-visible md:grid md:gap-2.5 md:gap-y-5 md:justify-items-center  md:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
              {tvCredits.map((object) => (
                <Link key={object.id} to={`/tv/${object.id}`}>
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
                    <div className="w-full flex-grow flex justify-center items-center pt-1 pb-1">
                      <p className="text-white font-bold text-center line-clamp-2">
                        {object.name}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              {loadMoreTVBtn && (
                <div className="flex md:hidden justify-center items-center">
                  <BsFillArrowRightCircleFill
                    onClick={() => {
                      let maxNumber = maxTVVisible;
                      maxNumber += 10;
                      setType('tv_credits');
                      setMaxTVVisible(maxNumber);
                    }}
                    className="text-white text-5xl"
                  />
                </div>
              )}
            </div>
            {loadMoreTVBtn && (
              <div className="hidden md:flex justify-center items-center pt-5">
                <BsFillArrowDownCircleFill
                  onClick={() => {
                    let maxNumber = maxTVVisible;
                    maxNumber += 10;
                    setType('tv_credits');
                    setMaxTVVisible(maxNumber);
                  }}
                  className="text-white text-5xl md:hover:animate-bounce"
                />
              </div>
            )}
          </div>
        ) : null}
        <div className="flex flex-col gap-2.5">
          <p className="text-white text-3xl">Timeline</p>
          <div className="flex overflow-x-scroll gap-5 md:overflow-visible">
            {movieTimeline.length > 0 ? (
              <div className="flex flex-col gap-2.5 flex-shrink-0 w-full sm:w-2/4 md:w-full  md:flex-shrink ">
                <p className="text-white">Movies</p>
                <div
                  className={
                    fullMovieTimeline
                      ? 'flex flex-col gap-1 border-2 border-slate-500 rounded-lg max-h-max sm:w-full '
                      : 'flex flex-col gap-1 border-2 border-slate-500 rounded-lg  h-60 overflow-hidden sm:w-full'
                  }
                >
                  {movieTimeline.map((object) => (
                    <Link key={object.id} to={`/movie/${object.id}`}>
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
            ) : null}
            {tvTimeline.length > 0 ? (
              <div className="flex flex-col gap-2.5 flex-shrink-0 w-full sm:w-2/4 md:w-full md:flex-shrink   ">
                <p className="text-white">TV Shows</p>
                <div
                  className={
                    fullTVTimeline
                      ? 'flex flex-col gap-1 border-2 border-slate-500 rounded-lg h-full sm:w-full'
                      : 'flex flex-col gap-1 border-2 border-slate-500 rounded-lg  h-60 overflow-hidden sm:w-full '
                  }
                >
                  {tvTimeline.map((object) => (
                    <Link key={object.id} to={`/tv/${object.id}`}>
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
            ) : null}
          </div>
        </div>
        {images.length > 0 ? (
          <>
            <p className="text-white text-3xl">Profile pics</p>
            <div className="flex h-[300px] overflow-x-scroll scrollbar scrollbar-track-slate-500 scrollbar-track-rounded-lg scrollbar-thumb-slate-300 scrollbar-thumb-rounded-lg">
              {images.map((object: { file_path?: string; id?: number }) => (
                <div
                  key={object.id}
                  className="w-44 h-full  flex-shrink-0 mr-3"
                >
                  <img
                    className="rounded-lg"
                    src={`${urlForImage}${object.file_path}`}
                  />
                </div>
              ))}
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default Actors;
