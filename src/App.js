import React, { Component } from "react";
import "./App.css";

import NavBar from "./components/navbar";
import LandingPage from "./components/landingpage";
import Footer from "./components/footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getTags } from "./services/tagService";

// import logo from "./logo.png";
import TopicPage from "./components/topicpage";
import config from "./config";

class App extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await getTags();
    console.log("data", data);
    this.setState({ tags: data });
  }

  render() {
    const { tags } = this.state;
    return (
      <React.Fragment>
        <Router>
          <NavBar></NavBar>
          <Switch>
            <Route path="/topics/:topicname" component={TopicPage}></Route>
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
