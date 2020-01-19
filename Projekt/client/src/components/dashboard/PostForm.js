import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost, getPosts} from '../../actions/profile';


const PostForm = ({profileId, addPost}) => {
  const [text, setText] = useState('');

  return(
    <div className='post-form'>
      <form
        className='form my-1'
        onSubmit={e => {
          e.preventDefault();
          addPost(profileId, { text });
          setText('');
        }}
      >
        <textarea
          id='post_text'
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input id="submit_post" type='submit' className='btn btn-dark my-1' value='Submit' />
      </form>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, {addPost})(PostForm);
