import React, {Component} from 'react';
import RouteList from './RouteList'
import L from 'leaflet';
import './Map.css';
import './route-planner.css'
// import Routing from 'leaflet-routing-machine';
// import {MapLayer} from 'react-leaflet';
require('os-leaflet');

require('leaflet-routing-machine');
require('lrm-graphhopper'); // This will tack on the class to the L.Routing namespace



export default class RoutePlanner extends Component {

  constructor(props){
    super(props);
    this.state= {
      routes: []
    }
    this.MapWrapper = this.MapWrapper.bind(this)
    this.flyTo = this.flyTo.bind(this)
    this.newRoute = this.newRoute.bind(this)
  }
  flyTo = function (coords) {
      this.map.flyTo([55.8642, -4.2518]);
  };
  newRoute = function(startCoords, endCoords, method){
  L.Routing.control({
  router: new L.Routing.GraphHopper('3eff14d7-7b89-4050-98ef-f0d72edb928e', {
     urlParameters: {
         vehicle: method
     }}),
  waypoints: [
      L.latLng(startCoords),
      L.latLng(endCoords)
  ],
  routeWhileDragging: true
}).addTo(this.map);}


  MapWrapper = function () {
    const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
   this.map  = L.map('map')
                 .addLayer(osmLayer)
                 .setView([0, 0], 5);
     L.Routing.control({
     router: new L.Routing.GraphHopper('3eff14d7-7b89-4050-98ef-f0d72edb928e', {
        urlParameters: {
            vehicle: 'foot'
        }}),
     waypoints: [
         L.latLng(55.8642, -4.2518),
         L.latLng(56.8198, -5.1052)
     ],
     routeWhileDragging: true
   }).addTo(this.map);



}

  componentDidMount(){
    const url = "/api/routes";
    fetch(url).then(res => res.json()).then(routes => this.setState({
      routes: routes
    }));
    this.MapWrapper()
  }
  render(){
    return(
      <div route-planner-div>
          <h4>Route Planner</h4>
          <RouteList  routes={this.state.routes} />
          <div id='map'/>
          <button onClick={() => {this.newRoute([55.9411, -4.318 ],[56.8198, -5.1052], 'foot')}}>New Route</button>
      </div>
    )
  }
};
