import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Icon, Button, Search, Modal } from "semantic-ui-react";
import _ from "lodash";
import Signup from "./signup";
import authservice from "../services/authservice";
import Login from "./login";

// import { withRouter } from "react-router-dom";
// import createHistory from "history/createBrowserHistory";
import SubmitResource from "./submitres";

class NavBar extends Component {
  state = {
    isPageLoading: true,
    loginModal: false,
    signupModal: false,
    submitModal: false
  };

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    const token = authservice.getCurrentUser() || {};

    console.log("token", token);
    this.setState({ token, isPageLoading: false });
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

  logOut = () => {
    authservice.logout();
    window.location = "/";
  };

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
    this.props.history.push(`/topics/${result.result.short}`);
  };

  handleSearchChange = (e, { value }) => {
    const initialState = { isSearchLoading: false, results: [], value: "" };
    this.setState({ isSearchLoading: true, value });

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

  handleLoginModalClick = () => {
    const loginModal = !this.state.loginModal;
    const signupModal = false;
    this.setState({ loginModal, signupModal });
  };

  handleSignUpClick = () => {
    const signupModal = !this.state.signupModal;
    const loginModal = false;
    this.setState({ signupModal, loginModal });
  };

  handleSubmitClick = () => {
    const submitModal = !this.state.submitModal;
    this.setState({ submitModal });
  };

  render() {
    const {
      isMobile,
      visible,
      search,
      isSearchLoading,
      value,
      results,
      isPageLoading,
      token,
      loginModal,
      signupModal,
      submitModal
    } = this.state;

    const fullname = (token && token.fullname) || "";
    console.log("loginModal", loginModal);
    if (isPageLoading)
      return <div style={{ height: "100%", width: "100%" }}></div>;

    const bgcolor = visible || search ? "#0079bf" : "white";

    return (
      <React.Fragment>
        <div className="navbar">
          <Modal
            size="tiny"
            open={submitModal}
            onClose={() => this.setState({ submitModal: false })}
          >
            <SubmitResource
              onSubmitModalClick={this.handleSubmitModalClick}
              tags={this.props.tags}
            ></SubmitResource>
          </Modal>
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
                  placeholder="Search for a topic..."
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
              </div>
              <div className="nav-buttons">
                <span
                  className=" pointer main-button-font white login-button"
                  onClick={() => this.setState({ submitModal: true })}
                >
                  <Icon name="plus circle"></Icon>Submit a Resource
                </span>

                {!fullname && (
                  <span
                    className=" pointer main-button-font white login-button"
                    onClick={() => this.setState({ signupModal: true })}
                  >
                    Login
                  </span>
                )}
                <Modal
                  size="tiny"
                  open={signupModal}
                  onClose={() => this.setState({ signupModal: false })}
                >
                  <Signup
                    onLoginModalClick={this.handleLoginModalClick}
                  ></Signup>
                </Modal>

                <Modal
                  size="tiny"
                  open={loginModal}
                  onClose={() => this.setState({ loginModal: false })}
                >
                  <Login onSignUpClick={this.handleSignUpClick}></Login>
                </Modal>

                {fullname && (
                  <span
                    className=" pointer main-button-font white login-button"
                    onClick={this.logOut}
                  >
                    Logout
                  </span>
                )}
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
                <div
                  className="navbar-mob-item mbl white "
                  onClick={() => this.setState({ submitModal: true })}
                >
                  Submit a Resource
                </div>

                {!fullname && (
                  <span
                    className=" navbar-mob-item  mbr white "
                    onClick={() => this.setState({ signupModal: true })}
                  >
                    <Icon name="user"></Icon>Login
                  </span>
                )}

                <Modal
                  size="tiny"
                  open={signupModal}
                  onClose={() => this.setState({ signupModal: false })}
                >
                  <Signup
                    onLoginModalClick={this.handleLoginModalClick}
                  ></Signup>
                </Modal>

                <Modal
                  size="tiny"
                  open={loginModal}
                  onClose={() => this.setState({ loginModal: false })}
                >
                  <Login onSignUpClick={this.handleSignUpClick}></Login>
                </Modal>

                {fullname && (
                  <span
                    className=" navbar-mob-item  mbr white "
                    onClick={this.logOut}
                  >
                    Logout
                  </span>
                )}
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
                    placeholder="Search for a topic..."
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
