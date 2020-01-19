import PropTypes from 'prop-types';
import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../layout/Spinner';
import {connect} from 'react-redux';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import {getProfileById, addProfile} from '../../actions/profile';
import Posts from '../dashboard/posts';



import {
  Label
} from 'reactstrap';

const Profile = ({getProfileById, addProfile, profile :{profile, loading}, auth, match}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  },);

  const friendID = match.params.id;

  return (
    <Fragment>
      {profile === null  || loading ? <Spinner/> : <Fragment>
        <Link to='/profiles' className='btn btn-light'>
            Back to profiles
          </Link>
          {auth.isAuthenticated && auth.loading === false && auth.user._id !== profile.user._id && (<Label onClick={() => addProfile(friendID)} id='add_friend' className='btn btn-dark'>Add friend</Label>)}
          <div className = "profile-grid my-1">
          <ProfileTop profile={profile}/>
          <ProfileAbout profile={profile}/>
          <Posts profile={profile}/>
          </div>
        </Fragment>
      }</Fragment>
    );
};


Profile.ropTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(mapStateToProps, {getProfileById, addProfile})(Profile)
