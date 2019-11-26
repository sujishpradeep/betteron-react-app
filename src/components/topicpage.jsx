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
  Button,
  Loader,
  Dimmer,
  Segment,
  Divider
} from "semantic-ui-react";
import _ from "lodash";

class TopicPage extends Component {
  state = { isLoading: true, filterType: "", filterPricing: "" };

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount() {
    const topicname = this.props.match.params.topicname
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace("-", " ");
    this.setState({
      isLoading: true,
      topicname,
      filterType: "",
      filterPricing: ""
    });
    setTimeout(() => {
      this.setResources(this.props.match.params.topicname);
    }, 500);

    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    window.scrollTo(0, 0);
  }

  async setResources(topicname) {
    const { data } = await getResourcesByTag(topicname);

    topicname = topicname
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace("-", " ");

    this.setState({ isLoading: false });
    this.setState({ resources: data, topicname });
  }

  async componentDidUpdate(prevProps) {
    if (
      this.props.match.params.topicname !== prevProps.match.params.topicname
    ) {
      const topicname = this.props.match.params.topicname
        .replace(/\b\w/g, l => l.toUpperCase())
        .replace("-", " ");
      this.setState({ isLoading: true, topicname, resources: [] });
      setTimeout(() => {
        this.setResources(this.props.match.params.topicname);
      }, 500);
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
    const resources = this.state.resources || [];
    console.log("resources", resources);

    console.log("this.state.filterType", this.state.filterType);

    let filtered = resources;

    const filterType = this.state.filterType || "";

    if (filterType.length > 0) {
      console.log("check filter pricing", filterType.concat("s"));
      filtered = resources.filter(r => r.type.concat("s") === filterType);
    }

    console.log("filtered 1", filtered);

    const filterPricing = this.state.filterPricing || "";

    if (filterPricing.length > 0) {
      console.log("check filter pricing", filterPricing);
      filtered = filtered.filter(r => r.pricing === filterPricing);
    }

    console.log("filtered 2", filtered);

    const resourcesSorted = _.orderBy(filtered, ["upvotes"], ["desc"]);
    console.log("resourcesSorted", resourcesSorted);

    return resourcesSorted;
  };

  checkboxChangeHandler = (e, data) => {
    console.log("this.state.filterType 2", this.state.filterType);

    if (data.name === "Type") {
      console.log("data.name", data.name);
      const filterType = data.value === this.state.filterType ? "" : data.value;
      console.log("filterTypeXXX", filterType);
      this.setState({ filterType });
    }

    if (data.name === "Pricing") {
      const filterPricing =
        data.value === this.state.filterPricing ? "" : data.value;
      this.setState({ filterPricing });
    }

    const resources = this.state.resources;
    this.setState({ isLoading: true, resources: [] });

    setTimeout(() => {
      this.setState({ isLoading: false, resources: resources });
    }, 500);

    console.log(data); // It is giving undefined here
  };

  render() {
    const {
      value,
      isMobile,
      activeItem,
      filterVisible,
      isLoading,
      topicname,
      filterType,
      filterPricing
    } = this.state;

    const resourcesFiltered = this.doSortAndFilter() || [];
    const iconColor = filterVisible ? "blue" : "grey";
    console.log("filterType", filterType);

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
                      <Menu.Item>
                        <Header as="h4">Type of Resource</Header>
                        <Checkbox
                          label="Apps"
                          value="Apps"
                          checked={filterType === "Apps"}
                          onChange={this.checkboxChangeHandler}
                          name="Type"
                        ></Checkbox>
                        <br></br>
                        <br></br>
                        <Checkbox
                          label="Books"
                          value="Books"
                          checked={filterType === "Books"}
                          onChange={this.checkboxChangeHandler}
                          name="Type"
                        ></Checkbox>
                        <br></br>
                        <br></br>
                        <Checkbox
                          label="Courses"
                          value="Courses"
                          checked={filterType === "Courses"}
                          onChange={this.checkboxChangeHandler}
                          name="Type"
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
                          checked={filterPricing === "Free"}
                          onChange={this.checkboxChangeHandler}
                          name="Pricing"
                        ></Checkbox>
                        <br></br>
                        <br></br>
                        <Checkbox
                          label="Paid"
                          value="Paid"
                          checked={filterPricing === "Paid"}
                          onChange={this.checkboxChangeHandler}
                          name="Pricing"
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

                {isLoading && (
                  <Segment basic>
                    <Divider hidden></Divider>
                    <Dimmer active inverted>
                      <Loader inverted></Loader>
                    </Dimmer>
                  </Segment>
                )}
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
