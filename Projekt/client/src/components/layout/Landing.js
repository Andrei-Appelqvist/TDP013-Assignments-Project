import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Redirect to='/dashboard'/>
  }
  return(
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Not so social website</h1>
          <p className="lead">
          Get in contact with your friends or stalk people if you dont have any!
          <br/>
          We dont judge!
          </p>
          <div className="buttons">
            <Link to="/register" id='register_button' className="btn btn-primary">Sign Up</Link>
            <Link to="/login" id='login_button' className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
