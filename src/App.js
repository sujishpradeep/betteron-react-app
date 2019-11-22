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

class App extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await getTags();
    this.setState({ tags: data });
  }

  render() {
    const { tags } = this.state;
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route
              path="/topics/:topicname"
              render={props => <TopicPage {...props} tags={tags} />}
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
              render={props => <LandingPage {...props} tags={tags} />}
            />
          </Switch>
          <Footer></Footer>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
