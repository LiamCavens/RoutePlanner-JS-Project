import React, { Component } from "react";
import "./CollageBox.css";

export default class CollageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      route1text: "",
      route2text: "",
      route3text: "",
      route4text: "",
      route5text: "",
      route6text: "",
      route7text: ""
    };
    // this.handleHoverOver = this.handleHoverOver.bind(this)
  }

  render() {
    return (
      <div id="home-collage-box">
        <div id="route-1" className="home-walk-img">
          <h4>
            {" "}
            <a href="/westHighlandWay">West Highland way</a>
          </h4>
        </div>
        <div id="route-2" className="home-walk-img">
          <h4>The Great Glen Way</h4>
        </div>
        <div id="route-3" className="home-walk-img">
          <h4>The Rob Roy Way</h4>
        </div>
        <div id="route-4" className="home-walk-img">
          <h4>The Heart of Scotland Trail</h4>
        </div>
        <div id="route-5" className="home-walk-img">
          <h4>Formanrtine and Buchan Way, Aberdeenshire</h4>
        </div>
        <div id="route-6" className="home-walk-img">
          <h4>Ayrshire coast cycle way</h4>
        </div>
        <div id="route-7" className="home-walk-img">
          <h4>Stirling to Skye</h4>
        </div>
      </div>
    );
  }
}
