import React, { Component } from "react";
import { Pagination } from "antd";
import "antd/dist/reset.css";
import "./App.css";
import Movies from "../Movies/Movies";
import Search from "../Search/Search";
import Preloader from "../Preloader/Preloader";
import Tab from "../Tab/Tab";
import { Offline, Online } from "react-detect-offline";

// eslint-disable-next-line no-undef
const API_KEY = process.env.REACT_APP_API_KEY;

export default class App extends Component {
  state = {
    movies: [],
    loading: true,
  };

  onSearch = (text) => {
    if (text) {
      this.setState({ loading: true });
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${text}`
      )
        .then((response) => response.json())
        .then((data) => this.setState({ movies: data.results, loading: false }))
        .catch((err) => {
          console.error(err);
          this.setState({ loading: false });
        });
    }
  };

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=return`
    )
      // .then((response) => response.json())
      .then((res) => {
        if (res.ok) {
          return res;
        } else {
          let error = new Error(res.statusText);
          error.response = res;
          throw error;
        }
      })
      .then((res) => res.json())
      .then((data) => this.setState({ movies: data.results, loading: false }))
      .catch((err) => {
        console.error(err);
        console.log(err.response);
        this.setState({ loading: false });
      });
  }

  render() {
    const { movies, loading } = this.state;
    return (
      <div className="wrapper">
        <Online>
          <Tab></Tab>
          <Search search={this.onSearch} />
          {loading ? <Preloader /> : <Movies movies={movies}></Movies>}
          <div className="pagination">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </Online>
        <Offline>
          <span className="offline">
            Здесь могла бы быть ваша реклама, но интернета нет :(
          </span>
        </Offline>
      </div>
    );
  }
}
