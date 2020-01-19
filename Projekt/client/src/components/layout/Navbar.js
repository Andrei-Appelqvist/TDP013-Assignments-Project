import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';
import {connect } from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../actions/auth';

const Navbar = ({auth:{isAuthenticated, loading},logout}) => {
  const authLinks = (
    <ul>
      <li><Link to='/profiles' id='profiles_link' >Profiles</Link></li>

      <li><Link to='/dashboard' id='dashboard_link'><i className = "fas fa-user"></i>{" "}<span className="hide-sm">Dashboard</span></Link></li>

      <li><Link to='#!' onClick={logout}>
      <i className = "fas fa-sign-out-alt"></i>{" "}<span id='logout' className="hide-sm">Logout</span></Link></li>


    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to='/profiles' id='profiles_link' >Profiles</Link></li>
      <li><Link to='/register' id='register_link' >Register</Link></li>
      <li><Link to='/login' id='login_link' >Login</Link></li>
    </ul>
  );


  return(
    <nav className="navbar bg-dark">
        <h1>
          <Link to="/">Not so social website</Link>
        </h1>
        {!loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks}</Fragment>)}
      </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{logout})(Navbar);
