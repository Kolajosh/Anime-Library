export const getAnimeUrl = (pageNumber) =>
  `/AniList/getanimes?PageNumber=${pageNumber}`;
export const getTrendingAnimeUrl = "/AniList/gettrendinganimes";
export const searchAnimeUrl = (param) =>
  `/AniList/searchanime?animeName=${param}`;
