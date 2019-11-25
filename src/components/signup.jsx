import Login from "./login";
import React, { Component } from "react";
import {
  Form,
  Divider,
  Segment,
  Message,
  Modal,
  Button,
  Header
} from "semantic-ui-react";

import GoogleLogin from "react-google-login";
import { signUp, logingoogle } from "../services/authservice";
import { Link } from "react-router-dom";
const Joi = require("joi");

var _ = require("lodash");

class Signup extends Component {
  state = {
    user: { fullname: "", email: "", password: "" },
    errors: {},
    redirectUser: false
  };

  responseGoogle = async response => {
    const token = JSON.stringify(response.tokenObj.id_token);
    localStorage.setItem("gtoken", token);
    this.setState({ redirectUser: true });

    try {
      const user = {};
      user.email = response.profileObj.email;
      user.password = token;
      user.loginmethod = "gmail";
      user.fullname = response.profileObj.name;
      await logingoogle(user);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  handleSubmit = async () => {
    const { error } = this.validateUser();

    const errors = {};

    if (error) {
      for (let item of error.details) errors[item.path[0]] = item.message;
    }

    this.setState({ errors: errors });
    if (error) {
      return;
    }

    try {
      const { user } = this.state;
      user.loginmethod = "email";
      await signUp(user);
      window.location = `/`;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleChange = (event, { name, value }) => {
    if (this.state.user.hasOwnProperty(name)) {
      let { user } = this.state;
      user[name] = value;
      this.setState({ user });
    }
  };

  schema = Joi.object().keys({
    fullname: Joi.string()
      .required()
      .error(() => {
        return {
          message: `Name can't be blank`
        };
      }),
    email: Joi.string()
      .email()
      .required()
      .error(err => {
        return {
          message: "Invalid email"
        };
      }),
    password: Joi.string()
      .min(6)
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.type) {
            case "any.empty":
              err.message = "Password can't be blank";
              break;
            case "string.min":
              err.message = `Password is too short (Minimum is ${err.context.limit} characters)`;
              break;
            default:
              break;
          }
        });
        return errors;
      }),

    loginmethod: Joi.string().optional()
  });

  validateUser = () => {
    const { user } = this.state;

    const options = { abortEarly: false };
    return Joi.validate(user, this.schema, options);
  };

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <Modal.Header>
          <Header as="h1" textAlign="center">
            Welcome to Betteron
            <Header.Subheader>
              <span
                style={{
                  fontSize: "14px",
                  color: "#999",
                  letterSpacing: "0.6px"
                }}
              >
                Sign up to submit resources, upvote resources and more.
              </span>
            </Header.Subheader>
          </Header>
          <div
            style={{
              textAlign: "center",
              fontSize: "14px",
              color: "#999",
              letterSpacing: "1px",
              marginTop: "10px",
              fontWeight: "300"
            }}
          >
            CONTINUE WITH
          </div>
        </Modal.Header>
        <Modal.Content>
          <div style={{ textAlign: "center" }}>
            <GoogleLogin
              clientId="815040356813-cu6jblg136af2tfbju6amps6eip5g1gh.apps.googleusercontent.com"
              render={renderProps => (
                <button
                  class="loginBtn loginBtn--google"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                >
                  Sign in with Google
                </button>
              )}
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            <Divider horizontal>or</Divider>

            <form className="login" onSubmit={this.handleSubmit}>
              {!_.isEmpty(errors) && (
                <Message
                  color="red"
                  header="Error"
                  list={Object.values(errors)}
                />
              )}
              <Form>
                <Form.Field>
                  <Form.Input
                    placeholder="Full Name"
                    name="fullname"
                    onChange={this.handleChange}
                    icon="user"
                    iconPosition="left"
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    placeholder="Email"
                    name="email"
                    onChange={this.handleChange}
                    icon="mail"
                    iconPosition="left"
                  />
                </Form.Field>
                <Form.Field>
                  <Form.Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    icon="lock"
                    iconPosition="left"
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Button
                  type="submit"
                  color="blue"
                  onClick={event => {
                    this.handleSubmit();
                  }}
                  fluid
                >
                  <span
                    style={{
                      letterSpacing: "0.6px"
                    }}
                  >
                    Create Account
                  </span>
                </Button>
              </Form>
            </form>
            <div
              style={{
                fontSize: "12px",
                color: "#999",
                letterSpacing: "0.6px",
                paddingTop: "10px"
              }}
            >
              Already have an account?
              <span
                className="pointer "
                style={{
                  color: "#007aff",
                  fontSize: "14px",
                  paddingLeft: "5px"
                }}
                onClick={this.props.onLoginModalClick}
              >
                Login
              </span>
            </div>
          </div>
        </Modal.Content>
      </React.Fragment>
    );
  }
}

export default Signup;
