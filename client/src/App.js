import React, { Component } from 'react';
import Map from './components/Map.js'
import "./App.css"

import Main from './components/Main'

class App extends Component {
  render() {
    return (
      <div className="App">

        <Map />

        <Main />

      </div>
    );
  }
}

export default App;
