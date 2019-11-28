import React, { Component } from "react";
import "./App.css";

import LandingPage from "./components/landingpage";
import Footer from "./components/footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getTags } from "./services/tagService";

// import logo from "./logo.png";
import TopicPage from "./components/topicpage";
import AdminTags from "./admin/admintags";
import AdminResources from "./admin/adminresources";
import authservice from "./services/authservice";
import AboutUs from "./components/aboutus";

class App extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await getTags();
    const token = authservice.getCurrentUser();

    this.setState({ tags: data, token });
  }

  render() {
    const { tags, token } = this.state;
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route
              path="/topics/:topicname"
              render={props => (
                <TopicPage {...props} tags={tags} token={token} />
              )}
            />

            <Route
              path="/aboutus"
              render={props => <AboutUs {...props} tags={tags} />}
            />

            <Route
              path="/admin/tags"
              render={props => <AdminTags {...props} tags={tags} />}
            />
            <Route
              path="/admin/res"
              render={props => <AdminResources {...props} tags={tags} />}
            />
            <Route
              path="/"
              exact
              render={props => (
                <LandingPage {...props} tags={tags} token={token} />
              )}
            />
          </Switch>
          <Footer></Footer>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
