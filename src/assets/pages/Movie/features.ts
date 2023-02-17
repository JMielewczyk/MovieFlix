import { IdataDetails } from './interfaces';

const API_KEY = import.meta.env.VITE_API_KEY;
const urlToApi = 'https://api.themoviedb.org/3';

export const getPosters = async (
  mediatype: string | undefined,
  movieid: string | undefined,
  maxPostersVisible: number,
  setLoadMorePostersBtn: React.Dispatch<React.SetStateAction<boolean>>,
  setImages: React.Dispatch<
    React.SetStateAction<
      | {
          file_path?: string | undefined;
        }[]
      | null
    >
  >
) => {
  const res = await fetch(
    `${urlToApi}/${mediatype}/${movieid}/images?api_key=${API_KEY}`
  );
  const data = await res.json();
  if (data.posters.length > maxPostersVisible) {
    setLoadMorePostersBtn(true);
  } else {
    setLoadMorePostersBtn(false);
  }
  const images = data.posters.filter(
    (object: Object, index: number) => index < maxPostersVisible
  );
  setImages(images);
};

export const getVideos = async (
  movieid: string | undefined,
  maxVideosVisible: number,
  setLoadMoreVideosBtn: React.Dispatch<React.SetStateAction<boolean>>,
  setVideos: React.Dispatch<
    React.SetStateAction<
      | {
          key?: string | undefined;
        }[]
      | null
    >
  >
) => {
  const res = await fetch(
    `${urlToApi}/movie/${movieid}/videos?api_key=${API_KEY}`
  );
  const data = await res.json();
  if (data.results.length > maxVideosVisible) {
    setLoadMoreVideosBtn(true);
  } else {
    setLoadMoreVideosBtn(false);
  }
  const videos: Array<Object> = data.results.filter(
    (object: Object, index: number) => index < maxVideosVisible
  );
  setVideos(videos);
};

export const getDetails = async (
  mediatype: string | undefined,
  movieid: string | undefined,
  setDataDetails: React.Dispatch<React.SetStateAction<IdataDetails>>,
  setGenres: React.Dispatch<React.SetStateAction<Object[]>>,
  setRuntime: React.Dispatch<React.SetStateAction<string>>,
  setFullRelease: React.Dispatch<React.SetStateAction<string>>
) => {
  const res = await fetch(
    `${urlToApi}/${mediatype}/${movieid}?api_key=${API_KEY}`
  );
  const dataDetails = await res.json();
  setDataDetails(dataDetails);
  setGenres(dataDetails.genres);
  if (mediatype === 'tv') {
    const runtime = dataDetails.episode_run_time;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const hoursAndMinutes = `${hours < 1 ? ' ' : hours + 'h'} ${minutes}m`;
    if (isNaN(hours) || isNaN(minutes)) return;
    setRuntime(`Episode time: ${hoursAndMinutes}`);
    const fullRelease = new Date(dataDetails.first_air_date)
      .getFullYear()
      .toString();
    setFullRelease(fullRelease);
  } else if (mediatype === 'movie') {
    const runtime = dataDetails.runtime;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const hoursAndMinutes = `${hours < 1 ? ' ' : hours + 'h'} ${minutes}m`;
    setRuntime(hoursAndMinutes);
    const fullRelease = new Date(dataDetails.release_date)
      .getFullYear()
      .toString();
    setFullRelease(fullRelease);
  }
};

export const getCredits = async (
  mediatype: string | undefined,
  movieid: string | undefined,
  setDirector: React.Dispatch<React.SetStateAction<Object[]>>,
  setCast: React.Dispatch<React.SetStateAction<Object[]>>,
  maxCastVisible: number,
  setLoadMoreCastBtn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log('working');
  const creditsRes = await fetch(
    `${urlToApi}/${mediatype}/${movieid}/credits?api_key=${API_KEY}`
  );
  const creditsData = await creditsRes.json();
  const director = creditsData.crew.filter(
    (object: { job?: string }) => object.job === 'Director'
  );
  setDirector(director);
  if (creditsData.cast.length > maxCastVisible) {
    setLoadMoreCastBtn(true);
  } else {
    setLoadMoreCastBtn(false);
  }
  const cast: Array<Object> = creditsData.cast.filter(
    (object: Object, index: number) => index < maxCastVisible
  );
  setCast(cast);
};
