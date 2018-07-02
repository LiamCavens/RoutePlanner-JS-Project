import React, {Component} from 'react';

import UserList from '../components/UserList';

export default class UserPage extends Component {

  constructor(props){
    super(props);
    this.state= {
      users: [],
    }
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
        <UserList users= {this.state.users}/>

      </div>
    )
  }
};
