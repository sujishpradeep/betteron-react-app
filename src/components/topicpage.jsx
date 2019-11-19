import React, { Component } from "react";

class TopicPage extends Component {
  state = {};
  render() {
    return <div>{this.props.match.params.topicname}</div>;
  }
}

export default TopicPage;
