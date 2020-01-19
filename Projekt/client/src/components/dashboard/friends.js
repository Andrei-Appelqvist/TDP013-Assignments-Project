import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
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
const Friends = ({profile:{friends}}) => {
  return(
    <Fragment>
    <h1>Friends</h1>

      {friends === null ? (<p>Damn!</p>):(
        friends.map(friend => (<div key={friend._id} >
          {friend.name}
          </div>)
      ))}
  </Fragment>
  );
}
Friends.propTypes = {
  friends: PropTypes.array.isRequired
};

export default Friends
