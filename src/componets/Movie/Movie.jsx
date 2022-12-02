import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";
import { format } from "date-fns";
import { Space } from "antd";

export default function Movie({
  title,
  overview,
  poster_path: poster,
  release_date: date,
}) {
  return (
    <div className="card">
      <div className="card__image">
        {poster === null ? (
          <img
            alt="poster"
            src={`http://dummyimage.com/180x270/c0c0c0&text=${title}`}
          />
        ) : (
          <img
            alt="poster"
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            style={{ width: 180 }}
          />
        )}
      </div>
      <div className="card__description">
        <h2 className="card__title">{title}</h2>
        <span className="card__date">
          {date ? format(new Date(date), "PP") : "release date unknown"}
        </span>
        <Space>
          <span className="card__genre">Action</span>
          <span className="card__genre">Drama</span>
        </Space>
        <p className="card__overview">{overview}</p>
      </div>
    </div>
  );
}

// Movie.defaultProps = {
//   release_date: 'нет данных',
// }

Movie.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.node,
  release_date: PropTypes.string,
};
