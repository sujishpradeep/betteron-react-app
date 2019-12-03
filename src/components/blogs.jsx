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
  Segment,
  Button
} from "semantic-ui-react";
import NavBar from "./navbar";
import aboutus from "../images//aboutus.png";

class Blogs extends Component {
  state = {};
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <React.Fragment>
        <NavBar tag={this.props.tags} history={this.props.history}></NavBar>

        <div className="outer-container">
          <Container text style={{ marginTop: "2em", paddingBottom: "7em" }}>
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
              <Header.Subheader>Dec 7th, 2019 </Header.Subheader>
            </Header>
            <Divider hidden></Divider>
            {/* <Image
              src={
                "https://blogs-betteron.s3-ap-southeast-2.amazonaws.com/newyear_1.svg"
              }
              size="medium"
              centered
            ></Image> */}

            <p
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              "5 kgs down by the end of the year" - I told my friends. That's
              what I had promised myself at the begining of the year and that
              promise stares back at me now, furiously!! Now it's just less than
              a month left for the day of judgement. Had I improved on my
              phsyique? Well, not really, but that's not what this post is
              about. This post is about something more important and I would
              start with one of the famous weight loss mantras - "The goal
              should never be to lose a certain weight, Goal should be to live a
              healthy lifestyle!". And that's a fact which takes everyone no
              much time to comprehend, but very tough to follow. Most of us
              focus too much on the short term checkpoints in our personal goals
              giving little or less importance to the path or the direction we
              are moving on. So when is the right to time plan for the long term
              on your personal development? Well, as always - there is no better
              time to start a good thing than today!
            </p>
            <Image src={aboutus} size="huge" circular centered></Image>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              <b>Planning for a decade - </b> The first thought that would come
              to our minds if we are asked to plan for a decade is that it's
              going to be very unpredictable and unrealistic to do so. How would
              we know where we would be in another 10 years? That's true - All
              of us would be in a different stage in our lives. Our approach to
              life, wealth and well being would have changed drastically in the
              next 10 years. But still it's wise to have a plan than having none
              and here we would like to offer a few broad tips on how to have a
              long term vision by answering 3 simple questions - What, How and
              When?
            </p>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              So, let's start with the first question - The most important one.
              What's a long term vision? How do we pick our real long term
              vision from the short term goals? Well, to help you figure it out
              easily, we have got a 3 point checklist.
              <ul id="lists">
                <li>
                  Your long term vision should not be measurable in numbers.
                </li>
                <li>
                  You can have it writtern from the perspective of others. (Your
                  family/friends/audience or customers)
                </li>
                <li>Your instincts should agree with what your decide on.</li>
              </ul>
              As with the weight loss theory, any milestone focussed activity
              (Losing a certain weight by the end of the year) can be
              categorized as short term plan. For example- Yuan wants to learn
              to play violin and perform in a stage of 100+ audience. This can
              be thought of as a 2 short-term goals with 2 milestones. Milestone
              is to learn violin and milestone 2 is to perform in a stage of
              100+ audience, both of which would require it's own time, effort
              and skillsets. Now let's do a guess work for Yuan on what a long
              term goal could be? Well - It could be "I want to be a musician
              and the music I create can communicate the right emotions to my
              listeners ". As you can see, it fits into the 3 point checklist
              rightly (Not measurable in numbers, Seen from the perspective of
              his audience). Now it's time for you to stop for a moment and
              think about your long term goals. Well - You can even have
              multiple long term goals but it's good to figure out one before
              continuing.
            </p>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              Now comes the second important question - How do I acieve it? The
              perils of the long term visions is you have all the time in the
              world to achieve it. So what can be the first step? Well before we
              act on our vision, we need to plan it out. Give some time to think
              about your vision, understanding your vision and how you are going
              to achieve it. Can you split the long term goal into small
              iterable short term goals and set a direction? Let's see how Yuan
              split his long term vision into small actionable iterations.
              <ul id="lists">
                <li>Learn my first song and upload the videos on Youtube</li>
                <li>
                  Get into a local band as a violinist. Grow with the band and
                  improve the playing style.
                </li>
                <li>Perform in a stage of 100+ audience</li>
                <li>Start teaching music to newbies</li>
                <li>Create and record my own music</li>
              </ul>
              This list is bound to change and can be revisited later on the
              course of your journey. But, what your are doing here is
              visualizing your journey and it's vital because it gives a purpose
              to all your short term goals.
            </p>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              Before I start talking on when to start acting on your vision,
              let's take a look forward and think on how will you know that you
              long term plan is succesful? Your long term goal is not really
              measurable and it's more about others. There is a very valid
              question that arise now. How will you know that you have long term
              vision is succesful? And that's where the 3rd point in checklist
              comes in. Your instinct(Inner self) would be the savior! If you
              have planned on your vision, executed the small incremental
              actions on your vision your instincts will know that you are
              moving in the right direction. It's not going to be the net
              revenue, number of customers you aquire (If you are in a
              business), the hike in your salary (If you are a working
              professional), or anything else that would say that you are
              succesful in your long term vision. If you can convince yourself
              that you are moving in the right direction, well then you have
              truly moved ahead!
            </p>
            <p
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              Now that I have made all the points to be made - Let me come to
              the last point. When to start? The New Year eve is right around
              the corner, in another few weeks and this New Year is special
              (Because it's a start of a new decade). Well for those of you who
              already have a long term personal, professional and financial long
              term plans, it could be an oppurtinity to review your journey and
              pat your back for how well you have fared till now. And if you
              feel you need to change a bit on your executions, it's a good time
              to plan for a new course. And for those who want to start planning
              and executing a long term vision now - Well this is the perfect
              time of the year to make a resoulution this time, not just for a
              New Year but also for a New Decade!
            </p>
            <Divider></Divider>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              Thanks for reading! We are new and we need your support in growing
              the space. If you liked the article, and would like to listen more
              - please click the link with us on twitter.{" "}
              <Button
                inline
                circular
                color="twitter"
                icon="twitter"
                size="big"
              />{" "}
            </p>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default Blogs;
