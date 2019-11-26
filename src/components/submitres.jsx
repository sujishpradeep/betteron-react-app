import React, { Component } from "react";

import {
  Form,
  Divider,
  Message,
  Modal,
  Button,
  Header,
  Search,
  Radio,
  Label,
  Container,
  Icon
} from "semantic-ui-react";
import GoogleLogin from "react-google-login";
import { addResources } from "../services/resourceservice";
import SearchTag from "./searchtags";

const Joi = require("joi");
var _ = require("lodash");
class SubmitResource extends Component {
  state = {
    addresource: {
      name: "",
      url: "default",
      type: "Book",
      pricing: "Free",
      appstore: "default",
      ioslink: "default",
      gplaylink: "default",
      upvotes: "0",
      isApproved: "N",
      tags: "  "
    },
    tags: [],
    errors: {},
    values: [],
    isSearchLoadings: [],
    isLoading: false,
    successMessage: false
  };

  componentDidMount = () => {
    this.setState({ successMessage: false });
  };

  handleSubmit = async () => {
    const { error } = this.validateResource();

    console.log("error", error);
    const errors = {};

    if (error) {
      for (let item of error.details) errors[item.path[0]] = item.message;
    }

    this.setState({ errors: errors });
    if (error) {
      return;
    }
    try {
      console.log("this.state", this.state);
      const { addresource } = this.state;
      addresource.tags = this.state.tags.toString();

      await addResources(addresource);

      this.setState({ isLoading: true });

      setTimeout(() => {
        this.setState({ successMessage: true });
        const addresource = {
          name: "",
          url: "default",
          type: "Book",
          pricing: "Free",
          appstore: "default",
          ioslink: "default",
          gplaylink: "default",
          upvotes: "0",
          isApproved: "N",
          tags: "  "
        };
        this.setState({ isLoading: false, addresource, tags: [] });
        this.props.onIconClose();
      }, 1000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = "Invalid entry, Please try again";
        this.setState({ errors });
      }
    }
  };

  handleNewTagAdd = tag => {
    this.setState({
      tags: [...this.state.tags, tag],
      errors: {
        ...this.state.errors,
        tags: ""
      }
    });
  };

  validateResource = () => {
    const { addresource } = this.state;
    addresource.tags = this.state.tags.toString();
    console.log("addresource 10", addresource);

    const options = { abortEarly: false };
    return Joi.validate(addresource, this.schema, options);
  };

  handleSearchClick = () => {
    if (this.state.isMobile) {
      const search = !this.state.search;
      const visible = false;
      this.setState({ search, visible });
    }
  };

  handleChange = (event, { name, value }) => {
    if (this.state.addresource.hasOwnProperty(name)) {
      let { addresource } = this.state;
      addresource[name] = value;
      this.setState({
        addresource,
        errors: {
          ...this.state.errors,
          name: ""
        }
      });
    }
  };

  schema = Joi.object().keys({
    name: Joi.string()
      .required()
      .error(() => {
        return {
          message: `Title is empty`
        };
      }),

    tags: Joi.string()
      .optional()
      .error(err => {
        return {
          message: "Enter atleast one tag"
        };
      }),

    pricing: Joi.string()
      .required()
      .error(() => {
        return {
          message: `Select a Pricing`
        };
      }),

    url: Joi.string()
      .optional()
      .error(() => {
        return {
          message: `URL is required`
        };
      }),

    type: Joi.string()
      .required()
      .error(() => {
        return {
          message: `Enter the resource type`
        };
      }),
    appstore: Joi.string().optional(),
    ioslink: Joi.string().optional(),
    gplaylink: Joi.string().optional(),
    isApproved: Joi.string().optional(),
    upvotes: Joi.string().optional()
  });

  handleRadioChange = (event, { name, value }) => {
    if (this.state.addresource.hasOwnProperty(name)) {
      let { addresource } = this.state;
      addresource[name] = value;

      this.setState({ addresource });
    }
  };

  removeTag = t => {
    const tags = [...this.state.tags]; // make a separate copy of the array
    const index = tags.indexOf(t);
    if (index !== -1) {
      tags.splice(index, 1);
      this.setState({ tags });
    }
  };

  render() {
    const { successMessage, addresource } = this.state;

    const { errors } = this.state || {};
    const { tags } = this.state || [];

    const filteredTags = this.props.tags.filter(
      t => !this.state.tags.includes(t.name)
    );

    console.log("this.state.isLoading", this.state.isLoading);

    const disabled = !_.isEmpty(errors);

    return (
      <React.Fragment>
        <Modal.Header>
          <Header as="h1" textAlign="center">
            Submit a Resource
          </Header>
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#999",
              marginTop: "1px",
              fontWeight: "300"
            }}
          >
            Feel free to share any Personal Deveopment Resource you have found
            useful
          </div>
        </Modal.Header>
        <Modal.Content>
          {successMessage && (
            <React.Fragment>
              <Message success>
                Thanks for submitting the resource. Our moderators would
                evaluate your submission and have it published soon.
              </Message>
              <Header as="h4" textAlign="center">
                Make a New Submission
              </Header>
            </React.Fragment>
          )}
          <div style={{ textAlign: "left" }}>
            <form className="login">
              <Form>
                <Form.Field>
                  <label> Title</label>
                  <Form.Input
                    placeholder="Resoure Title"
                    name="name"
                    onChange={this.handleChange}
                    value={addresource.name}

                    // icon="window maximize outline"
                    // iconPosition="left"
                  />
                  {errors["name"] && (
                    <Label color="orange" basic pointing="above">
                      Resource Name is blank
                    </Label>
                  )}
                </Form.Field>

                <Form.Field>
                  <label> Topics</label>

                  <div style={{ marginBottom: "5px" }}>
                    {tags &&
                      tags.map((t, i) => (
                        <Label color="blue">
                          {t}
                          <Icon
                            name="delete"
                            onClick={() => this.removeTag(t)}
                          />
                        </Label>
                      ))}
                  </div>

                  <SearchTag
                    tags={filteredTags}
                    onNewTagAdd={this.handleNewTagAdd}
                  ></SearchTag>
                  {errors["tags"] && (
                    <Label color="orange" basic pointing="above">
                      No topics are selected
                    </Label>
                  )}

                  {/* <div style={{ textAlign: "center" }}>
                      <Button
                        color="grey"
                        basic
                        circular
                        onClick={() =>
                          this.setState({ totalTags: totalTags + 1 })
                        }
                        icon="plus"
                      ></Button>
                    </div> */}
                </Form.Field>

                {/* {errors["tags"] && (
                  <Label basic color="red" pointing="above">
                    {errors["tags"]}
                  </Label>
                )} */}

                {/* <div size="large" style={{ textAlign: "left" }}>
                  <span style={{ color: "#999" }}>
                    {" "}
                   
                  </span>
                </div> */}
                <Form.Field>
                  <label> URL</label>
                  <Form.Input
                    placeholder=" URL of the Resource (Optional)"
                    name="url"
                    value={addresource.url === "default" ? "" : addresource.url}
                    onChange={this.handleChange}
                    // icon="external alternate"
                    // iconPosition="left"
                  />
                </Form.Field>

                <Form.Group inline>
                  {/* <span size="large" style={{ paddingRight: "200px" }}>
                    Type
                  </span> */}
                  <Form.Field inline>
                    <label> Type</label>
                    <Radio
                      label="Book"
                      name="type"
                      value="Book"
                      checked={this.state.addresource.type === "Book"}
                      onChange={this.handleRadioChange}
                    />
                  </Form.Field>
                  <Form.Field inline>
                    <Radio
                      label="App"
                      name="type"
                      value="App"
                      checked={this.state.addresource.type === "App"}
                      onChange={this.handleRadioChange}
                    />
                  </Form.Field>
                  <Form.Field inline>
                    <Radio
                      label="Course"
                      name="type"
                      value="Course"
                      checked={this.state.addresource.type === "Course"}
                      onChange={this.handleRadioChange}
                    />
                  </Form.Field>
                </Form.Group>

                <Form.Group>
                  {/* <span size="large" style={{ paddingRight: "187px" }}>
                    Pricing
                  </span> */}

                  <Form.Field inline>
                    <label> Pricing</label>
                    <Radio
                      label="Free"
                      name="pricing"
                      value="Free"
                      checked={this.state.addresource.pricing === "Free"}
                      onChange={this.handleRadioChange}
                    />
                  </Form.Field>

                  <Form.Field inline>
                    <Radio
                      label="Paid"
                      name="pricing"
                      value="Paid"
                      checked={this.state.addresource.pricing === "Paid"}
                      onChange={this.handleRadioChange}
                    />
                  </Form.Field>
                </Form.Group>
                <br></br>

                <Button
                  type="submit"
                  color="blue"
                  onClick={event => {
                    this.handleSubmit();
                  }}
                  fluid
                  loading={this.state.isLoading}
                >
                  Submit
                </Button>
              </Form>
            </form>
          </div>
        </Modal.Content>
      </React.Fragment>
    );
  }
}

export default SubmitResource;
