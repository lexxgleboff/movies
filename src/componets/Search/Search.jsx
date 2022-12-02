import React, { Component } from "react";
import { Input } from "antd";
import "./Search.css";
import PropTypes from "prop-types";

export default class Search extends Component {
  state = {
    value: "",
  };

  onSubmit = (e) => {
    // eslint-disable-next-line react/prop-types
    const { search } = this.props;
    const { value } = this.state;
    e.preventDefault();
    search(value);
    this.setState({ value: "" });
  };

  onChangeValue = (e) => {
    if (e.target.value.charAt(0) === " ") {
      this.setState({ value: "" });
    } else {
      this.setState({ value: e.target.value });
    }
  };

  render() {
    return (
      <div className="form">
        <form onSubmit={this.onSubmit}>
          <Input
            placeholder="Type to search..."
            onChange={this.onChangeValue}
          />
        </form>
      </div>
    );
  }
}

Search.propType = {
  search: PropTypes.func,
};
