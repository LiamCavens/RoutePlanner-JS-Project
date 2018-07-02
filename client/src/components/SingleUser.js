import React from 'react';

const SingleUser = ({user}) => {

    this.handleClick = function(event){
      event.preventDefault()
      user.routes[event.target.value].completed = "Completed"
        const request = new XMLHttpRequest();
        request.open("PUT", "http://localhost:3001/api/users");
        request.setRequestHeader("content-type", "application/json")
        request.addEventListener("load", function(){
          if(this.status !== 201) return;
          const responseBody = JSON.parse(this.response);
        })
        request.send(JSON.stringify(user));
        window.location.reload();
    }
      console.log(user);
    const routeNames = user.routes.map((route, index) =>

    <p>{route.name}-{route.completed}<button value={index} onClick={this.handleClick}>Complete</button></p>
  )
  return(
    <div className='user-div' >
      <p>{user.name}</p>
      <p>{routeNames}</p>

    </div>
  )

}

export default SingleUser;
