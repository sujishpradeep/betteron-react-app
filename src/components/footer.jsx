import React from "react";
import { Segment } from "semantic-ui-react";

const Footer = () => {
  return (
    <Segment basic textAlign="center">
      <span className="footer-menu">Home</span>
      <span className="footer-menu">About us</span>
      <span className="footer-menu">Feedback</span>
      <span className="footer-menu">Contact us</span>
    </Segment>
  );
};

export default Footer;
