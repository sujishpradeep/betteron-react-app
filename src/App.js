import React from "react";
import "./App.css";

import NavBar from "./components/navbar";
import LandingPage from "./components/landingpage";
import Footer from "./components/footer";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import logo from "./logo.png";
import TopicPage from "./components/topicpage";

function App() {
  return (
    <React.Fragment>
      <Router>
        <NavBar></NavBar>
        <Switch>
          <Route path="/topics/:topicname" component={TopicPage}></Route>
          <Route path="/" component={LandingPage}></Route>
        </Switch>
        <Footer></Footer>
      </Router>
    </React.Fragment>
  );
}

export default App;
