import React, { Component } from "react";
import { Segment, Modal } from "semantic-ui-react";
import ContactUs from "./contactus";

class Footer extends Component {
  state = {};
  render() {
    const { submitModal } = this.state;

    return (
      <React.Fragment>
        <Modal
          size="tiny"
          open={submitModal}
          onClose={() => this.setState({ submitModal: false })}
          closeIcon
        >
          <ContactUs
            formtype={this.state.formtype}
            messagetype={this.state.messagetype}
            onIconClose={this.handleIconClose}
          ></ContactUs>
        </Modal>
        <Segment basic textAlign="center">
          {/* <Link to="/aboutus">
            <span className="footer-menu noSelect">About us</span>
          </Link> */}
          <span
            className="footer-menu noSelect"
            onClick={() =>
              this.setState({
                submitModal: true,
                formtype: "Please send your feedback",
                messagetype: "feedback",
              })
            }
          >
            Feedback
          </span>
          {/* <span
            className="footer-menu noSelect"
            onClick={() =>
              this.setState({
                submitModal: true,
                formtype: "Contact Us",
                messagetype: "message"
              })
            }
          >
            Contact us
          </span> */}
        </Segment>
      </React.Fragment>
    );
  }
}

export default Footer;
