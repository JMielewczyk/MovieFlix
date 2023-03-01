//Hooks
import { useEffect, useState } from 'react';
//React Router
import { Link, useParams } from 'react-router-dom';
//React Icons
import { AiOutlinePlayCircle } from 'react-icons/ai';
import {
  BsDot,
  BsFillArrowDownCircleFill,
  BsFillArrowRightCircleFill,
} from 'react-icons/bs';
import { FaRegSadCry } from 'react-icons/fa';
//Utils
import {
  getCredits,
  getDetails,
  getPosters,
  getRecommended,
  getSimilar,
  getVideos,
} from './features';
//Interfaces
import { IdataDetails } from './interfaces';

const Movie = () => {
  const [runtime, setRuntime] = useState<string>('');
  const [dataDetails, setDataDetails] = useState<IdataDetails>([]);
  const [fullRelease, setFullRelease] = useState<string>('');
  const [genres, setGenres] = useState<Object[]>([]);
  const [director, setDirector] = useState<Object[]>([]);
  const [cast, setCast] = useState<Object[]>([]);
  const [images, setImages] = useState<null | { file_path?: string }[]>(null);
  const [videos, setVideos] = useState<null | { key?: string; id?: string }[]>(
    null
  );
  const [loadMoreCastBtn, setLoadMoreCastBtn] = useState(false);
  const [loadMorePostersBtn, setLoadMorePostersBtn] = useState(false);
  const [loadMoreVideosBtn, setLoadMoreVideosBtn] = useState(false);
  const [maxCastVisible, setMaxCastVisible] = useState<number>(10);
  const [maxPostersVisible, setMaxPostersVisible] = useState<number>(10);
  const [maxVideosVisible, setMaxVideosVisible] = useState<number>(5);
  const [similar, setSimilar] = useState<Object[]>([]);
  const [recommended, setRecommended] = useState<Object[]>([]);
  const { movieid } = useParams();
  const { mediatype } = useParams();
  const urlForImage = 'https://image.tmdb.org/t/p/original';
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    getDetails(
      mediatype,
      movieid,
      setDataDetails,
      setGenres,
      setRuntime,
      setFullRelease
    );
    getCredits(
      mediatype,
      movieid,
      setDirector,
      setCast,
      maxCastVisible,
      setLoadMoreCastBtn
    );
    getPosters(
      mediatype,
      movieid,
      maxPostersVisible,
      setLoadMorePostersBtn,
      setImages
    );
    getVideos(movieid, maxVideosVisible, setLoadMoreVideosBtn, setVideos);
    getSimilar(mediatype, movieid, setSimilar);
    getRecommended(mediatype, movieid, setRecommended);
  }, []);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    getDetails(
      mediatype,
      movieid,
      setDataDetails,
      setGenres,
      setRuntime,
      setFullRelease
    );
    getCredits(
      mediatype,
      movieid,
      setDirector,
      setCast,
      maxCastVisible,
      setLoadMoreCastBtn
    );
    getPosters(
      mediatype,
      movieid,
      maxPostersVisible,
      setLoadMorePostersBtn,
      setImages
    );
    getVideos(movieid, maxVideosVisible, setLoadMoreVideosBtn, setVideos);
    getSimilar(mediatype, movieid, setSimilar);
  }, [movieid]);

  useEffect(() => {
    getPosters(
      mediatype,
      movieid,
      maxPostersVisible,
      setLoadMorePostersBtn,
      setImages
    );
  }, [maxPostersVisible]);

  useEffect(() => {
    getVideos(movieid, maxVideosVisible, setLoadMoreVideosBtn, setVideos);
  }, [maxVideosVisible]);

  useEffect(() => {
    getCredits(
      mediatype,
      movieid,
      setDirector,
      setCast,
      maxCastVisible,
      setLoadMoreCastBtn
    );
  }, [maxCastVisible]);

  const windowWidth = window.innerWidth > 1536 ? 1536 : window.innerWidth - 50;
  const windowHeight = windowWidth / (16 / 9);
  return (
    <div className="flex flex-col w-full min-h-screen overflow-hidden pl-5 pr-5 bg-black gap-7">
      <header className="w-full h-full relative overflow-hidden rounded-lg max-h-[60vh] ">
        <div className="absolute h-full md:w-48 w-full bg-black md:bg-inherit md:from-black md:via-black bg-gradient-to-r"></div>
        <div className="absolute h-full w-full flex justify-center md:justify-start items-center">
          {dataDetails.poster_path && (
            <img
              className="rounded-lg h-full md:h-2/4 2xl:h-3/4"
              src={`${urlForImage}${dataDetails.poster_path}`}
              alt=""
            />
          )}
        </div>
        {dataDetails.backdrop_path && (
          <div className="flex justify-center max-h-[60vh]">
            <img
              className="ml-2.5 rounded-lg max-w-screen-lg"
              src={`${urlForImage}${dataDetails.backdrop_path}`}
            ></img>
          </div>
        )}
      </header>
      <main className="flex flex-col w-full gap-6 md:gap-10">
        <div className="w-full  ">
          <h1 className="text-white text-center text-3xl">
            {dataDetails.original_name
              ? dataDetails.original_name
              : dataDetails.original_title}
            {` (${fullRelease})`}
          </h1>
        </div>
        <div className="flex gap-2.5 md:flex-col">
          <div className="flex flex-col gap-1 w-full">
            <p className="text-white">Community Score:</p>
            <p className="text-white">
              {dataDetails.vote_average && dataDetails.vote_average.toFixed(1)}
              /10
            </p>
            <p className="text-white">
              Votes: {dataDetails.vote_count && dataDetails.vote_count}
            </p>
          </div>
          <div className="w-full pl-10 md:pl-0">
            <Link
              to={
                dataDetails.homepage !== undefined ? dataDetails.homepage : ' '
              }
            >
              <button className="text-xl bg-white w-full md:pl-5 md:pr-5 pt-2.5 pb-2.5 md:w-fit   rounded-lg flex justify-center items-center gap-2.5">
                Watch <AiOutlinePlayCircle className="text-xl" />
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap md:w-fit items-center justify-center gap-1 border-2">
          <span className="text-white">
            {dataDetails.first_air_date
              ? dataDetails.first_air_date
              : dataDetails.release_date}
          </span>
          {runtime === '' ? null : <BsDot className="text-white" />}
          <span className="text-white">{runtime}</span>
          <div className="w-full text-center">
            {genres &&
              genres.map((element: { name?: string }, index: number) => {
                if (index === genres.length - 1) {
                  return (
                    <span key={element.name} className="text-white">
                      {element.name}
                    </span>
                  );
                } else {
                  return (
                    <span key={element.name} className="text-white">
                      {element.name},{' '}
                    </span>
                  );
                }
              })}
          </div>
        </div>
        <p className="text-slate-400 italic">{dataDetails.tagline}</p>
        <div className="flex flex-col gap-2.5">
          <p className="text-3xl text-white">Description</p>
          <p className="text-white">{dataDetails.overview}</p>
        </div>
        {director &&
          director.map(
            (object: { original_name?: string; job?: string; id?: number }) => (
              <div key={object.id}>
                <p className="text-white font-bold">{object.original_name}</p>
                <p className="text-white font-light ">{object.job}</p>
              </div>
            )
          )}
        <p className="text-3xl text-white">Cast</p>
        <div className="flex w-full overflow-x-scroll md:overflow-visible md:grid md:gap-2.5 md:gap-y-5 md:justify-items-center  md:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
          {cast &&
            cast.map(
              (object: {
                profile_path?: string | null;
                name?: string;
                character?: string;
                id?: number;
              }) => (
                <Link
                  key={object.id}
                  className="flex justify-center w-fit"
                  to={`/person/${object.id}`}
                >
                  <div className="flex flex-col min-h-full justify-between w-44 border-2 flex-shrink-0 mr-3 md:mr-0 rounded-lg">
                    {typeof object.profile_path === 'string' ? (
                      <img
                        className="object-cover rounded-t-lg"
                        src={`${urlForImage}${object.profile_path}`}
                        alt=""
                      />
                    ) : (
                      <div className="flex flex-col flex-grow justify-center gap-5 items-center w-full pt-20 mb-10">
                        <p className="text-white text-center">
                          Sorry, no image for this person
                        </p>
                        <FaRegSadCry className="text-white text-5xl" />
                      </div>
                    )}
                    <div className="w-full flex flex-grow flex-col justify-center items-center">
                      <p className="text-white font-bold text-center">
                        {object.name}
                      </p>
                      <p className="text-white font-light text-center">
                        {object.character}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            )}
          {loadMoreCastBtn && (
            <div className="flex md:hidden justify-center items-center md:rotate-90 md:pt-10">
              <BsFillArrowRightCircleFill
                onClick={() => {
                  let maxNumber = maxCastVisible;
                  maxNumber += 10;
                  setMaxCastVisible(maxNumber);
                }}
                className="text-white text-5xl"
              />
            </div>
          )}
        </div>
        {loadMoreCastBtn && (
          <div className="hidden md:flex w-full justify-center items-center md:w-full">
            <BsFillArrowDownCircleFill
              onClick={() => {
                let maxNumber = maxCastVisible;
                maxNumber += 10;
                setMaxCastVisible(maxNumber);
              }}
              className="text-white text-5xl md:hover:animate-bounce"
            />
          </div>
        )}
        <div className="flex flex-col w-full  gap-2.5">
          {videos !== null && videos.length > 0 ? (
            <>
              <p className="text-white text-3xl ">Videos</p>
              <div className="flex gap-5 w-full overflow-x-scroll transition-all scrollbar scrollbar-track-slate-500 scrollbar-track-rounded-lg scrollbar-thumb-slate-300 scrollbar-thumb-rounded-lg">
                {videos.map((object) => (
                  <div
                    key={object.id}
                    className="flex justify-center items-center w-full flex-shrink-0"
                  >
                    <iframe
                      className="w-full"
                      width={`${windowWidth}`}
                      height={`${windowHeight}`}
                      src={`https://www.youtube.com/embed/${object.key}`}
                    ></iframe>
                  </div>
                ))}
                {loadMoreVideosBtn && (
                  <div className="flex justify-center items-center">
                    <BsFillArrowRightCircleFill
                      onClick={() => {
                        let maxNumber = maxVideosVisible;
                        maxNumber += 5;
                        setMaxVideosVisible(maxNumber);
                      }}
                      className="text-white text-5xl"
                    />
                  </div>
                )}
              </div>
            </>
          ) : null}
        </div>
        <p className="text-white text-3xl ">Posters</p>
        <div className="flex w-full overflow-x-scroll md:overflow-visible md:grid md:gap-2.5 md:gap-y-5 md:justify-items-center  md:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
          {images &&
            images.map((object) => (
              <div
                key={object.file_path}
                className="w-44 max-h-[250px] flex-shrink-0 pr-3 overflow-hidden"
              >
                <img
                  className="rounded-lg object-fill"
                  src={`${urlForImage}${object.file_path}`}
                  alt=""
                />
              </div>
            ))}
          {loadMorePostersBtn && (
            <div className="md:hidden flex justify-center items-center">
              <BsFillArrowRightCircleFill
                onClick={() => {
                  let maxNumber = maxPostersVisible;
                  maxNumber += 10;
                  setMaxPostersVisible(maxNumber);
                }}
                className="text-white text-5xl"
              />
            </div>
          )}
        </div>
        {loadMorePostersBtn && (
          <div className="hidden md:flex  justify-center items-center">
            <BsFillArrowDownCircleFill
              onClick={() => {
                let maxNumber = maxPostersVisible;
                maxNumber += 10;
                setMaxPostersVisible(maxNumber);
              }}
              className="text-white text-5xl md:hover:animate-bounce "
            />
          </div>
        )}
        {similar.length > 0 ? (
          <>
            <p className="text-white text-3xl ">Similar</p>
            <div className="flex w-full overflow-x-scroll md:overflow-visible md:grid md:gap-2.5 md:gap-y-5 md:justify-items-center  md:grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
              {similar.map(
                (object: {
                  id?: number;
                  poster_path?: string;
                  original_title?: string;
                  name?: string;
                }) => (
                  <Link key={object.id} to={`/${mediatype}/${object.id}`}>
                    <div className="w-44 h-[300px] flex-shrink-0 pr-3 overflow-hidden">
                      {object.poster_path ? (
                        <img
                          className="h-5/6 rounded-lg object-fill"
                          src={`${urlForImage}${object.poster_path}`}
                          alt=""
                        />
                      ) : (
                        <div className="flex flex-col justify-center gap-5 items-center border rounded-lg w-full h-5/6">
                          <p className="text-white text-center">
                            Sorry, no image for this
                            {mediatype === 'movie' ? ' movie' : ' tv show'}
                          </p>
                          <FaRegSadCry className="text-white text-5xl" />
                        </div>
                      )}

                      <p className="text-white h-1/6 text-center line-clamp-2">
                        {object.original_title
                          ? object.original_title
                          : object.name}
                      </p>
                    </div>
                  </Link>
                )
              )}
            </div>
          </>
        ) : null}
        {recommended.length > 0 ? (
          <>
            <p className="text-white text-3xl ">Recommended</p>
            <div className="flex overflow-x-scroll scrollbar scrollbar-track-slate-500 scrollbar-track-rounded-lg scrollbar-thumb-slate-300 scrollbar-thumb-rounded-lg">
              {recommended.map(
                (object: {
                  id?: number;
                  poster_path?: string;
                  original_title?: string;
                  name?: string;
                }) => (
                  <Link key={object.id} to={`/${mediatype}/${object.id}`}>
                    <div className="w-44 h-[300px] flex-shrink-0 pr-3 overflow-hidden">
                      {object.poster_path ? (
                        <img
                          className="h-5/6 rounded-lg object-fill"
                          src={`${urlForImage}${object.poster_path}`}
                          alt=""
                        />
                      ) : (
                        <div className="flex flex-col justify-center gap-5 items-center border rounded-lg w-full h-5/6">
                          <p className="text-white text-center">
                            Sorry, no image for this
                            {mediatype === 'movie' ? ' movie' : ' tv show'}
                          </p>
                          <FaRegSadCry className="text-white text-5xl" />
                        </div>
                      )}

                      <p className="text-white h-1/6 text-center line-clamp-2">
                        {object.original_title
                          ? object.original_title
                          : object.name}
                      </p>
                    </div>
                  </Link>
                )
              )}
            </div>
          </>
        ) : null}
      </main>
    </div>
  );
};

export default Movie;
