const API_KEY = import.meta.env.VITE_API_KEY;
const urlToApi = 'https://api.themoviedb.org/3';
const urlForImageFetch = 'https://image.tmdb.org/t/p/original';

export const getTrending = async (mediaType: string, time: string) => {
  const res = await fetch(
    `${urlToApi}/trending/${mediaType}/${time}?api_key=${API_KEY}`
  );
  const data = await res.json();
  return data;
};

export const getAllGenres = async () => {
  const res = await fetch(`${urlToApi}/genre/movie/list?api_key=${API_KEY}`);
  const data = await res.json();
  return data.genres;
};

export const loadFeatured = async (
  setFeaturedMovieImage: React.Dispatch<React.SetStateAction<string>>,
  setFeaturedMovieID: React.Dispatch<React.SetStateAction<string>>,
  setGenres: React.Dispatch<React.SetStateAction<string[]>>,
  mediaType: string,
  timeWindow: string
) => {
  if (mediaType !== 'movie' && mediaType !== 'tv') return;
  const trending = await getTrending(mediaType, timeWindow);
  const featured = trending.results[0];
  const poster = urlForImageFetch + featured.poster_path;
  setFeaturedMovieImage(poster);
  setFeaturedMovieID(featured.id);
  const genresIds: Array<{ id: number; name: string }> = await getAllGenres();
  const featuredMovieGenresIds: number[] = featured.genre_ids;
  let featuredMovieGenresNames: string[] = [];
  for (const object of genresIds) {
    if (featuredMovieGenresNames.length < 3) {
      featuredMovieGenresIds.forEach((id) => {
        if (id === object.id) {
          featuredMovieGenresNames = [...featuredMovieGenresNames, object.name];
        }
      });
    }
  }
  setGenres(featuredMovieGenresNames);
};

export const loadTrending = async (
  setTrending: React.Dispatch<React.SetStateAction<Object[] | null>>,
  mediaType: string,
  timeWindow: string
) => {
  const trending = await getTrending(mediaType, timeWindow);
  //Change property name to match the same name for each type(movie, tv, person)
  for (let object in trending.results) {
    if (!trending.results[object].hasOwnProperty('poster_path')) {
      trending.results[object].poster_path =
        trending.results[object].profile_path;
      delete trending.results[object].profile_path;
    }
  }
  setTrending(trending.results);
};
export const loadTopRated = async (
  setTopRated: React.Dispatch<React.SetStateAction<Object[] | null>>,
  mediaType: string
) => {
  const res = await fetch(
    `${urlToApi}/${mediaType}/top_rated?api_key=${API_KEY}`
  );
  const data = await res.json();
  setTopRated(data.results);
};
export const loadPopularActors = async (
  setActors: React.Dispatch<React.SetStateAction<Object[] | null>>
) => {
  const res = await fetch(`${urlToApi}/person/popular?api_key=${API_KEY}`);
  const data = await res.json();
  const actors = data.results.filter(
    (object: { known_for_department?: string }) =>
      object.known_for_department === 'Acting'
  );
  setActors(actors);
};
