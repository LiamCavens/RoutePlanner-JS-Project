import React from 'react';

const SingleUser = ({user, loggedInUser, reloadApi}) => {

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
        reloadApi()
    }


    let routeNames = user.routes.map((route, index) => {
    if(route.completed !== "Completed" && loggedInUser.name === user.name){
      return <p>{route.name}-{route.completed}
    <button value={index} onClick={this.handleClick}>Complete</button></p>}
    else{ return <p>{route.name}-{route.completed}</p>}
    })

  return(
    <div className='user-div' >
      <p>{user.name}</p>
      <p>{routeNames}</p>

    </div>
  )

}

export default SingleUser;
