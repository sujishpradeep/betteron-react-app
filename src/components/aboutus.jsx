import React, { Component } from "react";
import aboutus from "../images//aboutus.png";
import ContactUs from "./contactus";
import {
  Image,
  Icon,
  Segment,
  Container,
  Header,
  Divider,
  Modal
} from "semantic-ui-react";
import NavBar from "./navbar";

class AboutUs extends Component {
  state = {};
  render() {
    const { submitModal } = this.state;
    return (
      <React.Fragment>
        <NavBar></NavBar>
        <Modal
          size="tiny"
          open={submitModal}
          onClose={() => this.setState({ submitModal: false })}
          closeIcon
        >
          <ContactUs
            formtype="Contact Us"
            messagetype="message"
            onIconClose={this.handleIconClose}
          ></ContactUs>
        </Modal>
        <div className="outer-container">
          <Container text>
            <Divider hidden></Divider>
            <Segment basic textAlign="center">
              <div className=" main-big-font centre-font inline pointer noSelect">
                betteron
                <Icon name="chevron circle up"></Icon>
              </div>
            </Segment>
            <Icon name="quote left" size="large"></Icon>

            <span style={{ fontSize: "34px", fontFamily: "Raleway" }}>
              The best investment you can make is in yourself{" "}
            </span>
            <Icon name="quote right" size="large"></Icon>
            <p
              style={{
                fontSize: "24px",
                fontFamily: "Raleway",
                textAlign: "right"
              }}
            >
              - Warren Buffet
            </p>
            <Divider hidden></Divider>

            <Divider hidden></Divider>
            <Image src={aboutus} size="huge" circular centered></Image>
            <Header as="h1" textAlign="">
              <span style={{ fontSize: "35px", fontFamily: "Raleway" }}>
                About us
              </span>
            </Header>
            <Divider hidden></Divider>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              Personal development takes place over the course of a person's
              entire life. Making small and continuous improvement in growing
              yourself scales you up in all spheres, opens up new avenues of
              growth and improves your quality of life immensely.
              <br></br>
              <br></br>
              At Betteron, we believe that the best way to develop yourself is
              by following the Learn, Plan and Practice method. Although there
              are plenty of tools out there - Apps, Books, Videos and many more
              resources which help you do that, we feel that the knowledge is
              scattered on the web making it difficult for one to find the
              resources that really matters. So at Betteron, we aim to organize
              these available tools and categorize them based on user
              preferences to make it easy for you to find what you need. We
              would also be writing on quick tips, product reviews and relevant
              news in the personal development space that adds value to you in
              your journey to get better.
            </p>
            <Divider hidden></Divider>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              We are new and evolving. If you have any suggestions on how to
              make Betteron platform more useful for you,
              <span
                onClick={() => this.setState({ submitModal: true })}
                className="pointer noSelect primary"
                style={{ fontWeight: 600 }}
              >
                &nbsp;do get in touch
              </span>
            </p>
            <Divider hidden></Divider>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default AboutUs;
