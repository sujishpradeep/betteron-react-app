import React, { Component } from "react";
import {
  Header,
  Form,
  Container,
  Item,
  Checkbox,
  Grid,
  Menu,
  Message,
  Segment,
  Label,
  Icon,
  Statistic
} from "semantic-ui-react";

class TopicPage extends Component {
  state = {};
  ColorForm = (
    <Form>
      <Form.Group grouped>
        <Form.Checkbox label="Red" name="color" value="red" />
        <Form.Checkbox label="Orange" name="color" value="orange" />
        <Form.Checkbox label="Green" name="color" value="green" />
        <Form.Checkbox label="Blue" name="color" value="blue" />
      </Form.Group>
    </Form>
  );

  SizeForm = (
    <Form>
      <Form.Group grouped>
        <Form.Radio label="Small" name="size" type="radio" value="small" />
        <Form.Radio label="Medium" name="size" type="radio" value="medium" />
        <Form.Radio label="Large" name="size" type="radio" value="large" />
        <Form.Radio label="X-Large" name="size" type="radio" value="x-large" />
      </Form.Group>
    </Form>
  );

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };
  render() {
    const { value, options, activeIndex, activeItem } = this.state;
    return (
      <div className="outer-container ">
        <Container>
          <Segment basic>
            <Header as="h1">
              <Header.Content>
                Personal Finance
                <Header.Subheader>
                  Find Apps, Books and Courses submitted and voted by Upstacks
                  Community to help you with Personal Finance
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Segment>

          <Grid columns={2} stackable>
            <Grid.Column width={4}>
              <Menu vertical>
                <div style={{ background: "rgb(248, 248, 249);" }}>
                  <Menu.Item
                    name="promotions"
                    active={activeItem === "promotions"}
                    onClick={this.handleItemClick}
                  >
                    <Header as="h4">Type of Resource</Header>
                    <Checkbox
                      label="Apps"
                      value="Apps"
                      checked={value === "Apps"}
                      onChange={this.handleChange}
                    ></Checkbox>
                    <br></br>
                    <br></br>
                    <Checkbox
                      label="Books"
                      value="Books"
                      checked={value === "Books"}
                      onChange={this.handleChange}
                    ></Checkbox>
                    <br></br>
                    <br></br>
                    <Checkbox
                      label="Courses"
                      value="Courses"
                      checked={value === "Courses"}
                      onChange={this.handleChange}
                    ></Checkbox>
                  </Menu.Item>

                  <Menu.Item
                    name="coupons"
                    active={activeItem === "coupons"}
                    onClick={this.handleItemClick}
                  >
                    <Header as="h4">Pricing</Header>
                    <Checkbox
                      label="Free"
                      value="Free"
                      checked={value === "Free"}
                      onChange={this.handleChange}
                    ></Checkbox>
                    <br></br>
                    <br></br>
                    <Checkbox
                      label="Paid"
                      value="Paid"
                      checked={value === "Paid"}
                      onChange={this.handleChange}
                    ></Checkbox>
                  </Menu.Item>
                </div>
              </Menu>
            </Grid.Column>
            <Grid.Column width={12}>
              <Segment.Group>
                <Segment>
                  <Grid columns={2} container>
                    <Grid.Column width={1}>
                      <div
                        secondary
                        textAlign="center"
                        className="pointer"
                        style={{
                          background: "#f3f4f5",
                          border: "solid 1px rgba(34,36,38,.15)",
                          padding: "2px",
                          paddingBottom: "10px",
                          textAlign: "center",
                          borderRadius: "4px",
                          width: "50px"
                        }}
                      >
                        <Icon name="chevron up" color="grey"></Icon>
                        <span
                          as="h1"
                          style={{
                            fontSize: "23px",
                            color: "grey",
                            display: "block"
                          }}
                        >
                          3
                        </span>
                      </div>
                    </Grid.Column>
                    <Grid.Column width={15}>
                      <Container style={{ paddingLeft: "10px" }}>
                        <Header as="h2">
                          <span className="hover pointer"> Mint</span>

                          <Header.Subheader> App | Free </Header.Subheader>
                        </Header>

                        <Label color="yellow" className="pointer">
                          <span className="black">Investing</span>
                        </Label>
                        <Label color="yellow" className="pointer">
                          <span className="black">Personal Finance</span>
                        </Label>
                        <Label color="yellow" className="pointer">
                          <span className="black">Money</span>
                        </Label>
                        <br></br>
                      </Container>
                    </Grid.Column>
                  </Grid>
                </Segment>
                <Segment>
                  <Grid columns={2} container>
                    <Grid.Column width={1}>
                      <div
                        secondary
                        textAlign="center"
                        className="pointer"
                        style={{
                          background: "#f3f4f5",
                          border: "solid 1px rgba(34,36,38,.15)",
                          padding: "2px",
                          textAlign: "center",
                          borderRadius: "4px",
                          width: "50px",
                          paddingBottom: "10px"
                        }}
                      >
                        <Icon name="chevron up" color="grey"></Icon>
                        <span
                          as="h1"
                          style={{
                            fontSize: "23px",
                            color: "grey",
                            display: "block"
                          }}
                        >
                          34
                        </span>
                      </div>
                    </Grid.Column>
                    <Grid.Column width={15}>
                      <Container style={{ paddingLeft: "10px" }}>
                        <Header as="h2">
                          <span className="hover pointer"> Mint</span>

                          <Header.Subheader> App | Free </Header.Subheader>
                        </Header>

                        <Label color="yellow" className="pointer">
                          <span className="black">Investing</span>
                        </Label>
                        <Label color="yellow" className="pointer">
                          <span className="black">Personal Finance</span>
                        </Label>
                        <Label color="yellow" className="pointer">
                          <span className="black">Money</span>
                        </Label>
                        <br></br>
                      </Container>
                    </Grid.Column>
                  </Grid>
                </Segment>
              </Segment.Group>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default TopicPage;
