import React, { Component } from "react";
import NavBar from "./navbar";
import {
  Header,
  Form,
  Container,
  Item,
  Checkbox,
  Grid,
  Menu,
  Message,
  Segment,
  Label,
  Icon,
  Button,
  Divider
} from "semantic-ui-react";

class TopicPage extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    const isMobile = window.innerWidth >= 1000 ? false : true;

    this.setState({
      width: window.innerWidth,
      height: window.innerHeight,
      isMobile: isMobile
    });
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  handleFilterClick = () => {
    const filterVisible = !this.state.filterVisible;
    this.setState({ filterVisible });
  };
  render() {
    const { value, isMobile, activeItem, filterVisible } = this.state;
    const iconColor = filterVisible ? "blue" : "grey";

    return (
      <React.Fragment>
        <NavBar tags={this.props.tags} history={this.props.history}></NavBar>
        <div className="outer-container">
          <Container>
            <Grid columns={1}>
              <Grid.Column>
                <Header as="h1" style={{ paddingTop: "10px" }}>
                  <Header.Content>
                    Personal Finance
                    <Header.Subheader>
                      Find Apps, Books and Courses submitted and voted by
                      betteron Community to help you with Personal Finance
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid>

            {isMobile && (
              <Grid columns={1}>
                <Grid.Column className="pt0 pb0">
                  <Button
                    icon
                    labelPosition="left"
                    basic
                    onClick={this.handleFilterClick}
                    size="small"
                    color={iconColor}
                  >
                    <Icon name="sliders" color={iconColor} />

                    {filterVisible && (
                      <span style={{ fontWeight: 600 }} className="primary">
                        Filter
                      </span>
                    )}

                    {!filterVisible && <span>Filter</span>}
                  </Button>
                </Grid.Column>
              </Grid>
            )}

            <Grid columns={2} stackable>
              {(!isMobile || filterVisible) && (
                <Grid.Column width={4}>
                  <Menu vertical>
                    <div style={{ background: "rgb(248, 248, 249);" }}>
                      <Menu.Item
                        name="promotions"
                        active={activeItem === "promotions"}
                        onClick={this.handleItemClick}
                      >
                        <Header as="h4">Type of Resource</Header>
                        <Checkbox
                          label="Apps"
                          value="Apps"
                          checked={value === "Apps"}
                          onChange={this.handleChange}
                        ></Checkbox>
                        <br></br>
                        <br></br>
                        <Checkbox
                          label="Books"
                          value="Books"
                          checked={value === "Books"}
                          onChange={this.handleChange}
                        ></Checkbox>
                        <br></br>
                        <br></br>
                        <Checkbox
                          label="Courses"
                          value="Courses"
                          checked={value === "Courses"}
                          onChange={this.handleChange}
                        ></Checkbox>
                      </Menu.Item>

                      <Menu.Item
                        name="coupons"
                        active={activeItem === "coupons"}
                        onClick={this.handleItemClick}
                      >
                        <Header as="h4">Pricing</Header>
                        <Checkbox
                          label="Free"
                          value="Free"
                          checked={value === "Free"}
                          onChange={this.handleChange}
                        ></Checkbox>
                        <br></br>
                        <br></br>
                        <Checkbox
                          label="Paid"
                          value="Paid"
                          checked={value === "Paid"}
                          onChange={this.handleChange}
                        ></Checkbox>
                      </Menu.Item>
                    </div>
                  </Menu>
                </Grid.Column>
              )}

              <Grid.Column width={12}>
                <div
                  style={{
                    padding: "10px",
                    border: "solid 1px rgba(34,36,38,.15)",
                    background: "rgba(34,36,38,.1)",
                    fontSize: "15px"
                  }}
                >
                  Top Personal Finance Applications And Resources
                </div>

                <div
                  style={{
                    padding: "10px",
                    border: "solid 1px rgba(34,36,38,.15)",
                    borderTop: "0px"
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      secondary
                      textAlign="center"
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
                        3
                      </span>
                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                      <Header as="h2" className="mb5">
                        <span className="hover pointer noSelect ">
                          Think And Grow Rich
                        </span>

                        <Header.Subheader> Napolean Hill </Header.Subheader>
                      </Header>

                      <Label
                        color="yellow"
                        className="pointer noSelect pr5 mt5"
                      >
                        <span className="black">Book</span>
                      </Label>

                      <Label
                        color="yellow"
                        className="pointer noSelect pr5 mt5"
                      >
                        <span className="black">Paid</span>
                      </Label>

                      <Label
                        color="yellow"
                        className="pointer  noSelect pr5 mt5"
                      >
                        <span className="black">Investing</span>
                      </Label>
                      <Label
                        color="yellow"
                        className="pointer noSelect pr5 mt5"
                      >
                        <span className="black">Personal Finance</span>
                      </Label>
                      <Label
                        color="yellow"
                        className="pointer noSelect pr5 mt5"
                      >
                        <span className="black">Money</span>
                      </Label>
                      <br></br>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    padding: "10px",
                    border: "solid 1px rgba(34,36,38,.15)",
                    borderTop: "0px"
                  }}
                >
                  <div style={{ display: "flex" }}>
                    <div
                      secondary
                      textAlign="center"
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
                        34
                      </span>
                    </div>
                    <div style={{ paddingLeft: "10px" }}>
                      <Header as="h2" className="mb5">
                        <span className="hover pointer noSelect">
                          MoneyManager
                        </span>
                      </Header>

                      <Label
                        color="yellow"
                        className="pointer noSelect pr5 mt5"
                      >
                        <span className="black">App</span>
                      </Label>

                      <Label
                        color="yellow"
                        className="pointer noSelect pr5 mt5"
                      >
                        <span className="black">Free</span>
                      </Label>

                      <Label
                        color="yellow"
                        className="pointer noSelect pr5 mt5"
                      >
                        <span className="black">Investing</span>
                      </Label>
                      <Label
                        color="yellow"
                        className="pointer noSelect pr5 mt5"
                      >
                        <span className="black">Personal Finance</span>
                      </Label>
                      <Label
                        color="yellow"
                        className="pointer noSelect pr5 mt5"
                      >
                        <span className="black">Money</span>
                      </Label>
                      <br></br>
                    </div>
                  </div>
                </div>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default TopicPage;
