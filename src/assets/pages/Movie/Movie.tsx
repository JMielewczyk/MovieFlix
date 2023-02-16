import { useEffect, useState } from 'react';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { BsDot, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getCredits, getDetails, getPosters, getVideos } from './features';
import { FaRegSadCry } from 'react-icons/fa';
import { IdataDetails } from './interfaces';

const Movie = () => {
  const [runtime, setRuntime] = useState<string>('');
  const [dataDetails, setDataDetails] = useState<IdataDetails>([]);
  const [fullRelease, setFullRelease] = useState<string>('');
  const [genres, setGenres] = useState<Object[]>([]);
  const [director, setDirector] = useState<Object[]>([]);
  const [cast, setCast] = useState<Object[]>([]);
  const [images, setImages] = useState<null | { file_path?: string }[]>(null);
  const [videos, setVideos] = useState<null | { key?: string }[]>(null);
  const [loadMoreCastBtn, setLoadMoreCastBtn] = useState(false);
  const [loadMorePostersBtn, setLoadMorePostersBtn] = useState(false);
  const [loadMoreVideosBtn, setLoadMoreVideosBtn] = useState(false);
  const [maxCastVisible, setMaxCastVisible] = useState<number>(10);
  const [maxPostersVisible, setMaxPostersVisible] = useState<number>(10);
  const [maxVideosVisible, setMaxVideosVisible] = useState<number>(5);
  const { movieid } = useParams();
  const { mediatype } = useParams();
  const urlForImage = 'https://image.tmdb.org/t/p/original';
  useEffect(() => {
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
  }, []);

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

  const windowWidth = window.innerWidth - 50;
  const windowHeight = windowWidth * (3 / 4);

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);

  return (
    <div className="flex flex-col w-screen min-h-screen overflow-hidden pl-5 pr-5 bg-black gap-7">
      <header className="w-full h-1/4 relative overflow-hidden rounded-lg ">
        <div className="absolute h-full w-48 from-black via-black bg-gradient-to-r"></div>
        <div className="absolute h-full flex justify-start items-center">
          {dataDetails.poster_path && (
            <img
              className="rounded-lg h-3/4"
              src={`${urlForImage}${dataDetails.poster_path}`}
              alt=""
            />
          )}
        </div>
        {dataDetails.backdrop_path && (
          <img
            className="ml-2.5 rounded-lg"
            src={`${urlForImage}${dataDetails.backdrop_path}`}
          ></img>
        )}
      </header>
      <main className="flex flex-col w-full gap-6">
        <div className="w-full  ">
          <h1 className="text-white text-center text-3xl">
            {dataDetails.original_name
              ? dataDetails.original_name
              : dataDetails.original_title}
            {` (${fullRelease})`}
          </h1>
        </div>
        <div className="flex gap-2.5">
          <div className="w-full">
            <p className="text-white">Community Score:</p>
            <p className="text-white">
              {dataDetails.vote_average && dataDetails.vote_average.toFixed(1)}
              /10
            </p>
          </div>
          <div className="w-full pl-10">
            <Link
              to={
                dataDetails.homepage !== undefined ? dataDetails.homepage : ' '
              }
            >
              <button className="text-xl bg-white w-full h-full rounded-lg flex justify-center items-center gap-2.5">
                Watch <AiOutlinePlayCircle className="text-xl" />
              </button>
            </Link>
          </div>
        </div>
        <p className="text-white">
          Votes: {dataDetails.vote_count && dataDetails.vote_count}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-1 border-2">
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
                  return <span className="text-white">{element.name}</span>;
                } else {
                  return <span className="text-white">{element.name}, </span>;
                }
              })}
          </div>
        </div>
        <p className="text-slate-400 italic">{dataDetails.tagline}</p>
        <p className="text-3xl text-white">Description</p>
        <p className="text-white">{dataDetails.overview}</p>
        {director &&
          director.map((object: { original_name?: string; job?: string }) => {
            return (
              <div>
                <p className="text-white font-bold">{object.original_name}</p>
                <p className="text-white font-light ">{object.job}</p>
              </div>
            );
          })}
        <p className="text-3xl text-white">Cast</p>
        <div className="flex w-full overflow-x-scroll">
          {cast &&
            cast.map(
              (object: {
                profile_path?: string | null;
                name?: string;
                character?: string;
                id?: string;
              }) => {
                return (
                  <Link to={`/actors/${object.id}`}>
                    <div className="flex flex-col min-h-full justify-between w-44 border-2 flex-shrink-0 mr-3 rounded-lg">
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
                );
              }
            )}
          {loadMoreCastBtn && (
            <div className="flex justify-center items-center">
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
        <div className="flex flex-col w-full">
          {videos !== null && videos.length > 0 ? (
            <>
              <p className="text-white text-3xl ">Videos</p>
              <div className="flex gap-5 w-full overflow-x-scroll transition-all">
                {videos.map((object) => (
                  <div className="flex justify-center items-center w-full flex-shrink-0">
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
        <div className="flex overflow-x-scroll">
          {images &&
            images.map((object) => (
              <div className="w-44 max-h-[250px] flex-shrink-0 pr-3 overflow-hidden">
                <img
                  className="rounded-lg object-fill"
                  src={`${urlForImage}${object.file_path}`}
                  alt=""
                />
              </div>
            ))}
          {loadMorePostersBtn && (
            <div className="flex justify-center items-center">
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
      </main>
    </div>
  );
};

export default Movie;
