import React, { Component } from "react";
import { Icon, Header, Label } from "semantic-ui-react";

class ResourceItem extends Component {
  state = {};

  handleLabelClick = topic => {
    // console.log("this.props", this.props.history);
    this.props.history.push(`/topics/${topic}`);
  };

  render() {
    const { resource } = this.props;

    return (
      <div
        style={{
          padding: "10px",
          border: "solid 1px rgba(34,36,38,.15)",
          borderTop: "0px"
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            className="pointer noSelect"
            style={{
              background: "#f3f4f5",
              border: "solid 1px rgba(34,36,38,.15)",
              padding: "2px",
              paddingBottom: "10px",
              textAlign: "center",
              borderRadius: "4px",
              width: "50px",
              height: "60px"
            }}
          >
            <Icon name="chevron up" color="grey"></Icon>
            <span
              as="h1"
              style={{
                fontSize: "23px",
                color: "grey",
                display: "block"
              }}
            >
              {resource.upvotes}
            </span>
          </div>
          <div style={{ paddingLeft: "10px" }}>
            <Header as="h2" className="mb5">
              <span
                className="hover pointer noSelect pr5 "
                onClick={() => window.open(resource.url, "_blank")}
              >
                {resource.name}
              </span>

              <span color="grey" className="pointer noSelect pr5 fs12 ">
                <span className="black">{resource.type} /</span>
              </span>
              <span color="grey" className="pointer noSelect pr5 fs12">
                <span className="black">{resource.pricing}</span>
              </span>

              {/* <Header.Subheader> Napolean Hill </Header.Subheader> */}
            </Header>

            {resource.tags.map(t => (
              <Label
                color="yellow"
                className="pointer noSelect pr5 mt5"
                onClick={() => this.handleLabelClick(t)}
                key={t}
              >
                <span className="black">
                  {t.replace(/\b\w/g, l => l.toUpperCase()).replace("-", " ")}
                </span>
              </Label>
            ))}
            <br></br>
          </div>
        </div>
      </div>
    );
  }
}

export default ResourceItem;
