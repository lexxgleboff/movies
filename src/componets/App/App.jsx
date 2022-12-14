import React, { Component } from "react";
import { Pagination, Alert, Tabs } from "antd";
import "antd/dist/reset.css";
import "./App.css";
import Movies from "../Movies/Movies";
import Search from "../Search/Search";
import Preloader from "../Preloader/Preloader";
import { Offline, Online } from "react-detect-offline";
import { Provider } from "../Context/Context";
import ApiRequest from "../../services/ApiRequest";
import GenreRequest from "../../services/GenreRequest";
import NextPageRequest from "../../services/NextPageRequest";
import {
  GuestRequest,
  StarRequestGet,
  StarRequestGetNextPageRate,
} from "../../services/GuestRequest";

export default class App extends Component {
  state = {
    movies: [],
    loading: true,
    currentPage: 1,
    totalPage: null,
    query: "mortal",
    genres: [],
    moviesRate: [],
    totalPageRate: null,
    currentPageRate: 1,
  };

  onSearch = (text) => {
    if (text) {
      this.setState({ loading: true, query: text });
      ApiRequest(text)
        .then((data) =>
          this.setState({
            movies: [...data.results],
            loading: false,
            totalPage: data.total_pages,
            currentPage: data.page,
          })
        )
        .catch((err) => {
          console.error(err);
          console.log(err.response);
          this.setState({ loading: false });
        });
    }
  };

  componentDidMount() {
    localStorage.clear();
    GuestRequest();

    ApiRequest(this.state.query)
      .then((data) =>
        this.setState({
          movies: [...data.results],
          loading: false,
          totalPage: data.total_pages,
          currentPage: data.page,
        })
      )
      .catch((err) => {
        console.error(err);
        console.log(err.response);
        this.setState({ loading: false });
      });

    GenreRequest()
      .then((data) =>
        this.setState(() => {
          return { genres: data.genres };
        })
      )
      .catch((err) => {
        console.error(err);
        console.log(err.response);
      });
  }

  nextPage = (page) => {
    this.setState({ loading: true });
    NextPageRequest(this.state.query, page)
      .then((data) =>
        this.setState({
          movies: [...data.results],
          loading: false,
          totalPage: data.total_pages,
          currentPage: page,
        })
      )
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  nextPageRate = (pageRate) => {
    this.setState({ loading: true });
    StarRequestGetNextPageRate(pageRate)
      .then((data) =>
        this.setState({
          moviesRate: [...data.results],
          loading: false,
          totalPageRate: data.total_pages,
          currentPageRate: data.page,
        })
      )
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false });
      });
  };

  moviesRating = () => {
    this.setState({ loading: true });
    StarRequestGet()
      .then((data) =>
        this.setState({
          moviesRate: [...data.results],
          loading: false,
          totalPageRate: data.total_pages,
        })
      )
      .catch((err) => {
        console.error(err);
        console.log(err.response);
        this.setState({ loading: false });
      });
  };

  render() {
    const {
      movies,
      loading,
      currentPage,
      totalPage,
      moviesRate,
      currentPageRate,
      totalPageRate,
    } = this.state;
    return (
      <div className="wrapper">
        <Online>
          <Provider value={this.state.genres}>
            <Tabs
              defaultActiveKey="1"
              centered
              onChange={this.moviesRating}
              items={[
                {
                  label: "Search",
                  key: "1",
                  children: (
                    <>
                      <Search search={this.onSearch} />,
                      {loading ? (
                        <Preloader />
                      ) : (
                        <Movies movies={movies}></Movies>
                      )}
                      <div className="pagination">
                        <Pagination
                          current={currentPage}
                          onChange={this.nextPage}
                          total={totalPage * 20}
                          hideOnSinglePage={true}
                          pageSize={20}
                          showSizeChanger={false}
                        />
                      </div>
                    </>
                  ),
                },
                {
                  label: "Rated",
                  key: "2",
                  children: (
                    <>
                      {loading ? (
                        <Preloader />
                      ) : (
                        <Movies movies={moviesRate}></Movies>
                      )}
                      <div className="pagination">
                        <Pagination
                          current={currentPageRate}
                          onChange={this.nextPageRate}
                          total={totalPageRate * 20}
                          hideOnSinglePage={true}
                          pageSize={20}
                          showSizeChanger={false}
                        />
                      </div>
                    </>
                  ),
                },
              ]}
            />
          </Provider>
        </Online>
        <Offline>
          <span className="offline">
            <Alert
              message="Error"
              description="Здесь могла бы быть ваша реклама, но интернета нет :("
              type="error"
              showIcon
            />
          </span>
        </Offline>
      </div>
    );
  }
}
