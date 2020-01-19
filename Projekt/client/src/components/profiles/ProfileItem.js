import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({profile:{
  posts,
  user:{_id, name, email, avatar}
}}) => {
  return (
      <div id='profile' className='profile bg-light'>
        <img src={avatar} alt='' className='round-img' />
        <div>
          <h2>{name}</h2>
          <Link to={`/profile/${_id}`} id={name} className='btn btn-primary'>
            View Profile
          </Link>
        </div>

      </div>
    );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
