import axios from 'axios';
import {setAlert} from './alert';

import{
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_PROFILES,
  GET_POSTS,
  ADD_POST,
  ADD_FRIEND_ERROR,
  ADD_FRIEND_SUCCESS,
  CLEAR_PROFILES
}from './types';

export const searchprofile = data => async dispatch => {
  console.log(data)
}


//Get current user profile
export const getCurrentProfile = () => async dispatch => {
  try{
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload:{msg: err.response.statusText, status: err.response.status}
    });
  }
};
//Get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: CLEAR_PROFILE });

  try {
    const res = await axios.get('/api/profile/');

    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//Get profile by ID
export const getProfileById = userId => async dispatch => {
  //dispatch({type: CLEAR_PROFILE});
  try{
    const res = await axios.get(`/api/profile/user/${userId}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload:{msg: err.response.statusText, status: err.response.status}
    });
  }
};

//Get posts
export const getPosts = profileId => async dispatch => {
  dispatch({type: CLEAR_PROFILE});
  try{
    const res = await axios.get(`/api/profile/post/${profileId}`);
    console.log(res.data);
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload:{msg: err.response.statusText, status: err.response.status}
    });
  }
};

export const addProfile = proID => async dispatch => {
  console.log(proID)
  try {
    const res = await axios.put(`/api/profile/friend/${proID}`);
    dispatch({
      type: ADD_FRIEND_SUCCESS,
      payload: res.data
    })
  }catch(err){
    dispatch({
      type: ADD_FRIEND_ERROR,
      payload: {msg: err.response.statusText, status: err.response.status}
    });
  }
}

//Add posts
export const addPost = (profileId, formData) => async dispatch => {
  const config = {
    headers:{
      'Content-Type':'application/json'
    }
  }
  try{
    const res = await axios.post(`/api/profile/post/${profileId}`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });
  }catch(err){
    dispatch({
      type: PROFILE_ERROR,
      payload:{msg: err.response.statusText, status: err.response.status}
    });
  }
};

//Create profile
export const createProfile = (formData = {}, history, edit = false) => async dispatch => {
  try{
    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }

    const res = await axios.post('api/profile', {}, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
    dispatch(setAlert('Profile Created'),'success');
    history.push('/dashboard');
  }catch(err){
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error=> dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload:{msg: err.response.statusText, status: err.response.status}
    });
  }
}
