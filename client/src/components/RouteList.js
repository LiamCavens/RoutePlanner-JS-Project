import React, {Component} from 'react';



export default class RouteList extends Component {

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
      console.log(this.state);
    }));
  }

  render(){
    return(
      // <Route quotes={this.state.routes} />
    )
  }
};
