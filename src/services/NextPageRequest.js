export default function NextPageRequest(query, page) {
  // eslint-disable-next-line no-undef
  const API_KEY = process.env.REACT_APP_API_KEY;
  return fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`
  ).then((response) => response.json());
}
