const API_KEY = import.meta.env.VITE_API_KEY;
const urlToApi = 'https://api.themoviedb.org/3';
const urlForImage = 'https://image.tmdb.org/t/p/original';

export const getPosters = async (
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
    `${urlToApi}/movie/${movieid}/images?api_key=${API_KEY}`
  );
  const data = await res.json();
  if (data.posters.length >= maxPostersVisible) {
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
  if (data.results.length >= maxVideosVisible) {
    setLoadMoreVideosBtn(true);
  } else {
    setLoadMoreVideosBtn(false);
  }
  const videos: Array<Object> = data.results.filter(
    (object: Object, index: number) => index < maxVideosVisible
  );
  setVideos(videos);
};
