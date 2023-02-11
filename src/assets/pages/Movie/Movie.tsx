import { useEffect, useState } from 'react';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { BsDot, BsFillArrowRightCircleFill } from 'react-icons/bs';
import { Link, useParams } from 'react-router-dom';
import { getPosters, getVideos } from '../../utils/MovieFunctions';
import { FaRegSadCry } from 'react-icons/fa';

const Movie = () => {
  const [title, setTitle] = useState<string>('');
  const [releaseYear, setReleaseYear] = useState<string>('');
  const [fullRelease, setFullRelease] = useState<string>('');
  const [voteAverage, setVoteAverage] = useState<number>(0);
  const [movieHomepage, setMovieHomepage] = useState<string>('');
  const [runtime, setRuntime] = useState<string>('');
  const [genres, setGenres] = useState<Object[]>([]);
  const [tagline, setTagline] = useState<string>('');
  const [overview, setOverview] = useState<string>('');
  const [director, setDirector] = useState<Object[]>([]);
  const [cast, setCast] = useState<Object[]>([]);
  const [images, setImages] = useState<null | { file_path?: string }[]>(null);
  const [headerImage, setHeaderImage] = useState<string>('');
  const [posterHeader, setPosterHeader] = useState<string>('');
  const [videos, setVideos] = useState<null | { key?: string }[]>(null);
  const [loadMorePostersBtn, setLoadMorePostersBtn] = useState(false);
  const [loadMoreVideosBtn, setLoadMoreVideosBtn] = useState(false);
  const { movieid } = useParams();
  const urlForImage = 'https://image.tmdb.org/t/p/original';
  const [maxPostersVisible, setMaxPostersVisible] = useState<number>(20);
  const [maxVideosVisible, setMaxVideosVisible] = useState<number>(5);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const urlToApi = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const getDetails = async () => {
      const res = await fetch(
        `${urlToApi}/movie/${movieid}?api_key=${API_KEY}`
      );
      const data = await res.json();
      setHeaderImage(`${urlForImage}${data.backdrop_path}`);
      setPosterHeader(`${urlForImage}${data.poster_path}`);
      console.log(data);
      setTitle(data.title);
      const date = new Date(data.release_date);
      const year = date.getFullYear().toString();
      setReleaseYear(year);
      setFullRelease(data.release_date);
      const runtime = data.runtime;
      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;
      const hoursAndMinutes = `${hours}h ${minutes}m`;
      setRuntime(hoursAndMinutes);
      setVoteAverage(data.vote_average.toFixed(1));
      setMovieHomepage(data.homepage);
      setGenres(data.genres);
      setTagline(data.tagline);
      setOverview(data.overview);
      const creditsRes = await fetch(
        `${urlToApi}/movie/${movieid}/credits?api_key=${API_KEY}`
      );
      const creditsData = await creditsRes.json();
      const director = creditsData.crew.filter(
        (object: { job?: string }) => object.job === 'Director'
      );
      setDirector(director);
      setCast(creditsData.cast);
    };
    getDetails();
    getPosters(movieid, maxPostersVisible, setLoadMorePostersBtn, setImages);
    getVideos(movieid, maxVideosVisible, setLoadMoreVideosBtn, setVideos);
  }, []);

  useEffect(() => {
    getPosters(movieid, maxPostersVisible, setLoadMorePostersBtn, setImages);
  }, [maxPostersVisible]);

  useEffect(() => {
    getVideos(movieid, maxVideosVisible, setLoadMoreVideosBtn, setVideos);
  }, [maxVideosVisible]);

  const windowWidth = window.innerWidth - 50;
  const windowHeight = windowWidth * (3 / 4);
  console.log(cast);
  return (
    <div className="flex flex-col w-screen min-h-screen overflow-hidden pl-5 pr-5 bg-black gap-7">
      <header className="w-full h-1/4 relative overflow-hidden rounded-lg ">
        <div className="absolute h-full w-48 from-black via-black bg-gradient-to-r"></div>
        <div className="absolute h-full flex justify-start items-center">
          {posterHeader && (
            <img className="rounded-lg h-3/4" src={posterHeader} alt="" />
          )}
        </div>
        {headerImage && (
          <img className="ml-2.5 rounded-lg" src={headerImage}></img>
        )}
      </header>
      <main className="flex flex-col w-full gap-6">
        <div className="w-full  ">
          <h1 className="text-white text-center text-3xl">{`${title} (${releaseYear})`}</h1>
        </div>
        <div className="flex gap-2.5">
          <div className="w-full">
            <p className="text-white">Community Score: {voteAverage}/10</p>
          </div>
          <div className="w-full pl-10">
            <Link to={movieHomepage}>
              <button className="text-xl bg-white w-full h-full rounded-lg flex justify-center items-center gap-2.5">
                Watch <AiOutlinePlayCircle className="text-xl" />
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-1 border-2">
          <span className="text-white">{fullRelease}</span>
          <BsDot className="text-white" />
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
        <p className="text-slate-400 italic">{tagline}</p>
        <p className="text-3xl text-white">Description</p>
        <p className="text-white">{overview}</p>
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
              }) => {
                return (
                  <div className="flex flex-col justify-between w-44 border-2  flex-shrink-0 mr-3 rounded-lg">
                    {typeof object.profile_path === 'string' ? (
                      <img
                        className="object-cover"
                        src={`${urlForImage}${object.profile_path}`}
                        alt=""
                      />
                    ) : (
                      <div className="flex flex-col justify-center gap-5 items-center w-full h-3/4 mb-2">
                        <p className="text-white text-center">
                          Sorry, no image for this person
                        </p>
                        <FaRegSadCry className="text-white text-5xl" />
                      </div>
                    )}
                    <div className="w-full flex flex-grow flex-col justify-center items-center">
                      <p className="text-white font-bold">{object.name}</p>
                      <p className="text-white font-light">
                        {object.character}
                      </p>
                    </div>
                  </div>
                );
              }
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
                  maxNumber += 20;
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
