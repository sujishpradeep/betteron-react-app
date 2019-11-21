import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Button, Search } from "semantic-ui-react";
import _ from "lodash";

import { withRouter } from "react-router-dom";
import createHistory from "history/createBrowserHistory";

class NavBar extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const isMobile = window.innerWidth >= 1000 ? false : true;

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: isMobile
    });
  }

  handleButtonClick = () => {
    if (this.state.isMobile) {
      const visible = !this.state.visible;
      const search = false;
      this.setState({ visible, search });
    }
  };

  handleSearchClick = () => {
    if (this.state.isMobile) {
      const search = !this.state.search;
      const visible = false;
      this.setState({ search, visible });
    }
  };

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

  render() {
    const { isMobile, visible, search, isLoading, value, results } = this.state;
    const bgcolor = visible || search ? "#0079bf" : "white";

    return (
      <React.Fragment>
        <div className="navbar">
          {isMobile && (
            <React.Fragment>
              <Button
                onClick={this.handleButtonClick}
                className="mt5"
                basic
                inverted
                icon="align justify"
              ></Button>
              <span
                className="mob-logo noSelect"
                onClick={() => this.setState({ visible: false, search: false })}
              >
                <Link to="/">
                  <div className="main-big-font inline white ">
                    betteron&nbsp;
                    {/* <i className="fas fa-chevron-circle-up"></i> */}
                    <Icon name="chevron circle up"></Icon>
                  </div>
                </Link>
              </span>
              <span>
                <Icon
                  name="search"
                  className="white"
                  size="large"
                  onClick={this.handleSearchClick}
                ></Icon>
              </span>
            </React.Fragment>
          )}
          {!isMobile && (
            <React.Fragment>
              <div className="nav-logo noSelect">
                <Link to="/">
                  <div className="main-big-font inline">
                    betteron
                    <Icon name="chevron circle up"></Icon>
                    {/* <i className="fas fa-chevron-circle-up"></i> */}
                  </div>
                </Link>
              </div>
              <div className="nav-search">
                <Search
                  input={{ focus: true }}
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
              </div>
              <div className="nav-buttons">
                <span className=" pointer main-button-font white login-button">
                  <Icon name="plus circle"></Icon>Submit a Resource
                </span>

                <span className=" pointer main-button-font white login-button">
                  Login
                </span>
              </div>
            </React.Fragment>
          )}
        </div>

        {isMobile && (
          <React.Fragment>
            {visible && (
              <div
                className="navbar-mob"
                style={{ background: bgcolor, textAlign: "center" }}
              >
                <div className="navbar-mob-item mbl white ">
                  Submit a Resource
                </div>
                <div className="navbar-mob-item  mbr white ">
                  <Icon name="user"></Icon>Login
                </div>
              </div>
            )}
            {search && (
              <div
                className="navbar-mob"
                style={{ background: bgcolor, textAlign: "center" }}
              >
                <div style={{ width: "100%", padding: "0px 20px" }}>
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
                </div>
              </div>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default NavBar;
