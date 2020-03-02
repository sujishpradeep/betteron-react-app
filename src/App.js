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
import { Helmet } from "react-helmet";
import Blogs from "./components/blogs";
import AdminUsers from "./admin/adminusers";
import BlogsPage from "./components/blogs-page";

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
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            {`Find the Best Apps Resources on Personal Development, Croudsourced at Betteron`}
          </title>
          <meta
            name="description"
            content={`Want to find Apps and Books that would help you with Personal Development? Check out these resources maintainted by Betteron community. Pick one based on your preference and learn and practice the tips and tricks to help you on Personal Development.`}
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Find the Best Apps and Books on Personal Development"
          />
          <meta
            name="twitter:description"
            content="Want to find Apps and Books that would help you with Personal Development? Check out these resources."
          />
          <meta name="twitter:site" content="@betteron_" />
          <meta
            name="twitter:image"
            content="https://blogs-betteron.s3-ap-southeast-2.amazonaws.com/betteron_logo.png"
          />
          <meta name="twitter:creator" content="@betteron_" />
          <meta
            property="og:title"
            content={`Find the Best Apps, Books and Videos on Personal Development, Croudsourced at Betteron`}
          />
          <meta
            property="og:description"
            content={`Want to find Apps, Books and Videos that would help you with Personal Development? Check out these resources maintainted by Betteron community. Pick one based on your preference and learn and practice the tips and tricks to help you on Personal Development.`}
          />

          <meta
            property="og:image"
            content="https://blogs-betteron.s3-ap-southeast-2.amazonaws.com/betteron_logo.png"
          />
        </Helmet>
        <Router>
          <Switch>
            <Route
              path="/topics/:topicname"
              render={props => (
                <TopicPage {...props} tags={tags} token={token} />
              )}
            />

            <Route
              exact
              path="/blogs/resolution-for-the-new-decade"
              render={props => <BlogsPage {...props} tags={tags} />}
            />

            <Route
              path="/blogs"
              exact
              render={props => <Blogs {...props} tags={tags} />}
            />

            {/* <Route
              path="/aboutus"
              render={props => <AboutUs {...props} tags={tags} />}
            /> */}

            <Route
              path="/admin/tags"
              render={props => <AdminTags {...props} tags={tags} />}
            />
            <Route
              path="/admin/res"
              render={props => <AdminResources {...props} tags={tags} />}
            />
            <Route
              path="/admin/users"
              render={props => <AdminUsers {...props} tags={tags} />}
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
