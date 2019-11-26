import React, { Component } from "react";
import { getTags, deleteTags, addTags } from "../services/tagService";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Segment,
  Header,
  Modal,
  Form,
  Radio,
  Input
} from "semantic-ui-react";

class AdminTags extends Component {
  state = {
    addtag: {
      name: "",
      popular: ""
    }
  };

  async componentDidMount() {
    this.refreshPage();
  }

  refreshPage = async () => {
    const { data } = await getTags();
    this.setState({ tags: data });
  };

  handleDelete = async short => {
    await deleteTags(short);
    this.refreshPage();
  };

  handleChange = (event, { name, value }) => {
    if (this.state.addtag.hasOwnProperty(name)) {
      let { addtag } = this.state;
      addtag[name] = value;

      this.setState({ addtag });
    }
  };

  handleSubmit = async () => {
    // const { error } = this.validateReward();

    await addTags(this.state.addtag);

    this.closeModal();
    this.refreshPage();
  };

  loadModal = () => {
    let { addtag } = this.state;
    addtag.popular = "N";
    addtag.name = "";
    this.setState({
      addtag,
      showModal: true
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { tags } = this.state || [];

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
                    label="Topic Name"
                    placeholder="Topic Name"
                  />
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <Radio
                    label="Y"
                    name="popular"
                    value="Y"
                    checked={this.state.addtag.popular === "Y"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label="N"
                    name="popular"
                    value="N"
                    checked={this.state.addtag.popular === "N"}
                    onChange={this.handleChange}
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
              <Table.HeaderCell>Short Name</Table.HeaderCell>
              <Table.HeaderCell>Popular</Table.HeaderCell>
              <Table.HeaderCell>Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {tags &&
              tags.map(t => (
                <Table.Row key={t.short}>
                  <Table.Cell>{t.name}</Table.Cell>
                  <Table.Cell>{t.short}</Table.Cell>
                  <Table.Cell>{t.popular === "Y" ? "Y" : ""}</Table.Cell>
                  <Table.Cell>
                    <Button
                      color="orange"
                      onClick={() => this.handleDelete(t.short)}
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

export default AdminTags;
