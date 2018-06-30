import React, {Component} from 'react';
import SingleRoute from './SingleRoute.js'


export default class RouteList extends Component {

  render(){
      const routes = this.props.routes.map( route => (
      <li key={route._id}><SingleRoute route={route} /></li>
      ))
      return(
        <ul>
          {routes}
        </ul>
      )
  }
}
