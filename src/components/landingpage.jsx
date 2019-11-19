import React, { Component } from "react";

import { createBrowserHistory } from "history";

import { Segment, Header, Input, Grid, Divider, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  state = {};

  //   redirect(to) {
  //     createBrowserHistory.push({
  //       pathname: to
  //     });
  //   }

  handleTopicClick = () => {};

  render() {
    return (
      <div className="outer-container">
        <Divider hidden></Divider>
        <Divider hidden></Divider>
        <Divider hidden></Divider>
        <Segment basic textAlign="center">
          <div className=" main-big-font centre-font inline">
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
          <Grid>
            <Grid.Column>
              <Input
                icon="search"
                iconPosition="left"
                placeholder="Search for a topic..."
                fluid
                focus
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
            <Grid.Column>
              <Segment
                className="pointer noSelect "
                raised
                as={Link}
                style={{ display: "block", textDecoration: "none" }}
                to="/topics/productivity"
              >
                <div className="inline fs20 black">Productivity</div>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment
                className="pointer noSelect"
                raised
                as={Link}
                style={{ display: "block", textDecoration: "none" }}
                to="/topics/personal-finance"
              >
                <div className="inline fs20 black">Personal Finance</div>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment
                className="pointer noSelect"
                raised
                as={Link}
                style={{ display: "block", textDecoration: "none" }}
                to="/topics/fitness"
              >
                <div className="inline fs20 black">Fitness</div>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment
                className="pointer noSelect"
                raised
                as={Link}
                style={{ display: "block", textDecoration: "none" }}
                to="/topics/time-management"
              >
                <div className="inline fs20 black">Time Management</div>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment
                className="pointer noSelect"
                raised
                as={Link}
                style={{ display: "block", textDecoration: "none" }}
                to="/topics/procastination"
              >
                <div className="inline fs20 black">Procastination</div>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

export default LandingPage;
