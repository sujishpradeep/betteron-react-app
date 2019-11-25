import React, { Component } from "react";
import NavBar from "./navbar";
import { getResourcesByTag } from "../services/resourceservice";
import ResourceItem from "./resourceitem";
import {
  Header,
  Container,
  Checkbox,
  Grid,
  Menu,
  Icon,
  Button
} from "semantic-ui-react";
import _ from "lodash";

class TopicPage extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount() {
    this.setResources(this.props.match.params.topicname);
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    window.scrollTo(0, 0);
  }

  async setResources(topicname) {
    const { data } = await getResourcesByTag(topicname);

    topicname = topicname
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace("-", " ");

    this.setState({ resources: data, topicname });
  }

  async componentDidUpdate(prevProps) {
    if (
      this.props.match.params.topicname !== prevProps.match.params.topicname
    ) {
      this.setResources(this.props.match.params.topicname);
    }
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

  handleLabelClick = topic => {
    // console.log("this.props", this.props.history);
    this.setState({ topicname: topic });
  };

  doSortAndFilter = () => {
    const { resources } = this.state;
    const resourcesSorted = _.orderBy(resources, ["upvotes"], ["desc"]);

    return resourcesSorted;
  };

  render() {
    const {
      value,
      isMobile,
      activeItem,
      filterVisible,

      topicname
    } = this.state;

    const resourcesFiltered = this.doSortAndFilter() || [];
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
                    {topicname}
                    <Header.Subheader>
                      {`Find Apps, Books and Courses submitted and voted by
                      betteron Community on the topic of ${topicname}`}
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
                    <div style={{ background: "rgb(248, 248, 249)" }}>
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
                  {`Most Upvoted Applications And Resources on ${topicname} `}
                </div>

                {resourcesFiltered.map(r => (
                  <ResourceItem
                    key={r._id}
                    resource={r}
                    history={this.props.history}
                  />
                ))}
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default TopicPage;
