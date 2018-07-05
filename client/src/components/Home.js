import React from "react";
import CollageBox from "./CollageBox";
import "./Home.css";

export default class Home extends React.Component {




 render() {
    const user = this.props.loggedInUser;
    let LoggedIn;
    if (user.name !== undefined) {
      LoggedIn = (
        <div id="login-route">
          <p id="logged-in-line">
            Logged in: {user.name}
            <button onClick={this.props.userLogOut}>Logout</button>
          </p>
        </div>
      )}
      if (user.name === undefined) {
      LoggedIn = (
        <div id="form-container">
          <form onSubmit={this.props.searchForUser}>
            <p>Login</p>
            <input
              type="text"
              placeholder="Username"
              onChange={this.props.updateUser}
            />
            <input type="submit" value="Login" />
          </form>
        </div>)}


return(
  <div>
    <h4 id="home-header">Home</h4>
    {LoggedIn}

    <CollageBox />
  </div>
)}}
