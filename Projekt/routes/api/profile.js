const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const request = require('request');
const config = require('config');
var ObjectId = require('mongodb').ObjectID
// @route GET api/profile/me
// @desc GET current user profile
// @access private

router.get('/me', auth,async (req,res) => {
  try{
    const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);

    if(!profile){
      return res.status(400).json({msg : 'There is no profile for this user'});
    }

    res.json(profile);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route POST api/profile
// @desc Create or Update user profile
// @access private
router.post('/', auth,async (req, res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }
  const profileFields = {};
  profileFields.user = req.user.id;
    try{
      //Create
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        {$set: profileFields},
        { new: true, upsert: true }
      );
      profile.posts = [];
      profile.friends = [];
      res.json(profile);

    }catch(err){
      console.error(err.message);
      res.status(500).send('Server error');
    }
});

// @route GET api/profile
// @desc Get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar','email']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user id
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar', 'email']);

    if(!profile){
      return res.status(400).json({msg:'Profile not found'});
    }
    res.json(profile);

  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId'){
      return res.status(400).json({msg:'Profile not found'});
    }
    res.status(500).send('Server Error');
  }
});

// @route Delete api/profile
// @desc Delete profile, user and posts
// @access Private
router.delete('/',auth ,async (req, res) => {
  try {
    //Remove profile
    await Profile.findOneAndRemove({user:req.user.id});
    //Remove user
    await User.findOneAndRemove({_id:req.user.id});
    res.json({msg:'User succesfully removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/profile/post/:profileid
// @desc     Add a post to a profile
// @access   Private
router.post(
  '/post/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //console.log(req.user.id);
    try {
      const user = await User.findById(req.user.id).select('-password');
      const profile = await Profile.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      profile.posts.unshift(newComment);

      await profile.save();

      res.json(profile.posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


// @route    Get api/profile/post/:profileid/:postid
// @desc     Delete a post from profile
// @access   Private (only poster and profile owner)
router.delete('/post/:profileid/:postid', auth, async (req, res)=>{
  try {
    const profile = await Profile.findById(req.params.profileid);
    const post = profile.posts.find(
      post => post.id === req.params.postid
    );
    /*
    const posts = profile.posts;
    console.log(posts)
    console.log(req.params.postid);
    const post = posts.find({"_id":`$(req.params.postid)`});
    */
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check user
    if (post.user.toString() !== req.user.id && post.user.toString() !== profile.user._id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    const removeIndex = profile.posts
      .map(post => post.id)
      .indexOf(req.params.postid);

    profile.posts.splice(removeIndex, 1);

    await profile.save();

    res.json(profile.posts);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server Error');
  }
});


// @route    Get api/profile/post/:profileid
// @desc     Get all posts from profile
// @access   Public
router.get('/post/:id', async (req, res) => {
  try {
    console.log(req.params.id);
    const profile = await Profile.findById(req.params.id);
    res.json(profile.posts);
    console.log(profile.posts);
  } catch (err) {
    console.error(err.message);
    if(err.kind == 'ObjectId'){
      return res.status(400).json({msg:'Profile not found'});
    }
    res.status(500).send('Server Error');
  }
});

// @route    Get api/profile/friend/:id
// @desc     Add friend
// @access   Private

router.put('/friend/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({user:req.user.id})
    const user = await User.findById(req.params.id).select('-password');
    const newComment = {
      name: user.name,
      avatar: user.avatar,
      user: req.params.id
    };
    console.log(profile.friends);
    //Testa om man redan är vän
    /*
    if(profile.friends.filter(fr => fr.user.id === req.params.id)){
      return res.status(400).json({ msg: 'This person is already your friend' });
    */
    console.log(newComment);
    profile.friends.unshift(newComment);
    console.log(profile.friends);
    await profile.save();

    res.json(profile.friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
