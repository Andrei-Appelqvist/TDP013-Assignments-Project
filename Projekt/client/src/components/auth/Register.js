import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import {register} from '../../actions/auth';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
//import axios from 'axios';
import {
  Container, Col, FormGroup, Label
} from 'reactstrap';

const Register = ({setAlert, register, isAuthenticated}) => {
  //hook
  const[formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  });

  //Destrukturera
  const {name, email, password, password2} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});
  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2){
      setAlert('Passwords dont match', 'danger');
    }
    else{
      register({name, email, password});
    }
  };

  if(isAuthenticated) {
    return <Redirect to='/dashboard'/>;
  }
  return(
    <Fragment>
    <Container className="Login-info-box col-sm-6">
            <h1> Registration </h1>
            <form className="login-form" onSubmit ={e => onSubmit(e)}>
              <Col>
              <FormGroup>
                <Label> Name </Label>
                <input type="text" id='username_input' name="name" placeholder="Enter Your Name" value={name} onChange={e => onChange(e)} />
              </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <Label> Email Adress</Label>
                <input type="email" id='email_input' name="email" placeholder="Enter Your Email Adress" value={email} onChange={e => onChange(e)} />
              </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <Label> Password </Label>
                <input type="password" id='password1_input' name="password"  placeholder="Enter Your Password" value={password} onChange={e => onChange(e)} />
              </FormGroup>
              </Col>
              <Col>
              <FormGroup>
                <Label> Confirm Password </Label>
                <input type="password" id='password2_input' name="password2"  value={password2} onChange={e => onChange(e)} placeholder="Enter Your Password" />
              </FormGroup>
              </Col>
              <input type="submit" id='submit_button' className="btn btn-primary" value="Register"/>
            </form>

          </Container>
    </Fragment>

  )
}
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});


//Connect takes state you want to map and the object with actions you want to use
//To be able to access props.setAlert
export default connect(mapStateToProps, {setAlert, register})(Register);
