import React, {Fragment, useEffect} from 'react';
//import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';
//import { Redirect } from 'react-router-dom';
import ProfileTop from '../profile/ProfileTop';
import ProfileAbout from '../profile/ProfileAbout';
import {getCurrentProfile} from '../../actions/profile';
import Posts from './posts';
//import Friends from './friends';

const Dashboard = ({getCurrentProfile, auth:{user}, profile:{profile, loading}}) => {
  useEffect(() => {
    getCurrentProfile();
  });
  return loading && profile === null ? <Spinner/> : <Fragment>
    <h1 className="large text-primary">
      Dashboard
    </h1>
    <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name}</p>
    <div className = "profile-grid my-1">
    <ProfileTop profile={profile}/>
    <ProfileAbout profile={profile}/>
    <Posts profile={profile}/>
    </div>
  </Fragment>;

};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});


export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);
