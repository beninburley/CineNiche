export interface Movie {
  show_id: string;
  type: string;
  title: string;
  director: string;
  cast: string;
  country: string;
  release_year: number;
  rating: string;
  duration: string;
  description: string;

  action: boolean;
  adventure: boolean;
  animeSeriesInternationalTVShows: boolean;
  britishDocuseriesInternationalTVShows: boolean;
  children: boolean;
  comedies: boolean;
  comediesDramasInternationalMovies: boolean;
  comediesInternationalMovies: boolean;
  comediesRomanticMovies: boolean;
  crimeTVShowsDocuseries: boolean;
  documentaries: boolean;
  documentariesInternationalMovies: boolean;
  docuseries: boolean;
  dramas: boolean;
  dramasInternationalMovies: boolean;
  dramasRomanticMovies: boolean;
  familyMovies: boolean;
  fantasy: boolean;
  horrorMovies: boolean;
  internationalMoviesThrillers: boolean;
  internationalTVRomanticDramas: boolean;
  kidsTV: boolean;
  languageTVShows: boolean;
  musicals: boolean;
  natureTV: boolean;
  realityTV: boolean;
  spirituality: boolean;
  tvAction: boolean;
  tvComedies: boolean;
  tvDramas: boolean;
  talkShowsTVComedies: boolean;
  thrillers: boolean;

  categories: string[];
  categoriesString: string;
}
