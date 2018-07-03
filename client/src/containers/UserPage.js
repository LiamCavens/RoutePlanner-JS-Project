import React, {Component} from 'react';

import UserList from '../components/UserList';

export default class UserPage extends Component {

  constructor(props){
    super(props);
    this.state= {
      users: [],
      newUserName: "",
      user: []
    }
    this.handleNewUser = this.handleNewUser.bind(this);
    this.newUserName = this.newUserName.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.SearchForUser = this.SearchForUser.bind(this);

  }

  handleNewUser = (event) => {
    event.preventDefault()
    const request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3001/api/users");
    request.setRequestHeader("content-type", "application/json")
    request.addEventListener("load", function(){
      if(this.status !== 201) return;
      const responseBody = JSON.parse(this.response);
    })
    let newUsersname = this.state.newUserName;
    request.send(JSON.stringify({name: newUsersname, routes: []}));
     window.location.reload();

  }


      updateUser = (event) => {
        event.preventDefault()
        this.setState({user: event.target.value})
      }

      SearchForUser = (event) => {
        event.preventDefault()

        let component = this;
        this.state.users.forEach(function(userToSearch){

          if(userToSearch.name === component.state.user){
              component.setState({user: userToSearch})
          }
        })
      }


  newUserName = (event) => {
    event.preventDefault()
    this.setState({newUserName: event.target.value})

  }

  componentDidMount(){

    const userUrl = "/api/users";
    fetch(userUrl).then(res => res.json()).then(users => this.setState({
      users: users
    }));

  }
  render(){
    return(
      <div >
          <h4>Users</h4>
          <form  onSubmit={this.SearchForUser}>
            <input type="text" placeholder="Username"  onChange={this.updateUser} />
            <input type="submit" value="Find user"/>
            </form>
            <p>{this.state.user.name}</p>
          <form onSubmit={this.handleNewUser}>
            <input type="text" placeholder="Username" onChange={this.newUserName}/>
            <input type="submit" value="New users" />
          </form>
        <UserList users= {this.state.users} user={this.state.user}/>

      </div>
    )
  }
};
