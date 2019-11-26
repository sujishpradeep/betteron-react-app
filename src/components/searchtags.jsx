import React, { Component } from "react";
import { Search } from "semantic-ui-react";

var _ = require("lodash");

class SearchTag extends Component {
  state = {};
  handleResultSelect = (e, result) => {
    console.log("result name", result.result.title);

    this.setState({
      value: ""
    });

    this.props.onNewTagAdd(result.result.title);
  };

  handleSearchChange = (e, { value }) => {
    const initialState = { isSearchLoading: false, results: [], value: "" };
    this.setState({
      isSearchLoading: true,
      value
    });

    var keys = { name: "title" };

    var tags = this.props.tags.map(function(o) {
      return _.mapKeys(o, function(v, k) {
        return k in keys ? keys[k] : k;
      });
    });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isSearchLoading: false,
        results: _.filter(tags, isMatch)
      });
    }, 300);
  };

  render() {
    const { isSearchLoading, results, value } = this.state;
    return (
      <React.Fragment>
        <Search
          input={{
            fluid: true
            //   error: errors["tags"] || false
          }}
          fluid
          icon="pink"
          placeholder="Select relevant topic areas "
          noResultsMessage="Sorry, no results found"
          loading={isSearchLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          {...this.props}
        />
      </React.Fragment>
    );
  }
}

export default SearchTag;
