import React from "react";

const SingleRoute = ({ route }) => {
  return (
    <div className="route-div">
      <h3 className="route-name">{route.name}</h3>
      <p>Duration: {route.duration}</p>
      <p>Distance: {route.distance}</p>
      <p>Description: {route.description}</p>
    </div>
  );
};

export default SingleRoute;
