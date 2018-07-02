import React, {Component} from 'react';
import RouteList from './RouteList';
import UserList from './UserList';
import L from 'leaflet';
import './Map.css';
import './route-planner.css'
// import Routing from 'leaflet-routing-machine';
// import {MapLayer} from 'react-leaflet';
require('os-leaflet'); 


require('leaflet-routing-machine');
require('lrm-graphhopper');


export default class RoutePlanner extends Component {

  constructor(props){
    super(props);
    this.state= {
      routes: [],
      users: [],
      been_routed: false,
      routing: '',
      marker: [],
      marker2: [],
      startTown:'',
      endTown:'',
      startLatLong: [],
      endLatLong: []
    }

    this.MapWrapper = this.MapWrapper.bind(this)
    this.newRoute = this.newRoute.bind(this)
    this.addMarker = this.addMarker.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.onStartTownChange = this.onStartTownChange.bind(this)
    this.onEndTownChange = this.onEndTownChange.bind(this)
    this.onTravelMethodChange = this.onTravelMethodChange.bind(this)

  }

  addMarker = function (coords, text, markerToChange) {
    if(markerToChange === "marker"){
    if (this.state.marker !== []) {
      this.map.removeLayer(this.state.marker);
        }
   this.setState({marker: L.marker(coords).addTo(this.map)
    .bindPopup(text, { autoClose: false }).openPopup()})
    }
    if(markerToChange === "marker2"){
    if (this.state.marker2 !== []) {
      this.map.removeLayer(this.state.marker2);
      }
   this.setState({marker2: L.marker(coords).addTo(this.map)
    .bindPopup(text, { autoClose: false }).openPopup()})
    }
  }



  handleSearchSubmit = function(event){
    event.preventDefault()
    let startPoint = this.state.startTown;
    let endPoint = this.state.endTown

    let startUrl = `https://geocode.xyz/${startPoint}-uk?json=1`
    const request = new XMLHttpRequest()
    request.open("GET", startUrl);
    request.addEventListener('load', () => {
      if(request.status !== 200) return;
      let startTown = JSON.parse(request.response);
       this.state.startLatLong = [startTown.latt, startTown.longt];

    })
    request.send()

    let endUrl = `https://geocode.xyz/${endPoint}-uk?json=1`
    console.log(endUrl);
    const request2 = new XMLHttpRequest()
    request2.open("GET", endUrl);
    request2.addEventListener('load', () => {
      if(request2.status !== 200) return;
      let endTown = JSON.parse(request2.response);
       this.state.endLatLong = [endTown.latt, endTown.longt];
    })
    request2.send()

    setTimeout(() => {
      console.log(this.newRoute);
      this.newRoute(this.state.startLatLong , this.state.endLatLong, this.state.method, this.state.startTown, this.state.endTown);
    }, 2000);
  }

  onStartTownChange(event) {
    this.setState({startTown: event.target.value});
  }
  onEndTownChange(event) {
    this.setState({endTown: event.target.value});
  }
  onTravelMethodChange(event) {

    console.log(event.target.value);
    this.setState({method: event.target.value})
  }



  newRoute = function(startCoords, endCoords, method, startTown, endTown){

    if(this.state.been_routed === true){
    this.state.routing.spliceWaypoints(0, 2);
    this.map.removeControl(this.state.routing)}
     this.state.routing = L.Routing.control({
      router: new L.Routing.GraphHopper('3eff14d7-7b89-4050-98ef-f0d72edb928e', {
        urlParameters: {
          vehicle: method
        }}),
        waypoints: [
          L.latLng(startCoords),
          L.latLng(endCoords)
        ],
        routeWhileDragging: true
      }).addTo(this.map);
      this.addMarker(startCoords, startTown, "marker");
      this.addMarker(endCoords, endTown, "marker2");

     this.state.been_routed = true;
    }

  MapWrapper = function () {
    const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    this.map  = L.map('map')
                 .addLayer(osmLayer)
                 .setView([55.9533, -3.1883], 5);
                 this.addMarker([55.9533, -3.1883], "Edinburgh Scotland's capital", "marker")

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

      <div id='main-route-planner'>
          <div id="map-box">
          <RouteList  newRoute={this.newRoute} routes={this.state.routes} />
          <select onChange={this.onTravelMethodChange}>
            <option value="foot" onclick={this.onTravelMethodChange}>Walking</option>
            <option value="car" onclick={this.onTravelMethodChange}>Driving</option>
            <option value="bike" onclick={this.onTravelMethodChange}>Cycling</option>
          </select>
          <form  onSubmit={this.handleSearchSubmit}>
            <input type="text" placeholder="Start town" value={this.state.startTown} onChange={this.onStartTownChange}/>
            <input type="text" placeholder="End town" value={this.state.endTown} onChange={this.onEndTownChange}/>
            <input type="submit" value="New Route"/>
          </form>


          <div id='map'/>
      </div>
      </div>
    )
  }
};
