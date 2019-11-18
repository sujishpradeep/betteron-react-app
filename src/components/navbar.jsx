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
    const isMobile = window.innerWidth >= 920 ? false : true;

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: isMobile
    });
  }
  render() {
    console.log("isMobile", this.state.isMobile);
    const isMobile = this.state.isMobile;
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
                    betterr&nbsp;
                    <i class="fas fa-chevron-circle-up"></i>
                  </div>
                </Link>
              </span>
              <span>
                <Icon name="search" className="white" size="large"></Icon>
              </span>
            </React.Fragment>
          )}
          {!isMobile && (
            <React.Fragment>
              <div className="nav-logo">
                <Link to="/">
                  <div className="main-big-font inline">
                    betterr
                    <i class="fas fa-chevron-circle-up"></i>
                  </div>
                </Link>
              </div>
              <div className="nav-search">
                <Input icon="search" placeholder="Search a topic.." />
              </div>
              <div className="nav-buttons">
                <span className=" pointer main-button-font white login-button">
                  <Icon name="plus circle"></Icon>Submit a resource
                </span>

                <span className=" pointer main-button-font white login-button">
                  Login
                </span>
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default NavBar;
