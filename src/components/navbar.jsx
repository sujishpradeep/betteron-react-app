import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Input, Icon, Button, Divider } from "semantic-ui-react";

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

  render() {
    const { isMobile, visible, search } = this.state;
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
              <span className="mob-logo">
                <Link to="/">
                  <div className="main-big-font inline white ">
                    upstacks&nbsp;
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
              <div className="nav-logo">
                <Link to="/">
                  <div className="main-big-font inline">
                    upstacks
                    <Icon name="chevron circle up"></Icon>
                    {/* <i className="fas fa-chevron-circle-up"></i> */}
                  </div>
                </Link>
              </div>
              <div className="nav-search">
                <Input icon="search" placeholder="Search a topic.." />
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
          <div
            className="navbar-mob"
            style={{ background: bgcolor, textAlign: "center" }}
          >
            {visible && (
              <React.Fragment>
                <div className="navbar-mob-item mbl white ">
                  Submit a Resource
                </div>
                <div className="navbar-mob-item  mbr white ">
                  <Icon name="user"></Icon>Login
                </div>
              </React.Fragment>
            )}
            {search && (
              <React.Fragment>
                <div style={{ width: "100%", padding: "0px 20px" }}>
                  <Input
                    icon="search"
                    iconPosition="left"
                    placeholder="Search for a topic..."
                    focus
                    fluid
                  />
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default NavBar;
