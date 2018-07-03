import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import About from './About';
import RoutePlanner from './RoutePlanner';
import UserPage from '../containers/UserPage';
import westHighlandWay from './westHighlandWay'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
                state: '',
                pageLoggedInUser: "hi"
        }
        this.changeLoggedInUser = this.changeLoggedInUser.bind(this)
    }

    changeLoggedInUser = (user) => {
      this.setState({pageLoggedInUser: user})
    }

    render() {
        return (
            <Router>
                <React.Fragment>
                    <NavBar />

                    <Route exact path='/'
                    render={() => <Home loggedInUser={this.state.pageLoggedInUser} changeUser={this.changeLoggedInUser}/>}/>
                    <Route path='/about'
                    render={() => <About loggedInUser={this.state.pageLoggedInUser} changeUser={this.changeLoggedInUser}/>}/>
                    <Route path='/users'
                    render={() => <UserPage loggedInUser={this.state.pageLoggedInUser} changeUser={this.changeLoggedInUser}/>} />
                    <Route path='/route-planner'
                    render={() => <RoutePlanner loggedInUser={this.state.pageLoggedInUser} changeUser={this.changeLoggedInUser}/>} />
                    <Route path='/west-highland-way' component={westHighlandWay}/>

                </React.Fragment>
            </Router>
        );
    }
}

export default Main;
