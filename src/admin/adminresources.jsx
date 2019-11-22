import React, { Component } from "react";
import {
  Table,
  Button,
  Segment,
  Header,
  Modal,
  Form,
  Radio,
  Input,
  Label
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  getAllResources,
  addResources,
  deleteResources
} from "../services/resourceservice";

class AdminResources extends Component {
  state = {
    addresource: {
      name: "",
      url: "",
      type: "",
      pricing: "",
      appstore: "",
      ioslink: "",
      gplaylink: "",
      upvotes: "",
      isApproved: "",
      tags: ""
    }
  };

  async componentDidMount() {
    console.log("component Did Mount");
    this.refreshPage();
  }

  refreshPage = async () => {
    const { data } = await getAllResources();
    console.log("data resources", data);
    this.setState({ tags: data });
  };

  handleDelete = async short => {
    await deleteResources(short);
    this.refreshPage();
  };

  handleChange = (event, { name, value }) => {
    console.log("name", name, value);
    if (this.state.addresource.hasOwnProperty(name)) {
      let { addresource } = this.state;
      addresource[name] = value;

      this.setState({ addresource });
    }
  };

  handleSubmit = async () => {
    // const { error } = this.validateReward();
    console.log("this.state.addresource", this.state.addresource);

    await addResources(this.state.addresource);

    this.closeModal();
    this.refreshPage();
  };

  loadModal = () => {
    let { addresource } = this.state;
    addresource.pricing = "Free";
    addresource.upvotes = "0";
    addresource.type = "Book";
    addresource.isApproved = "Y";
    this.setState({
      addresource,
      showModal: true
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { tags } = this.state || [];

    const { checkedValue } = this.state;

    return (
      <div style={{ margin: "20px" }}>
        <Segment color="blue" inverted textAlign="center">
          <Header as="h1"> Admin</Header>
        </Segment>

        <Modal
          onClose={this.closeModal}
          open={this.state.showModal}
          trigger={
            <Button
              onClick={this.loadModal}
              textalign="center"
              icon="plus"
              color="green"
            >
              Add New
            </Button>
          }
          centered={false}
          closeIcon
        >
          <Modal.Header>Add New</Modal.Header>
          <Modal.Content>
            <Form>
              <Form.Group widths="equal">
                <Form.Field>
                  <Input
                    onChange={this.handleChange}
                    name="name"
                    label="Resource Name"
                    placeholder="Resource Name"
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group inline>
                <Label size="large">Type</Label>

                <Form.Field inline>
                  <Radio
                    label="Book"
                    name="type"
                    value="Book"
                    checked={this.state.addresource.type === "Book"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field inline>
                  <Radio
                    label="App"
                    name="type"
                    value="App"
                    checked={this.state.addresource.type === "App"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field inline>
                  <Radio
                    label="Course"
                    name="type"
                    value="Course"
                    checked={this.state.addresource.type === "Course"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group inline>
                <Label size="large">Pricing</Label>

                <Form.Field inline>
                  <Radio
                    label="Free"
                    name="pricing"
                    value="Free"
                    checked={this.state.addresource.pricing === "Free"}
                    onChange={this.handleChange}
                  />
                </Form.Field>

                <Form.Field inline>
                  <Radio
                    label="Paid"
                    name="pricing"
                    value="Paid"
                    checked={this.state.addresource.pricing === "Paid"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Field>
                <Input
                  onChange={this.handleChange}
                  name="url"
                  label="Main Url"
                  placeholder="wwww.trello.com"
                />
              </Form.Field>
              <Form.Field>
                <Input
                  onChange={this.handleChange}
                  name="tags"
                  label="Tags"
                  placeholder="Habits, Organization, Productivity"
                />
              </Form.Field>
              <Form.Field>
                <Input
                  onChange={this.handleChange}
                  name="upvotes"
                  label="UpVotes"
                  placeholder="0"
                />
              </Form.Field>

              <Form.Group inline>
                <Label>is Approved</Label>
                <Form.Field inline>
                  <Radio
                    label="Y"
                    name="isApproved"
                    value="Y"
                    checked={this.state.addresource.isApproved === "Y"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field inline>
                  <Radio
                    label="N"
                    name="isApproved"
                    value="N"
                    checked={this.state.addresource.isApproved === "N"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field>
                  <Input
                    onChange={this.handleChange}
                    name="ioslink"
                    label="IOS App Store URL"
                    placeholder="https://apps.apple.com/au/app/trello-organize-anything/id461504587"
                  />
                </Form.Field>
                <Form.Field>
                  <Input
                    onChange={this.handleChange}
                    name="gplaylink"
                    label="Google Play Store URL"
                    placeholder="https://play.google.com/store/apps/details?id=com.trello&hl=en_AU"
                  />
                </Form.Field>
              </Form.Group>

              <br></br>

              <Form.Group>
                <Button
                  color="green"
                  onClick={event => {
                    this.handleSubmit();
                  }}
                >
                  Submit
                </Button>
              </Form.Group>
            </Form>
          </Modal.Content>
        </Modal>
        <Link to="/">
          <Button color="green" floated="right">
            Go To Main Page
          </Button>
        </Link>

        <Table celled unstackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>Pricing</Table.HeaderCell>
              <Table.HeaderCell>UpVotes</Table.HeaderCell>
              <Table.HeaderCell>Approved</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tags &&
              tags.map(t => (
                <Table.Row key={t.short}>
                  <Table.Cell>{t.name}</Table.Cell>
                  <Table.Cell>{t.type}</Table.Cell>
                  <Table.Cell>{t.pricing}</Table.Cell>
                  <Table.Cell>{t.upvotes}</Table.Cell>
                  <Table.Cell>
                    <Button disabled>{t.isApproved}</Button>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      color="orange"
                      onClick={() => this.handleDelete(t._id)}
                    >
                      Delete
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default AdminResources;
