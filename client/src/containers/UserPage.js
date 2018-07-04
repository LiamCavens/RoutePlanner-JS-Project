import React, { Component } from "react";
import UserList from "../components/UserList";
import "../components/User.css";

export default class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      newUserName: "",
      user: ""
    };
    this.handleNewUser = this.handleNewUser.bind(this);
    this.newUserName = this.newUserName.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.SearchForUser = this.SearchForUser.bind(this);
    this.getUsersFromApi = this.getUsersFromApi.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.userAlreadyExists = this.userAlreadyExists.bind(this);
  }

  handleLogout = event => {
    this.props.changeUser("");
  };

  userAlreadyExists = (name) => {
    return this.state.users.some(elem =>{
      return JSON.stringify(name) === JSON.stringify(elem.name);
    });

  }

  handleNewUser = event => {
    event.preventDefault();
    if(!this.userAlreadyExists(this.state.newUserName)){
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3001/api/users");
    request.setRequestHeader("content-type", "application/json");
    request.addEventListener("load", function() {
      if (this.status !== 201) return;
      const responseBody = JSON.parse(this.response);
    });
    let newUsersname = this.state.newUserName;
    let newUserObject = { name: newUsersname, routes: [] };
    this.props.changeUser(newUserObject);

    request.send(JSON.stringify(newUserObject));
    setTimeout(() => {
      this.getUsersFromApi();
    }, 1000);}
    else(alert("User already exists"))
  };

  updateUser = event => {
    event.preventDefault();
    this.props.changeUser(event.target.value);
  };

  SearchForUser = event => {
    event.preventDefault();

    let component = this;
    this.state.users.forEach(function(userToSearch) {
      if (userToSearch.name === component.state.user) {
        component.props.changeUser(userToSearch);
      }
    });
  };

  newUserName = event => {
    event.preventDefault();
    this.setState({ newUserName: event.target.value });
  };
  getUsersFromApi = () => {
    const userUrl = "/api/users";
    fetch(userUrl)
      .then(res => res.json())
      .then(users =>
        this.setState({
          users: users
        })
      );
  };

  componentDidMount() {
    this.getUsersFromApi();
    this.setState({ user: this.props.loggedInUser });
    setTimeout(() =>  {console.log(this.state.users)}, 1000)
    setTimeout(() => {console.log(this.userAlreadyExists("Paul"))}, 2000)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ user: nextProps.loggedInUser });
  }

  render() {
    const user = this.state.user;
    let userLogin;
    if (user.name === undefined) {
      userLogin = (
        <div id="form-container">
          <form onSubmit={this.SearchForUser}>
            <p>Login</p>
            <input
              type="text"
              placeholder="Username"
              onChange={this.updateUser}
            />
            <input type="submit" value="Login" />
          </form>

          <form onSubmit={this.handleNewUser}>
            <p>Create Account</p>
            <input
              type="text"
              placeholder="Username"
              onChange={this.newUserName}
            />
            <input type="submit" value="New users" />
          </form>
        </div>
      );
    }

    if (user.name !== undefined) {
      userLogin = (
        <div id="user-logged-in">
          <p>Logged in : {this.state.user.name}</p>
          <button onClick={this.handleLogout}>Logout</button>
        </div>
      );
    }

    return (
      <div id="user-background">
        <h3 id="users-header">Users</h3>

        {userLogin}
        <UserList
          users={this.state.users}
          user={this.state.user}
          reloadApi={this.getUsersFromApi}
        />
      </div>
    );
  }
}
