import React from "react";
import "./About.css";

const About = () => (
  <div>
    <h4 id="about-header">About</h4>
    <div id="about-container">
      <h5 id="about-sub-head">
        Helping you to discover and explore the real Scotland
      </h5>
      <p id="message-about">{`Walking can be dangerous and is done entirely at your own risk. Information is provided free of charge; it is each walker's responsibility to check it and navigate using a map and compass.`}</p>

      <iframe
        id="about-video"
        src="https://www.youtube.com/embed/vUXGtWA1dZ4"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
      />
    </div>
  </div>
);

export default About;
