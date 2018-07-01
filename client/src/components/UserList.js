import React, {Component} from 'react';
import User from './User.js'


export default class UserList extends Component {

  render(){
      const users = this.props.users.map( user => (
      <li key={user._id}><User user={user}/>
      </li>
      ))
      return(
        <ul>
          {users}

        </ul>
      )
  }
}
