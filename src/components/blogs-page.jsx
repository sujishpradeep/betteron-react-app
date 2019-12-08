import React, { Component } from "react";
import { Container, Divider, Header, Image, Button } from "semantic-ui-react";
import NavBar from "./navbar";
import aboutus from "../images//aboutus.png";

class BlogsPage extends Component {
  state = {};
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  handleClickTwitter = () => {
    window.open("https://twitter.com/betteron_", "_blank");
  };

  handleClickFacebook = () => {
    window.open("https://twitter.com/betteron_", "_blank");
  };

  render() {
    return (
      <React.Fragment>
        <NavBar tags={this.props.tags} history={this.props.history}></NavBar>

        <div className="outer-container">
          <Container text style={{ marginTop: "2em", paddingBottom: "2em" }}>
            <Header as="h1" textAlign="">
              <span
                style={{
                  fontSize: "1.3em",
                  fontFamily: "Raleway",
                  lineHeight: "50px"
                }}
              >
                Resolution for the new decade
              </span>
              <br></br>
              <Header.Subheader>December 5th, 2019 </Header.Subheader>
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
                fontSize: "1.1em",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              "5 kgs down by the end of the year" - That's exactly what Liam had
              promised himself at the beginning of the year. Now it's just less
              than a month left for the day of judgment and that promise stares
              back at him now, furiously. Had Liam improved on his physique?
              Well, not really, and that's not what this post is about. This
              post is about something more important and let's start with a
              popular weight-loss mantra - "The goal should never be to lose a
              certain weight, Goal should always be to live a healthy
              lifestyle". The reason why this theory is getting more acceptance
              is that these days most of us focus too much on the short term
              checkpoints in our personal goals giving little or less importance
              to the path or the direction we are moving on. But, is it
              necessary to have a slightly long-term vision, (say a 10-year
              vision) for yourself? Let's analyze.
            </p>
            <Image src={aboutus} size="huge" circular centered></Image>

            <p
              style={{
                fontSize: "1.1em",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              <b>Planning for a decade </b> - The first thought that would come
              to our minds if we are asked to plan for a decade is that it's
              going to be very unpredictable and unrealistic to do so. That's
              true - All of us would be in a different stage in our lives. Our
              approach to life, wealth and well-being would have changed
              drastically in the next 10 years. But still, it's wise to have a
              plan and in this article, we would like to offer a few broad tips
              on how to have a long term vision by answering 3 simple questions
              - What, How and When?
            </p>
            <p
              style={{
                fontSize: "1.1em",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              So, let's start with the first question - The most important one.
              What's a long term vision? How do we arrive at our vision from our
              list of goals? As with the weight loss theory, any milestone
              focussed activity (Losing a certain weight by the end of the year)
              can be categorized as short-term or long-term goals. For example-
              Yuan wants to learn to play the violin and perform in a stage of
              100+ audience. This can be thought of as a short-term goal and
              long-term goal with 2 milestones (Learning to play the violin and
              Performing in a stage of 100+ audiences). So, what's the long term
              vision of Yuan? In Yuan's case, his long-term vision could be - "
              I want to be a musician and the music I create should be able to
              communicate the right emotions with all of my audience". Well,
              figuring out out vision statement is fairly simple. Just ask
              yourselves on "What's the purpose of your short-term or long-term
              goals". And that's it - You would have arrived at your vision
              statement. In most cases, you would see it would fit into the
              below 2 point checklist.
              <ul id="lists">
                <li>
                  Your long term vision would be something that's not measurable
                  in numbers.
                </li>
                <li>Your instincts should agree with your vision statement.</li>
              </ul>
            </p>

            <p
              style={{
                fontSize: "1.1em",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              Now comes the second important question - How do you achieve it?
              One of the perks of the long term visions is you have all the time
              in the world to achieve it. But, what can be your first step? Well
              before we act on our vision, it's necessary that we plan it out.
              Give yourselves some time to think about your vision,
              understanding your vision and how you are going to achieve it. Can
              you visualize it by breaking it into small iterable short term
              goals and set a direction? Let's see how Yuan split his long term
              vision into small actionable iterations.
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
              This list is bound to change and can be revisited later in the
              course of your journey. But, what you are doing here is{" "}
              <b>visualizing your journey </b>and it's vital because it
              <b> gives a purpose to all your goals</b>.
            </p>
            <p
              style={{
                fontSize: "1.1em",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              Before moving to the next point (on when to start acting on your
              vision) let's take a leap forward and think on how will you know
              that your long term plan is successful? Your long term goal is not
              really measurable and a very valid question that arises is that
              how will you know whether your long term vision is successful or
              not? And that's where the 2nd point in the checklist comes in.
              Your instinct(Inner self) would be the savior! If you have planned
              on your vision, executed the small incremental actions on your
              vision,{" "}
              <b>
                your instincts will know that you are moving in the right
                direction
              </b>
              . If you can convince yourself that you are moving in the right
              direction, well then success would just follow! If your long-term
              vision is to live a healthy lifestyle - Maybe you can achieve it
              before you have got that "Shed all your calories". You shall start
              eating healthier, start sleeping more and exercise regularly
              because as per your vision, your focus is not just on shedding
              calories and flat abs, but on living a healthy lifestyle.
            </p>
            <p
              style={{
                fontSize: "1.1em",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              Now that all the important points have been made above - Let's
              come to the last point. When to start planning or acting on your
              vision? Well, the New Year eve is right around the corner, in
              another few weeks and this New Year is special (Because it's a
              start of a new decade). For those of you who already have a long
              term Personal, Professional and Financial long term plans, it
              could be an opportunity to review your journey and pat your back
              for how well you have fared till now. If you feel you need to
              change your execution style, it's a good time to redraw your
              priorities. And for those who want to start planning and executing
              a long term vision now - Well this is the perfect time of the year
              to make a resolution this time, not just for a New Year but also
              for a New Decade!
            </p>

            <p
              style={{
                fontSize: "1.1em",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              Thanks for reading.
              <br></br>
            </p>
            <Divider></Divider>
            <p
              style={{
                fontSize: "1.1em",
                lineHeight: "30px",
                fontFamily: "Raleway"
              }}
            >
              This article is published by Betteron Blogs. If you liked the
              article, and if you would listen to us more - please click the
              link and let's get connected on twitter. <br></br>
              <Button
                inline
                circular
                color="twitter"
                icon="twitter"
                size="big"
                onClick={this.handleClickFacebook}
              />{" "}
              {/* <Button
                inline
                circular
                color="facebook"
                icon="facebook"
                size="big"
                onClick={this.handleClickTwitter}
              />*/}
            </p>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default BlogsPage;
