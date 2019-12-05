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
  Grid,
  Menu,
  Icon,
  Loader,
  Dimmer,
  Segment,
  Divider,
  Message,
  Modal
} from "semantic-ui-react";
import _ from "lodash";
import { addOrRemoveFromArray } from "../generic/arrays";
import { getAccount, updateAccountUpvotes } from "../services/accountservice";
import authservice from "../services/authservice";
import update from "immutability-helper";
import SubmitResource from "./submitres";
import Signup from "./signup";
import Login from "./login";
import { Helmet } from "react-helmet";

class TopicPage extends Component {
  state = {
    isLoading: true,
    filterType: "Books",
    filterPricing: "",
    loginModal: false,
    signupModal: false,
    submitModal: false
  };

  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  async componentDidMount() {
    const topicname = this.props.match.params.topicname
      .replace(/\b\w/g, l => l.toUpperCase())
      .replace("-", " ");

    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
    window.scrollTo(0, 0);
    // const { _id: userid, upvotes } = this.props.token;
    this.setState({
      isLoading: true,
      topicname,
      filterType: "Books",
      filterPricing: ""
    });
    setTimeout(() => {
      this.setResources(this.props.match.params.topicname);
    }, 500);

    const token = authservice.getCurrentUser();

    if (token && token.accountid) {
      const { data } = await getAccount(token.accountid);
      this.setState({ account: data });
    } else {
      this.setState({ account: { upvotes: "" } });
    }
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
        filterPricing: ""
      });
      setTimeout(() => {
        this.setResources(this.props.match.params.topicname);
      }, 500);
      window.scrollTo(0, 0);
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

  // handleFilterClick = () => {
  //   const filterVisible = !this.state.filterVisible;
  //   this.setState({ filterVisible });
  // };

  handleLabelClick = topic => {
    this.setState({ topicname: topic });
  };

  doSortAndFilter = () => {
    const resources = this.state.resources || [];
    let filtered = resources.filter(r => r.isApproved === "Y");
    const filterType = this.state.filterType || "Books";

    if (filterType.length > 0) {
      filtered = filtered.filter(r => r.type.concat("s") === filterType);
    }

    const filterPricing = this.state.filterPricing || "";

    if (filterPricing.length > 0) {
      filtered = filtered.filter(r => r.pricing === filterPricing);
    }

    let resourcesSorted = filtered;
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
    if (!(account && account._id)) {
      this.setState({ signupModal: true });
      return;
    }

    let accountUpvotes = account.upvotes || [];

    //onPeaceClick -> add 1 to peaceCount of the trail, if user has not peaceMarked in original State,
    //                reduce 1 from peaceCount if user has already peaceMarked in original State
    const counter = accountUpvotes.includes(resource._id) ? -1 : 1;
    resource.upvotes += counter;
    const { resources } = this.state;
    var index = resources.findIndex(r => r._id === resource._id);

    const updatedResources = update(this.state.resources, {
      $splice: [[index, 1, resource]]
    }); // array.splice(start, deleteCount, item1)

    const upvotes = addOrRemoveFromArray(accountUpvotes, resource._id);
    account.upvotes = upvotes;
    this.setState({ account, resources: updatedResources });

    await updateResourceUpvotes(resource._id, resource);
    await updateAccountUpvotes(account._id, upvotes);
  };

  handleIconClose = () => this.setState({ closeIcon: true });

  handleLoginModalClick = () => {
    const loginModal = !this.state.loginModal;
    const signupModal = false;
    this.setState({ loginModal, signupModal });
  };

  handleSignUpClick = () => {
    const signupModal = !this.state.signupModal;
    const loginModal = false;
    this.setState({ signupModal, loginModal });
  };

  handleSubmitClick = () => {
    const submitModal = !this.state.submitModal;
    this.setState({ submitModal });
  };

  render() {
    const {
      account,
      isMobile,

      isLoading,
      topicname,

      submitModal,
      loginModal,
      signupModal,
      closeIcon
    } = this.state;
    let filterType = this.state.filterType || "Books";

    let accountUpvotes = (account && account.upvotes) || [];

    let resourcesFiltered = [];
    if (!isLoading) {
      resourcesFiltered = this.doSortAndFilter();
    }
    // const filterVisible = true;
    // const iconColor = filterVisible ? "blue" : "grey";

    return (
      <React.Fragment>
        <Helmet>
          <title>
            {`${topicname} - Find the Best Apps, Books and Videos on ${topicname}, submitted and upvoted by Betteron community!`}
          </title>
          <meta
            name="description"
            content={`Want to find Apps, Books and Videos that would help you with ${topicname}? Check out these resources maintainted by Betteron community. Pick one based on your preference and learn and practice the tips and tricks to help you on ${topicname}.`}
          />
        </Helmet>
        <NavBar tags={this.props.tags} history={this.props.history}></NavBar>
        <Modal
          size="tiny"
          open={submitModal}
          onClose={() => this.setState({ submitModal: false })}
          closeIcon={closeIcon}
        >
          <SubmitResource
            tags={this.props.tags}
            onIconClose={this.handleIconClose}
          ></SubmitResource>
        </Modal>
        <Modal
          size="tiny"
          open={signupModal}
          onClose={() => this.setState({ signupModal: false })}
        >
          <Signup onLoginModalClick={this.handleLoginModalClick}></Signup>
        </Modal>

        <Modal
          size="tiny"
          open={loginModal}
          onClose={() => this.setState({ loginModal: false })}
        >
          <Login onSignUpClick={this.handleSignUpClick}></Login>
        </Modal>
        <div className="outer-container">
          <Container>
            <Grid columns={2}>
              {!isMobile && <Grid.Column width={1}></Grid.Column>}

              <Grid.Column width={15}>
                <Header as="h1" style={{ paddingTop: "1em" }}>
                  <Header.Content>
                    {topicname}
                    <Header.Subheader>
                      {`Find Books and Apps submitted and voted by
                      betteron Community on the topic of ${topicname}`}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Grid.Column>
            </Grid>

            {/* {isMobile && (
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
            )} */}

            <Grid columns={3} stackable>
              {!isMobile && <Grid.Column width={1}></Grid.Column>}
              <Grid.Column width={4}>
                <Menu
                  vertical={!isMobile}
                  fluid={isMobile}
                  widths={isMobile ? 2 : 1}
                  color="blue"
                  size="large"
                >
                  <Menu.Item
                    active={filterType === "Books"}
                    onClick={() => this.setState({ filterType: "Books" })}
                  >
                    <span>
                      Books &nbsp;
                      <Icon name="leanpub" size="large"></Icon>
                    </span>
                  </Menu.Item>
                  <Menu.Item
                    active={filterType === "Apps"}
                    onClick={() => this.setState({ filterType: "Apps" })}
                  >
                    <span>
                      Apps &nbsp;
                      <Icon name="mobile alternate" size="large"></Icon>
                    </span>
                  </Menu.Item>
                </Menu>
                {/* <Checkbox
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
                        <br></br> */}
                {/* <Checkbox
                          label="Courses"
                          value="Courses"
                          checked={filterType === "Courses"}
                          onChange={this.checkboxChangeHandler}
                          name="Type"
                        ></Checkbox> */}

                {/* <Menu.Item
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
                      </Menu.Item> */}
                {/* </div> */}
              </Grid.Column>

              <Grid.Column width={8}>
                {/* {!isMobile && ( */}
                <div
                  style={{
                    padding: "10px",
                    border: "solid 1px rgba(34,36,38,.15)",
                    background: "rgba(34,36,38,.1)",
                    fontSize: "15px"
                  }}
                >
                  {`Most Upvoted ${filterType} on ${topicname} `}
                </div>
                {/* )} */}

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
                    <p>
                      This topic does not have any resources yet. If there are
                      any relevant resources in this topic that you would like
                      to share with others, please feel free to
                      <span
                        onClick={() => this.setState({ submitModal: true })}
                        className="pointer underline noSelect"
                      >
                        submit a resource.
                      </span>
                    </p>
                  </Message>
                )}
                {resourcesFiltered.map(r => (
                  <ResourceItem
                    key={r._id}
                    resource={r}
                    history={this.props.history}
                    liked={accountUpvotes.includes(r._id)}
                    onUpvoteClick={this.handleUpvoteClick}
                    isMobile={isMobile}
                    topicname={topicname}
                  />
                ))}
              </Grid.Column>
            </Grid>
          </Container>
          <Divider hidden></Divider>
        </div>
      </React.Fragment>
    );
  }
}

export default TopicPage;
