import React from 'react';

const SingleRoute = ({route}) =>{
  return(
    <div className= "route-div" >
      <h1 className="route-name">{route.name}</h1>
      <p>{route.description}</p>
      <button value={[route.startPoint, route.endPoint]}>See Route</button>
    </div>
  )

}

export default SingleRoute;
