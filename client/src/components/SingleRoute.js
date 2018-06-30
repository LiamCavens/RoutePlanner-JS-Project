import React from 'react';

const SingleRoute = ({route}) =>{
  return(
    <div className= "route-div" >
      <h1 className="route-name">{route.name}</h1>
      <p>{route.description}</p>

    </div>
  )

}

export default SingleRoute;
