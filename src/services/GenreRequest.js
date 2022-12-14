export default function GenreRequest() {
  // eslint-disable-next-line no-undef
  const API_KEY = process.env.REACT_APP_API_KEY;
  return fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
  )
    .then((res) => {
      if (res.ok) {
        return res;
      } else {
        let error = new Error(res.statusText);
        error.response = res;
        throw error;
      }
    })
    .then((res) => res.json());
}
