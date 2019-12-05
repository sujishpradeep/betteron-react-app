import React, { Component } from "react";
import {
  Container,
  Divider,
  Icon,
  Item,
  Button,
  Header
} from "semantic-ui-react";
import NavBar from "./navbar";
import aboutus from "../images//aboutus.png";

class Blogs extends Component {
  state = {};
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClick = () => {
    this.props.history.push(`/blogs/resolution-for-the-new-decade`);
  };
  render() {
    return (
      <React.Fragment>
        <NavBar tag={this.props.tags} history={this.props.history}></NavBar>
        <div className="outer-container">
          <Container text style={{ marginTop: "2em", paddingBottom: "7em" }}>
            <Header
              as="h1"
              style={{ color: "#2d2d2d", fontFamily: "Raleway" }}
              className="pointer"
            >
              Blogs
            </Header>
            <Divider></Divider>
            <Item>
              <Item.Image size="medium" src={aboutus} />

              <Item.Content>
                <Item.Header
                  as="h2"
                  className="pointer"
                  onClick={this.handleClick}
                  style={{ color: "#2d2d2d", fontFamily: "Raleway" }}
                >
                  Resolution for the new decade
                </Item.Header>

                <Item.Description
                  style={{ color: "#2d2d2d", fontFamily: "Raleway" }}
                >
                  The first thought that would come to our minds if we are asked
                  to plan for a decade is that it's going to be very
                  unpredictable and unrealistic to do so. How would we know
                  where we would be in another 10 years?{" "}
                </Item.Description>
                <br></br>
                <Item.Extra>
                  <Button
                    tertiary
                    onClick={this.handleClick}
                    style={{ color: "#2d2d2d", fontFamily: "Raleway" }}
                  >
                    Read more <Icon name="arrow circle right"></Icon>
                  </Button>
                </Item.Extra>
              </Item.Content>
            </Item>
            <Divider></Divider>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Blogs;
