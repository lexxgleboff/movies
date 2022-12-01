import React, { Component } from "react";
import { Pagination } from "antd";
import "antd/dist/reset.css";
import "./App.css";
import Movies from "../Movies/Movies";
import Search from "../Search/Search";
import Preloader from "../Preloader/Preloader";
import Tab from "../Tab/Tab";

// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY;

export default class App extends Component {
  state = {
    movies: [],
    loading: true,
  };

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=return`
    )
      .then((response) => response.json())
      .then((data) => this.setState({ movies: data.results }));
  }

  render() {
    const { movies } = this.state;
    return (
      <div className="wrapper">
        <Tab></Tab>
        <Search />
        {movies.length ? <Movies movies={movies}></Movies> : <Preloader />}
        <div className="pagination">
          <Pagination defaultCurrent={1} total={50} />
        </div>
      </div>
    );
  }
}
