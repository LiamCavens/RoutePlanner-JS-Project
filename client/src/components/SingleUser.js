import React from 'react';

const SingleUser = ({user}) => {
  console.log(user);
  return(
    <div >
      <p>{user.name}</p>
      <h3>Hi</h3>
    </div>
  )

}

export default SingleUser;
