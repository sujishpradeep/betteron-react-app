import React, { Component } from "react";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment
} from "semantic-ui-react";
import NavBar from "./navbar";
import Signup from "./signup";

class Blogs extends Component {
  state = {};
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div style={{ background: "white" }}>
        <NavBar tag={this.props.tags} history={this.props.history}></NavBar>

        <Container text style={{ marginTop: "4em", paddingBottom: "7em" }}>
          <Header as="h1" textAlign="">
            <span
              style={{
                fontSize: "35px",
                fontFamily: "Raleway",
                lineHeight: "50px"
              }}
            >
              Resolution for the new decade
            </span>
            <br></br>
            <Header.Subheader>By Sujish Pradeep </Header.Subheader>
          </Header>
          <Divider hidden></Divider>
          <Image
            src={
              "https://blogs-betteron.s3-ap-southeast-2.amazonaws.com/newyear_1.svg"
            }
            size="medium"
            centered
          ></Image>
          <Divider hidden></Divider>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "30px",
              fontFamily: "Raleway"
            }}
          >
            "5 kgs down by the end of the year" - I told my friends. It's what I
            promised myself at the begining of the year and that promise stares
            back at me now, furiously!! It's just a month left. Had I improved?
            Well honestly, a bit! But that's not what this post is about. You
            probably have read about it earlier - The goal should never be to
            lose a certail weight, Goal should be to live a healthy lifestyle!
            Just like the weight loss theory, it's important for all of us to
            have a broad Personal Development plan.
          </p>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "30px",
              fontFamily: "Raleway"
            }}
          >
            Since the new year is just around the corner, the question we should
            be asking ourselves is not that where would you like to see
            yourselves by the end of the year. But, where would you like to see
            yourselves by the end of the decade. Seems far? Well not really -
            Just think of where you were a decade back and it would just remind
            you how time flies. The first thought that would come to my mind if
            I am asked to plan for a decade is it's absurd - How would I know
            where I would be in another 10 years. That's true - You would be in
            a different place in 10 years. But it's much more easier to plan on
            how much of a better person you can be in another 10 years. I will
            cite some examples!
          </p>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "30px",
              fontFamily: "Raleway"
            }}
          >
            Think of something which you have always wanted to do. Say learn
            playing a violin or learn and perform new dance that you loved or
            start the business you want to do! If you have a general direction
            on where you want to go, the start taking small steps. You can write
            your goals/plan in a journal. The first step - Yes, It's learning!
          </p>
          <p
            style={{
              fontSize: "18px",
              lineHeight: "30px",
              fontFamily: "Raleway"
            }}
          >
            Step 2 - Planning. Although all of us agree we can't precision plan
            anything for 10 days, lest forget a decade. We need to again have a
            broad plan as to how you achieve you 10 year goal. For example - If
            your plan is to speak fearlessly in front of 100+ audience, probably
            you need to start with reading blogs, watching videos or books on
            public speaking. May be the next step can be to raise your hand when
            your team meets up next time to decide on who will do the project
            demonstration
          </p>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "30px",
              fontFamily: "Raleway"
            }}
          >
            The last but not the least- It's practice. We have plenty of tools
            out there which would help you do that. Make use of the resources.
            Make use of online tutors.
          </p>

          <p
            style={{
              fontSize: "18px",
              lineHeight: "30px",
              fontFamily: "Raleway"
            }}
          >
            So this Jan 1st - Let's have vow our resolution for the New{" "}
            <strike> Year </strike> Decade!
          </p>
        </Container>
      </div>
    );
  }
}

export default Blogs;
