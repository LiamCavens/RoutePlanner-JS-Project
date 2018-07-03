import React, {Component} from 'react';
import RouteList from './RouteList';
import UserList from './UserList';
import L from 'leaflet';
import './Map.css';
import './route-planner.css'
require('os-leaflet');


require('leaflet-routing-machine');
require('lrm-graphhopper');


export default class RoutePlanner extends Component {

  constructor(props){
    super(props);
    this.state= {
      routes: [],
      apiUsers: [],
      user: "",
      been_routed: false,
      routing: '',
      marker: [],
      marker2: [],
      startTown:'',
      endTown:'',
      startLatLong: [],
      endLatLong: [],
      method: "",
      usersRoute: "glasgow"
    }

    this.mainMap = this.mainMap.bind(this)
    this.newRoute = this.newRoute.bind(this)
    this.addMarker = this.addMarker.bind(this)
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this)
    this.onStartTownChange = this.onStartTownChange.bind(this)
    this.onEndTownChange = this.onEndTownChange.bind(this)
    this.onTravelMethodChange = this.onTravelMethodChange.bind(this)
    this.handleSaveRoute = this.handleSaveRoute.bind(this)
    this.updateUser = this.updateUser.bind(this)
    this.SearchForUser = this.SearchForUser.bind(this)

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


    updateUser = (event) => {
      event.preventDefault()
      this.setState({user: event.target.value})
    }

    SearchForUser = (event) => {
      event.preventDefault()

      let component = this;
      this.state.apiUsers.forEach(function(userToSearch){

        if(userToSearch.name === component.state.user){
            component.setState({user: userToSearch})
        }
      })
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
    }, 6000);
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

  handleSaveRoute = (event) => {
    event.preventDefault()
    console.log(event.target.value);
    this.state.user.routes.push(this.state.usersRoute);
    const request = new XMLHttpRequest();
    request.open("PUT", "http://localhost:3001/api/users");
    request.setRequestHeader("content-type", "application/json")
    request.addEventListener("load", function(){
      if(this.status !== 201) return;
      const responseBody = JSON.parse(this.response);
    })
    request.send(JSON.stringify(this.state.user));
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
     this.setState({usersRoute: {name: `${this.state.startTown} to ${this.state.endTown}`, completed: "Not completed"}})

    }

  mainMap = function () {

    const cycleLayer = new L.TileLayer("https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png")
    const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    const hikeLayer = new L.TileLayer("https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png")
    var baseMaps = {
             "osmLayer" :osmLayer
           };
           var overlayMaps = {
             "Cycle": cycleLayer,
             "Hike": hikeLayer
           };
    this.map  = L.map('map')
                 .addLayer(osmLayer)
                 .setView([55.9533, -3.1883], 5);
                 this.addMarker([55.9533, -3.1883], "Edinburgh, Scotland's capital", "marker")
                 this.map.addLayer(cycleLayer)
                 this.map.addLayer(hikeLayer)
                 L.control.layers(null, overlayMaps).addTo(this.map)
    }

  componentDidMount(){
    const userUrl = "/api/users";
    fetch(userUrl).then(res => res.json()).then(users => this.setState({
    apiUsers: users}))

    const url = "/api/routes";
    fetch(url).then(res => res.json()).then(routes => this.setState({
    routes: routes}))

    this.mainMap()
  }

  render(){
    return(
      <div id='main-route-planner'>

      <RouteList  newRoute={this.newRoute} routes={this.state.routes} users={this.state.apiUsers}/>

        <div id="map-box">
          <div id='form-box'>
            <select onChange={this.onTravelMethodChange}>
              <option value="foot" onClick={this.onTravelMethodChange}>
                Walking
              </option>
              <option value="car" onClick={this.onTravelMethodChange}>
                Driving
              </option>
              <option value="bike" onClick={this.onTravelMethodChange}>
                Cycling
              </option>
            </select>
            <form onSubmit={this.handleSearchSubmit}>
              <input type="text" placeholder="Start town" value={this.state.startTown} onChange={this.onStartTownChange} />
              <input type="text" placeholder="End town" value={this.state.endTown} onChange={this.onEndTownChange} />
              <input type="submit" value="New Route" />
            </form>
            <form  onSubmit={this.SearchForUser}>
              <input type="text" placeholder="Username"  onChange={this.updateUser} />
              <input type="submit" value="Find user"/>
              </form>
              <p>{this.state.user.name}</p>
            <form onSubmit={this.handleSaveRoute}>
              <input type="text" value={this.state.usersRoute.name}/>
              <input type="submit" value="Save Route" />
            </form>
          </div>

          <div id="map" />
        </div>
      </div>
    )
  }
};
