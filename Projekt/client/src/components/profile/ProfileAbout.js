import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({ profile:{
  friends,
  user:{name}
}}) => {
  return (
    <div class="profile-about bg-light p-2">
    <Fragment>
    <h1>Friends</h1>

      {friends === null ? (<p>Damn!</p>):(
        friends.map(friend => (<div key={friend._id}>
          {friend.name}
          </div>)
      ))}
    </Fragment>

    </div>
  )
}


ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
}


export default ProfileAbout;
