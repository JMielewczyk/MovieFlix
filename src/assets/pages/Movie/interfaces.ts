export interface IdataDetails {
  poster_path?: string;
  backdrop_path?: string;
  homepage?: string;
  original_title?: string;
  original_name?: string;
  runtime?: number;
  release_date?: string;
  first_air_date?: string;
  tagline?: string;
  vote_average?: number;
  vote_count?: number;
  overview?: string;
}
export interface IdataDetails extends Array<IdataDetails> {}
