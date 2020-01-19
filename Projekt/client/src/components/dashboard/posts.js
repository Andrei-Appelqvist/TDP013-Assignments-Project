import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import  PostForm from './PostForm';
import {getPosts, getProfileById} from '../../actions/profile';
//import { connect } from 'react-redux';
/*
const Post = ({ post }) => {
  const posts = post.map(post => (
    <div key={post.id} className={'post'}>
      <p> {post.name} </p>
      <p> {post.text} </p>
    </div>
  ));

  return (
    <Fragment>
      <div>
        {posts}
      </div>
    </Fragment>



  )
}
*/
const Posts = ({profile:{posts, user, _id}, isAuthenticated, loading, getPosts}) => {
    useEffect(() => {
    });
  return(
    <Fragment>
    <h1>Posts</h1><br/>
    <div className="posts">
    {isAuthenticated &&(
      <PostForm profileId ={_id}/>
    )}
    {}
      {posts === null ? (<p>Damn!</p>):(
        posts.map(post => (<div key={post._id}>

          <div className="post bg-white p-1 my-1">
       <div>
         <a href="profile.html">
           <img
             className="round-img"
             src= {post.avatar}
             alt=""
           />
           <h4>{post.name}</h4>
         </a>
       </div>
       <div>
         <p id={post.text} className="my-1">
           {post.text}
         </p>
          <p className="post-date">
             Posted on {post.date}
         </p>
         </div>
         </div>
          </div>)
      ))}

    </div>
    </Fragment>

  );
}



Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  posts: state.posts
});

export default connect(mapStateToProps, {getPosts})(Posts);
