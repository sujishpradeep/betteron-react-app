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
import { login, logingoogle } from "../services/authservice";
import { Link } from "react-router-dom";
var _ = require("lodash");

class Login extends Component {
  state = {
    user: { email: "", password: "" },
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
    try {
      await login(this.state.user);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.email =
          "We couldn’t find an account matching the email and password you entered. Please check your email and password and try again.";
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

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <Modal.Header>
          <Header as="h1" textAlign="center">
            Welcome back
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
                <Message color="red" className="tal">
                  {errors.email}
                </Message>
              )}
              <Form>
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
                  Login
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
              Don't have an account?
              <span
                className="pointer "
                style={{
                  color: "#007aff",
                  fontSize: "14px",
                  paddingLeft: "5px"
                }}
                onClick={this.props.onSignUpClick}
              >
                Sign Up
              </span>
            </div>
          </div>
        </Modal.Content>
      </React.Fragment>
    );
  }
}

export default Login;
