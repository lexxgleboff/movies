import React from "react";
import PropTypes from "prop-types";
import Movie from "../Movie/Movie";
// import { Row, Col } from 'antd';
import "./Movies.css";

// eslint-disable-next-line react/prop-types
export default function Movies({ movies }) {
  // eslint-disable-next-line react/prop-types
  const elements = movies.map((item) => {
    const { id, ...itemProps } = item;
    return <Movie key={id} {...itemProps}></Movie>;
  });
  return <div className="container">{elements}</div>;
}

Movies.propType = {
  movies: PropTypes.array,
};
