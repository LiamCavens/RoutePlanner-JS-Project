import React, { Component } from "react";
import SingleRoute from "./SingleRoute.js";
import "./RouteList.css";

export default class RouteList extends Component {
  constructor(props) {
    super(props);
    this.handleSaveRoute = this.handleSaveRoute.bind(this);
    this.SearchForUser = this.SearchForUser.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      user: ""
    };
  }

  updateUser = event => {
    event.preventDefault();
    this.setState({ user: event.target.value });
  };

  SearchForUser = event => {
    event.preventDefault();

    let component = this;
    this.props.users.forEach(function(userToSearch) {
      if (userToSearch.name === component.state.user) {
        component.setState({ user: userToSearch });
      }
    });
  };

  handleSaveRoute = event => {
    event.preventDefault();
    console.log(event.target.value);
    this.state.user.routes.push({
      name: event.target.value,
      completed: "Not completed"
    });
    const request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:3001/api/users");
    request.setRequestHeader("content-type", "application/json");
    request.addEventListener("load", function() {
      if (this.status !== 201) return;
      const responseBody = JSON.parse(this.response);
    });
    request.send(JSON.stringify(this.state.user));
  };

  render() {
    const routes = this.props.routes.map(route => {
      if(this.state.user.name !== undefined)
      {return (<li key={route._id}>
        <SingleRoute route={route} />{" "}
        <button
          onClick={() =>
            this.props.newRoute(
              route.startPoint,
              route.endPoint,
              route.travelMethod,
              route.startTown,
              route.endTown
            )
          }
        >
          View this Route
        </button>
        <form onSubmit={this.SearchForUser}>
          <input
            type="text"
            placeholder="Username"
            onChange={this.updateUser}
          />
          <input type="submit" value="Find user" />
        </form>

        <button value={route.name} onClick={this.handleSaveRoute}>
          Save this route
        </button>

        <p id="username">{this.state.user.name}</p>
      </li>)}
      if(this.state.user.name === undefined)
      {return (<li key={route._id}>
        <SingleRoute route={route} />{" "}
        <button
          onClick={() =>
            this.props.newRoute(
              route.startPoint,
              route.endPoint,
              route.travelMethod,
              route.startTown,
              route.endTown
            )
          }
        >
          View this Route
        </button>
        <form onSubmit={this.SearchForUser}>
          <input
            type="text"
            placeholder="Username"
            onChange={this.updateUser}
          />
          <input type="submit" value="Find user" />
        </form>

        <p id="username">Log in to save Route</p>
      </li>)}
    });
    return (
      <div id="route-list-div">
        <h3 id="list-header-h3">Recommended Routes</h3>
        <ul>{routes}</ul>
      </div>
    );
  }
}
