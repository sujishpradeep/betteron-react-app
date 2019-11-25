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
  Label
} from "semantic-ui-react";
import GoogleLogin from "react-google-login";
import { addResources } from "../services/resourceservice";

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
      tags: ""
    },
    errors: {}
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
      await addResources(this.state.addresource);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = "Invalid entry, Please try again";
        this.setState({ errors });
      }
    }
  };

  validateResource = () => {
    const { addresource } = this.state;
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

  handleResultSelect = (e, result) => {
    console.log("result name", result.result.title);
    const { addresource } = this.state;
    addresource.tags = result.result.title;
    const errors = {};
    this.setState({ value: result.result.title, addresource, errors });
    console.log("errors", errors);
  };

  handleSearchChange = (e, { value }) => {
    const initialState = { isSearchLoading: false, results: [], value: "" };
    this.setState({ isSearchLoading: true, value });

    var keys = { name: "title" };

    var tags = this.props.tags.map(function(o) {
      return _.mapKeys(o, function(v, k) {
        return k in keys ? keys[k] : k;
      });
    });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result => re.test(result.title);

      this.setState({
        isSearchLoading: false,
        results: _.filter(tags, isMatch)
      });
    }, 300);
  };

  handleChange = (event, { name, value }) => {
    if (this.state.addresource.hasOwnProperty(name)) {
      let { addresource } = this.state;
      addresource[name] = value;
      this.setState({ addresource });
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
      .required()
      .error(err => {
        return {
          message: "Select a category from the list"
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
      .required()
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
    console.log("name", name, value);
    if (this.state.addresource.hasOwnProperty(name)) {
      let { addresource } = this.state;
      addresource[name] = value;

      this.setState({ addresource });
    }
  };

  render() {
    const { isSearchLoading, results, value } = this.state;
    const { errors } = this.state || {};
    console.log("errors2", errors);
    console.log("tags", this.state.addresource.tags);

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
          <div style={{ textAlign: "center" }}>
            <form className="login">
              <Form>
                <Form.Field>
                  <Form.Input
                    placeholder="Resoure Title"
                    name="name"
                    onChange={this.handleChange}
                    error={errors["name"] || false}
                    // icon="window maximize outline"
                    // iconPosition="left"
                  />
                </Form.Field>

                <Form.Field>
                  <Search
                    input={{ fluid: true, error: errors["tags"] || false }}
                    fluid
                    icon="pink"
                    placeholder="Category"
                    noResultsMessage="Sorry, no results found"
                    loading={isSearchLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, {
                      leading: true
                    })}
                    results={results}
                    value={value}
                    {...this.props}
                  />
                </Form.Field>

                {errors["tags"] && (
                  <Label basic color="red" pointing="above">
                    {errors["tags"]}
                  </Label>
                )}

                {/* <div size="large" style={{ textAlign: "left" }}>
                  <span style={{ color: "#999" }}>
                    {" "}
                   
                  </span>
                </div> */}
                <Form.Field>
                  <Form.Input
                    placeholder=" URL of the Resource (Optional)"
                    name="url"
                    onChange={this.handleChange}
                    // icon="external alternate"
                    // iconPosition="left"
                  />
                </Form.Field>

                <Form.Group inline>
                  <span size="large" style={{ paddingRight: "200px" }}>
                    Type
                  </span>
                  <Form.Field inline>
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

                <Form.Group inline>
                  <span size="large" style={{ paddingRight: "187px" }}>
                    Pricing
                  </span>

                  <Form.Field inline>
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

                <Button
                  type="submit"
                  color="blue"
                  onClick={event => {
                    this.handleSubmit();
                  }}
                  fluid
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
