import { ICredits, IdataDetails, Iexternal } from './interfaces';
const API_KEY = import.meta.env.VITE_API_KEY;
const urlToApi = 'https://api.themoviedb.org/3';

export const getDetails = async (
  actorid: string | undefined,
  setDataDetails: React.Dispatch<React.SetStateAction<IdataDetails>>,
  setYearsOld: React.Dispatch<React.SetStateAction<number>>
) => {
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
};

export const loadMoviesAndTV = async (
  type: string,
  actorid: string | undefined,
  setMovieCredits: React.Dispatch<React.SetStateAction<ICredits>>,
  setMovieTimeline: React.Dispatch<React.SetStateAction<ICredits>>,
  setTVCredits: React.Dispatch<React.SetStateAction<ICredits>>,
  setTVTimeline: React.Dispatch<React.SetStateAction<ICredits>>,
  maxMoviesVisible: number,
  maxTVVisible: number,
  setLoadMoreMoviesBtn: React.Dispatch<React.SetStateAction<boolean>>,
  setLoadMoreTVBtn: React.Dispatch<React.SetStateAction<boolean>>
) => {
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
          (new Date(b.release_date) as any) - (new Date(a.release_date) as any)
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
        object.first_air_date = new Date(object.first_air_date).getFullYear();
        return object;
      }
    }
  );
  if (type === 'movie_credits') {
    if (popularOnlyReleased.length > maxMoviesVisible) {
      setLoadMoreMoviesBtn(true);
    } else {
      setLoadMoreMoviesBtn(false);
    }
    const movies = popularOnlyReleased.filter(
      (object: Object, index: number) => index < maxMoviesVisible
    );
    setMovieCredits(movies);
    setMovieTimeline(onlyYear);
  } else if (type === 'tv_credits') {
    if (popularOnlyReleased.length > maxTVVisible) {
      setLoadMoreTVBtn(true);
    } else {
      setLoadMoreTVBtn(false);
    }
    const TV = popularOnlyReleased.filter(
      (object: Object, index: number) => index < maxTVVisible
    );
    setTVCredits(TV);
    setTVTimeline(onlyYear);
  }
};

export const getExternal = async (
  actorid: string | undefined,
  setExternal: React.Dispatch<React.SetStateAction<Iexternal>>
) => {
  const resExternal = await fetch(
    `${urlToApi}/person/${actorid}/external_ids?api_key=${API_KEY}`
  );
  const dataExternal = await resExternal.json();
  setExternal(dataExternal);
};
