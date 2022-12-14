// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY;

function StarRequestPost(id, valueRate) {
  const value = {
    value: valueRate,
  };

  localStorage.setItem(id, `${valueRate}`);
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${API_KEY}&guest_session_id=${localStorage.getItem(
      "guest"
    )}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(value),
    }
  ).then((response) => response.json());
}

function GuestRequest() {
  return fetch(
    `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`
  )
    .then((response) => response.json())
    .then(
      (guestSession) =>
        !localStorage.getItem("guest") &&
        localStorage.setItem("guest", guestSession.guest_session_id)
    );
}

function StarRequestGet() {
  return fetch(
    `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guest"
    )}/rated/movies?api_key=${API_KEY}&language=en-US&sort_by=created_at.asc`
  ).then((response) => response.json());
}

function StarRequestGetNextPageRate(pageRate) {
  return fetch(
    `https://api.themoviedb.org/3/guest_session/${localStorage.getItem(
      "guest"
    )}/rated/movies?api_key=${API_KEY}&language=en-US&sort_by=created_at.asc&page=${pageRate}`
  ).then((response) => response.json());
}

export {
  GuestRequest,
  StarRequestPost,
  StarRequestGet,
  StarRequestGetNextPageRate,
};
