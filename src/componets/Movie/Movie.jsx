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
        <img
          alt="poster"
          src={`https://image.tmdb.org/t/p/w500${poster}`}
          style={{ width: 180 }}
        />
      </div>
      <div className="card__description">
        <h2 className="card__title">{title}</h2>
        <span className="card__date">{format(new Date(date), "PP")}</span>
        <Space>
          <span className="card__genre">Action</span>
          <span className="card__genre">Drama</span>
        </Space>
        <p className="card__overview">{overview}</p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.node,
  release_date: PropTypes.string,
};
