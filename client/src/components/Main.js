import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import About from "./About";
import RoutePlanner from "./RoutePlanner";
import UserPage from "../containers/UserPage";
import westHighlandWay from "./westHighlandWay";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: "",
      pageLoggedInUser: "",
      users:''
    };
    this.changeLoggedInUser = this.changeLoggedInUser.bind(this);
    this.userLogOut = this.userLogOut.bind(this);
    this.searchForUser = this.searchForUser.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }


    componentDidMount() {
      const userUrl = "/api/users";
      fetch(userUrl)
        .then(res => res.json())
        .then(users =>
          this.setState({
            users: users
          })
        );
    }

      updateUser = event => {
        event.preventDefault();
        this.setState({pageLoggedInUser: event.target.value});
        console.log(this.state.pageLoggedInUser);
      };


    searchForUser = event => {
      event.preventDefault();

      let component = this;
      if (this.state.users.some(elem =>{
            return JSON.stringify(component.state.pageLoggedInUser) === JSON.stringify(elem.name);
          })){
      this.state.users.forEach(function(userToSearch) {
        if (userToSearch.name === component.state.pageLoggedInUser) {
          component.changeLoggedInUser(userToSearch);
        }
      })
    }
      else{alert("User not found")
      }
    };

  changeLoggedInUser = user => {
    this.setState({ pageLoggedInUser: user });
  };

  userLogOut = () => {
    this.setState({pageLoggedInUser: ""})
  }

  render() {
    return (
      <Router>
        <React.Fragment>
          <NavBar />

          <Route
            exact
            path="/"
            render={() => (
              <Home
                loggedInUser={this.state.pageLoggedInUser}
                changeUser={this.changeLoggedInUser}
                userLogOut={this.userLogOut}
                updateUser={this.updateUser}
                searchForUser={this.searchForUser}
              />
            )}
          />
          <Route
            path="/about"
            render={() => (
              <About
                loggedInUser={this.state.pageLoggedInUser}
                changeUser={this.changeLoggedInUser}
              />
            )}
          />
          <Route
            path="/users"
            render={() => (
              <UserPage
                loggedInUser={this.state.pageLoggedInUser}
                changeUser={this.changeLoggedInUser}
              />
            )}
          />
          <Route
            path="/route-planner"
            render={() => (
              <RoutePlanner
                loggedInUser={this.state.pageLoggedInUser}
                changeUser={this.changeLoggedInUser}
              />
            )}
          />
          <Route path="/west-highland-way" component={westHighlandWay} />
        </React.Fragment>
      </Router>
    );
  }
}

export default Main;
