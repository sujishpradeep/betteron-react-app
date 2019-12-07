import React, { Component } from "react";

import {
  Segment,
  Header,
  Grid,
  Divider,
  Icon,
  Search
} from "semantic-ui-react";
import PopularTag from "./populartag";
import _ from "lodash";
import NavBar from "./navbar";
import Fuse from "fuse.js";

class LandingPage extends Component {
  state = {};

  handleResultSelect = (e, result) => {
    this.props.history.push(`/topics/${result.result.short}`);
  };

  handleSearchChange = (e, { value }) => {
    const initialState = { isLoading: false, results: [], value: "" };
    this.setState({ isLoading: true, value });

    let keys = { name: "title" };

    let tags = this.props.tags.map(function(o) {
      return _.mapKeys(o, function(v, k) {
        return k in keys ? keys[k] : k;
      });
    });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      let isMatch = result => re.test(result.title);

      let options2 = {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: ["title"]
      };
      let fuse = new Fuse(tags, options2); // "list" is the item array

      isMatch = fuse.search(value);

      this.setState({
        isLoading: false,
        results: isMatch
      });
    }, 300);
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    const { isLoading, value, results } = this.state;
    const tags = this.props.tags || [];
    const popularTags = tags.filter(tag => tag.popular === "Y");

    return (
      <React.Fragment>
        <NavBar {...this.props}></NavBar>
        <div className="outer-container">
          <Divider hidden></Divider>
          <Divider hidden></Divider>
          <Divider hidden></Divider>
          <Segment basic textAlign="center">
            <div className=" main-big-font centre-font inline pointer noSelect">
              betteron
              {/* <i className="fas fa-chevron-circle-up "></i> */}
              <Icon name="chevron circle up"></Icon>
            </div>
            {/* <div
              style={{ color: "#999", fontSize: "15px", textAlign: "center" }}
            >
              Learn and Share community enabling you to scale up to new heights
            </div> */}
          </Segment>
          <Header as="h1" textAlign="center">
            Find the Best Personal Development Books & Apps
          </Header>

          <Divider hidden></Divider>
          <div className="main-container">
            <Grid columns={1} stackable>
              <Grid.Column>
                <Search
                  input={{ fluid: true, focus: true }}
                  fluid
                  icon="search"
                  placeholder="Search for a topic..."
                  noResultsMessage="Sorry, no results found"
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true
                  })}
                  results={results}
                  value={value}
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
      </React.Fragment>
    );
  }
}

export default LandingPage;
