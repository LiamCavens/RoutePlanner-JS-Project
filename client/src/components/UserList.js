import React, { Component } from "react";
import SingleUser from "./SingleUser.js";
import "./User.css";

export default class UserList extends Component {
  render() {
    const usersList = this.props.users.map((user, index) => (
      <li key={index}>
        <SingleUser
          user={user}
          loggedInUser={this.props.user}
          reloadApi={this.props.reloadApi}
        />
      </li>
    ));
    return <ul id="list-of-users">{usersList}</ul>;
  }
}
