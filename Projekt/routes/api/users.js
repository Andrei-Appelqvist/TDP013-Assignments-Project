const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const {check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const Profile = require('../../models/Profile');
var ObjectId = require('mongodb').ObjectID

// @route POST api/users
// @desc Register user
// @access public
router.post('/',
[
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password has to have 6 or more letters').isLength({min:6})
],async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const{name, email, password} = req.body;

  try{
    let user = await User.findOne({email});
    //Check for existing user
    if(user){
      return res.status(400).json({errors:[{msg:'That email already exists'}]});
    }
    //Get users gravatar
    const avatar = gravatar.url(email,{
      s:'200',
      r:'pg',
      d: 'mm'
    })

    user = new User({
      name,
      email,
      avatar,
      password
    });
    //Encrypt password
    //await eller then?
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    //Gives promise
    //Return jsonwebtoken
    const payload = {
      user:{
        id: user.id
      }
    }
    //profile = new Profile(user);
    //await profile.save();
    //Sätt expires till mindre när allt är klart, högt värde för testning
    jwt.sign(payload, config.get('jwtSecret'),{expiresIn: 999999},
    (err, token) =>{
        if(err) throw err;
        res.json({token});
    });


  }catch(err){
    console.error(err.message);
    res.status(500).send('Server error');
  }

});

module.exports = router;
