import React, { Component } from "react";
import NavBar from "./navbar";
import {
  getResourcesByTag,
  updateResourceUpvotes
} from "../services/resourceservice";
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
  Divider,
  Message
} from "semantic-ui-react";
import _ from "lodash";
import { addOrRemoveFromArray } from "../generic/arrays";
import { getAccount, updateAccountUpvotes } from "../services/accountservice";
import authservice from "../services/authservice";
import update from "immutability-helper";

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

    // const { _id: userid, upvotes } = this.props.token;
    this.setState({
      isLoading: true,
      topicname,
      filterType: "",
      filterPricing: ""
    });
    setTimeout(() => {
      this.setResources(this.props.match.params.topicname);
    }, 500);

    const token = authservice.getCurrentUser();

    const { data } = await getAccount(token.accountid);
    this.setState({ account: data });

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
      this.setState({
        isLoading: true,
        topicname,
        resources: [],
        filterType: "",
        filterPricing: "",
        filterVisible: false
      });
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
    this.setState({ topicname: topic });
  };

  doSortAndFilter = () => {
    const resources = this.state.resources || [];
    let filtered = resources.filter(r => r.isApproved === "Y");
    const filterType = this.state.filterType || "";

    if (filterType.length > 0) {
      filtered = resources.filter(r => r.type.concat("s") === filterType);
    }

    const filterPricing = this.state.filterPricing || "";

    if (filterPricing.length > 0) {
      filtered = filtered.filter(r => r.pricing === filterPricing);
    }

    const resourcesSorted = _.orderBy(filtered, ["upvotes"], ["desc"]);
    return resourcesSorted;
  };

  checkboxChangeHandler = (e, data) => {
    if (data.name === "Type") {
      const filterType = data.value === this.state.filterType ? "" : data.value;
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
  };

  handleUpvoteClick = async resource => {
    const { account } = this.state;
    // if (!userInfo.username) {
    //   window.location = "/login";
    //   return;
    // }
    console.log("ACCOUNT", this.state.account);

    let accountUpvotes = account.upvotes || [];

    //onPeaceClick -> add 1 to peaceCount of the trail, if user has not peaceMarked in original State,
    //                reduce 1 from peaceCount if user has already peaceMarked in original State
    const counter = accountUpvotes.includes(resource._id) ? -1 : 1;
    resource.upvotes += counter;
    const { resources } = this.state;
    console.log("resources", resources);
    var index = resources.findIndex(r => r._id == resource._id);

    const updatedResources = update(this.state.resources, {
      $splice: [[index, 1, resource]]
    }); // array.splice(start, deleteCount, item1)
    this.setState({ resources: updatedResources });

    console.log("resource.resourceid", resource._id);

    const upvotes = addOrRemoveFromArray(accountUpvotes, resource._id);
    account.upvotes = upvotes;
    console.log("resource.upvotes", { upvotes: resource.upvotes });
    this.setState({ account });

    await updateResourceUpvotes(resource._id, resource);
    await updateAccountUpvotes(account._id, upvotes);
  };

  render() {
    const {
      account,
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
                {!isLoading && _.isEmpty(resourcesFiltered) && (
                  <Message info size="tiny" compact>
                    <Message.Header>No Resources found</Message.Header>
                    <p>
                      We're sorry, no results are found at the moment for the
                      topic/selection you have made. If there are any relevant
                      resources in this category that you have found useful,
                      please feel free to submit the resources.
                    </p>
                  </Message>
                )}
                {resourcesFiltered.map(r => (
                  <ResourceItem
                    key={r._id}
                    resource={r}
                    history={this.props.history}
                    liked={account.upvotes.includes(r._id)}
                    onUpvoteClick={this.handleUpvoteClick}
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
