const API_KEY = import.meta.env.VITE_API_KEY;
const urlToApi = 'https://api.themoviedb.org/3';
const urlForImageFetch = 'https://image.tmdb.org/t/p/original';

export const getTrendingToday = async () => {
  const res = await fetch(`${urlToApi}/trending/all/day?api_key=${API_KEY}`);
  const data = await res.json();
  return data;
};

export const getTrendingWeekly = async () => {
  const res = await fetch(`${urlToApi}/trending/all/week?api_key=${API_KEY}`);
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
  setGenres: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const trendingMovies = await getTrendingToday();
  const featuredMovie = trendingMovies.results[0];
  const mostPopularMovieImage = urlForImageFetch + featuredMovie.poster_path;
  setFeaturedMovieImage(mostPopularMovieImage);
  setFeaturedMovieID(featuredMovie.id);
  const genresIds: Array<{ id: number; name: string }> = await getAllGenres();
  const featuredMovieGenresIds: number[] = featuredMovie.genre_ids;
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
  setTrendingMoviesToday: React.Dispatch<React.SetStateAction<Object[] | null>>,
  setTrendingMovies: React.Dispatch<React.SetStateAction<Object[] | null>>,
  setButtonToday: React.Dispatch<React.SetStateAction<boolean>>,
  setTrendingMoviesWeekly: React.Dispatch<React.SetStateAction<Object[] | null>>
) => {
  const trendingMoviesToday = await getTrendingToday();
  setTrendingMoviesToday(trendingMoviesToday.results);
  setTrendingMovies(trendingMoviesToday.results);
  setButtonToday(true);
  const trendingMoviesWeekly = await getTrendingWeekly();
  setTrendingMoviesWeekly(trendingMoviesWeekly.results);
};
export const loadTopRated = async (
  setTopRatedMovies: React.Dispatch<React.SetStateAction<Object[] | null>>
) => {
  const res = await fetch(`${urlToApi}/movie/top_rated?api_key=${API_KEY}`);
  const data = await res.json();
  setTopRatedMovies(data.results);
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
