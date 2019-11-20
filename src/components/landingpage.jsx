import React, { Component } from "react";

import { createBrowserHistory } from "history";

import {
  Segment,
  Header,
  Input,
  Grid,
  Divider,
  Icon,
  Search,
  Menu,
  Form
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import PopularTag from "./populartag";
import _ from "lodash";
import { withRouter } from "react-router";

class LandingPage extends Component {
  state = {};

  //   redirect(to) {
  //     createBrowserHistory.push({
  //       pathname: to
  //     });
  //   }

  handleTopicClick = () => {};

  handleResultSelect = (e, result) => {
    console.log("result", result.result.short);
    this.props.history.push(`/topics/${result.result.short}`);
  };

  handleSearchChange = (e, { value }) => {
    console.log("Search change");
    const initialState = { isLoading: false, results: [], value: "" };
    this.setState({ isLoading: true, value });

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
        isLoading: false,
        results: _.filter(tags, isMatch)
      });
    }, 300);

    console.log("this.props.tags", tags);
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { isLoading, value, results } = this.state;
    const tags = this.props.tags || [];
    const popularTags = tags.filter(tag => tag.popular === "Y");

    return (
      <div className="outer-container">
        <Divider hidden></Divider>
        <Divider hidden></Divider>
        <Divider hidden></Divider>
        <Segment basic textAlign="center">
          <div className=" main-big-font centre-font inline pointer noSelect">
            upstacks
            {/* <i className="fas fa-chevron-circle-up "></i> */}
            <Icon name="chevron circle up"></Icon>
          </div>
        </Segment>
        <Header as="h1" textAlign="center">
          Find the Best Personal Development Apps, Books & Courses
        </Header>
        <Divider hidden></Divider>
        <div className="main-container">
          <Grid columns={1} stackable>
            <Grid.Column>
              <Search
                input={{ fluid: true, focus: true }}
                fluid
                icon="search"
                iconPosition="left"
                placeholder="Search for a topic..."
                noResultsMessage="Sorry, no results found"
                loading={isLoading}
                onResultSelect={this.handleResultSelect}
                onSearchChange={_.debounce(this.handleSearchChange, 500, {
                  leading: true
                })}
                results={results}
                value={value}
                {...this.props}
              />
            </Grid.Column>
          </Grid>

          <Grid columns={1} stackable>
            <Grid.Column>
              <Icon name="chart line" color="grey" size="large"></Icon>Popular
              Topics
            </Grid.Column>
          </Grid>

          <Grid columns={3} stackable>
            {popularTags.map(tag => (
              <PopularTag key={tag._id} tag={tag} />
            ))}
          </Grid>
        </div>
      </div>
    );
  }
}

export default LandingPage;
