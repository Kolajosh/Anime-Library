export const addToWatchListUrl = "/User/addtowatchlist";
export const addToWatchedListUrl = "/User/addnewtoalreadywatched";
export const addToCurrentlyWatchingListUrl = "/User/addnewtocurrentlywatching";
export const getUserListUrl = (userId) =>
  `/User/getuseranimelist?UserId=${userId}`;
export const moveWatchingtoWatchedUrl = "/User/movetowatchedfromwatching";
export const moveWatchedtoBookmarkUrl = "/User/movetowatchlistfromwatched";
export const moveWatchedtoWatching = "/User/movetowatchingfromwatched";
export const moveBookmarktoWatched = "/User/movetowatchedfromwatchlist";
export const moveBookmarktoWatching = "/User/movetowatchingfromwatchlist";
export const moveWatchingtoBookmark = "/User/movetowatchlistfromwatching";
export const deleteFromBookmarks = "/User/deletefromwatchlist";
export const deleteFromWatched = "/User/deletefromalreadywatched";
export const deleteFromWatching = "/User/deletefromcurrentlywatching";
