import React from 'react';
import L from 'leaflet';
import './Map.css';
require('os-leaflet');


class Map extends React.Component {


  componentDidMount() {

    this.map = L.map('map', {
      center: [55.8642, 4.2518],
      zoom: 10,
      layers: [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }),
      ]
    });
  }
  // componentDidMount() {
  //   this.layer = L.layerGroup().addTo(this.map);
  //   this.updateMarkers(this.props.markersData);
  // }


componentWillReceiveProps({ markersData }) {

  if (this.props.markersData !== markersData) {
    this.updateMarkers(markersData);
  }
}
updateMarkers(markersData) {
  this.layer.clearLayers();
  markersData.forEach(marker => {
    L.marker(
      marker.latLng,
      { title: marker.title }
    ).addTo(this.layer);
  });
}

render() {
  return <div id="map" ></div>
}
}

export default Map;
