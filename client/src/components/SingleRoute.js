import React from 'react';

const SingleRoute = ({route}) =>{
  return(
    <div className="route-div" >
      <h3 className="route-name">{route.name}</h3>
      <p>{route.duration}</p>
      <p>{route.distance}</p>
    

    </div>
  )

}

export default SingleRoute;
