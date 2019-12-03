import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { getAccounts } from "../services/accountservice";

class AdminUsers extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await getAccounts();
    this.setState({ accounts: data });
  }

  render() {
    const { accounts } = this.state;
    return (
      <Table>
        <Table.Body>
          {accounts &&
            accounts.map(t => (
              <Table.Row key={t._id}>
                <Table.Cell>{t.fullname}</Table.Cell>
                <Table.Cell>{t.userid}</Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    );
  }
}

export default AdminUsers;
