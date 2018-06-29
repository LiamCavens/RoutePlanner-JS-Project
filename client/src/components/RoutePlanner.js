import React, {Component} from 'react';
import Map from './Map.js'
import RouteList from './RouteList'
import './route-planner.css'

export default class RoutePlanner extends Component {

  constructor(props){
    super(props);
    this.state= {
      routes: []
    }
  }
  componentDidMount(){
    const url = "/api/routes";
    fetch(url).then(res => res.json()).then(routes => this.setState({
      routes: routes
    }));
  }
  render(){
    return(
      <div route-planner-div>
          <h4>Route Planner</h4>


          <RouteList routes={this.state.routes} />
          <Map id='map'/>

      </div>
    )
  }
};
