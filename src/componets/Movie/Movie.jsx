import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Movie.css";
import { format } from "date-fns";
import { Rate } from "antd";
import { Consumer } from "../Context/Context";
import { StarRequestPost } from "../../services/GuestRequest";

export default class Movie extends Component {
  state = {
    valueRate: null,
  };

  onChange = (event) => {
    // const { id } = this.props
    this.setState({ valueRate: event });
    // StarRequestPost(id, event)
  };

  componentDidUpdate() {
    const { id } = this.props;
    const { valueRate } = this.state;
    if (id && valueRate) {
      StarRequestPost(id, valueRate);
    }
    // const { rating } = this.props
    // this.setState({
    //   valueRate: rating
    // })
  }

  componentDidMount() {
    const { id } = this.props;
    // this.setState({
    //   valueRate: Number(localStorage.getItem(`${id}`))
    // })
    const { rating } = this.props;
    if (rating) {
      this.setState({
        valueRate: rating,
      });
    } else {
      this.setState({
        valueRate: Number(localStorage.getItem(`${id}`)),
      });
    }
  }

  render() {
    const {
      title,
      overview,
      poster_path: poster,
      release_date: date,
      vote_average: rate,
      genre_ids: genreItem,
    } = this.props;
    const { valueRate } = this.state;
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
          <div className="card__header">
            <h2 className="card__title">{title}</h2>
            <span
              className="card__rating"
              style={
                0 <= rate && rate < 3
                  ? { borderColor: "#E90000" }
                  : 3 < rate && rate < 5
                  ? { borderColor: "#E97E00" }
                  : 5 < rate && rate < 7
                  ? { borderColor: "#E9D100" }
                  : { borderColor: "#66E900" }
              }
            >
              {rate.toFixed(1)}
            </span>
          </div>
          <span className="card__date">
            {date ? format(new Date(date), "PP") : "release date unknown"}
          </span>
          <div className="card__genre-container">
            <Consumer>
              {(genres) => {
                if (genres.length) {
                  const res = genreItem.map((item) => {
                    const itemGenre = genres.find((el) => el.id === item);
                    return itemGenre.name;
                  });
                  let resGenre = res.map((genre, id) => {
                    return (
                      <span key={id} className="card__genre">
                        {genre}
                      </span>
                    );
                  });
                  return resGenre;
                }
              }}
            </Consumer>
          </div>
          <p className="card__overview">{overview}</p>
          <Rate
            style={{ marginTop: "auto", fontSize: 15 }}
            count={10}
            allowHalf
            onChange={this.onChange}
            value={valueRate}
          />
        </div>
      </div>
    );
  }
}

Movie.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.node,
  release_date: PropTypes.string,
  vote_average: PropTypes.number,
  genre_ids: PropTypes.array,
  rating: PropTypes.number,
};
