export interface IdataDetails {
  profile_path?: string;
  name?: string;
  biography?: string;
  birthday?: string;
  place_of_birth?: string;
  known_for_department?: string;
  deathday?: string;
}
export interface IdataDetails extends Array<IdataDetails> {}

export interface Iexternal {
  facebook_id?: string | null;
  instagram_id?: string | null;
  twitter_id?: string | null;
}

export interface ICredits {
  id?: number;
  title?: string;
  poster_path?: string;
  character?: string;
  release_date?: string;
  first_air_date?: string;
  original_name?: string;
  name?: string;
}

export interface ICredits extends Array<ICredits> {}
