import React, { Component } from "react";

import { Form, Message, Modal, Button, Header, Label } from "semantic-ui-react";
import { addFeedback } from "../services/feedbackservice";

const Joi = require("joi");

class ContactUs extends Component {
  state = {
    contactus: {
      name: "",
      email: "",
      message: "",
      type: "default",
    },
    errors: {},
    values: [],
    isSearchLoadings: [],
    isLoading: false,
    successMessage: false,
  };

  componentDidMount = () => {
    this.setState({ successMessage: false });
  };

  handleSubmit = async () => {
    const { error } = this.validateFedback();
    const errors = {};

    if (error) {
      for (let item of error.details) errors[item.path[0]] = item.message;
    }

    this.setState({ errors: errors });
    if (error) {
      return;
    }
    try {
      const { contactus } = this.state;
      contactus.type = this.props.messagetype;

      await addFeedback(contactus);

      this.setState({ isLoading: true });

      setTimeout(() => {
        this.setState({ successMessage: true });
        const contactus = {
          name: "",
          email: "",
          message: "",
          type: "default",
        };
        this.setState({ isLoading: false, contactus, tags: [] });
      }, 1000);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = "Invalid entry, Please try again";
        this.setState({ errors });
      }
    }
  };

  validateFedback = () => {
    const { contactus } = this.state;
    const options = { abortEarly: false };
    return Joi.validate(contactus, this.schema, options);
  };

  handleChange = (event, { name, value }) => {
    if (this.state.contactus.hasOwnProperty(name)) {
      let { contactus } = this.state;
      contactus[name] = value;
      this.setState({
        contactus,
        errors: {
          ...this.state.errors,
          name: "",
        },
      });
    }
  };

  schema = Joi.object().keys({
    name: Joi.string()
      .optional()
      .error(() => {
        return {
          message: `Name is empty`,
        };
      }),

    email: Joi.string()
      .optional()
      .email()
      .error((err) => {
        return {
          message: "Email is invalid",
        };
      }),

    message: Joi.string()
      .required()
      .error(() => {
        return {
          message: `Message is empty`,
        };
      }),

    type: Joi.string()
      .optional()
      .error(() => {
        return {
          message: `Invalid type`,
        };
      }),
  });

  render() {
    const { successMessage, contactus } = this.state;

    const { errors } = this.state || {};

    const subtext =
      this.props.messagetype === "message"
        ? "Please feel free to ask us if you have any questions"
        : "This is a personal / hobby project. ";

    return (
      <React.Fragment>
        <Modal.Header>
          <Header as="h1" textAlign="center">
            {this.props.formtype}
          </Header>
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#999",
              marginTop: "1px",
              fontWeight: "300",
            }}
          >
            {subtext}
          </div>
        </Modal.Header>
        <Modal.Content>
          {successMessage && (
            <React.Fragment>
              <Message
                success
              >{`Thanks for your ${this.props.messagetype}. Our team will review it and get back to you as soon as we can. We appreciate your time on reaching out to us, Thanks again!`}</Message>
            </React.Fragment>
          )}
          <div style={{ textAlign: "left" }}>
            <Form>
              <Form.Field>
                <Form.Input
                  placeholder="Your Name"
                  name="name"
                  icon="user"
                  iconPosition="left"
                  onChange={this.handleChange}
                  value={contactus.name}
                />
                {errors["name"] && (
                  <Label color="orange" basic pointing="above">
                    Name is blank
                  </Label>
                )}
              </Form.Field>

              <Form.Field>
                <Form.Input
                  placeholder="Email"
                  icon="mail"
                  iconPosition="left"
                  name="email"
                  onChange={this.handleChange}
                  value={contactus.email}
                />
                {errors["email"] && (
                  <Label color="orange" basic pointing="above">
                    Email is invalid
                  </Label>
                )}
              </Form.Field>

              <Form.Field>
                <Form.TextArea
                  placeholder={`Enter your message here`}
                  name="message"
                  onChange={this.handleChange}
                  value={contactus.message}
                />
                {errors["message"] && (
                  <Label color="orange" basic pointing="above">
                    Message is blank
                  </Label>
                )}
              </Form.Field>

              <br></br>

              <Button
                type="submit"
                color="blue"
                onClick={(event) => {
                  this.handleSubmit();
                }}
                fluid
                loading={this.state.isLoading}
              >
                Submit
              </Button>
            </Form>
          </div>
        </Modal.Content>
      </React.Fragment>
    );
  }
}

export default ContactUs;
