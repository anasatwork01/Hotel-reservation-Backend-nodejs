var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
const User = require("../models/User");
const createError = require('../utils/error');


exports.register = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(201).send("User has been created");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({username:req.body.username});
    if(!user) return next(createError(404,"User not found!"));
    
    const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
    if(!isPasswordCorrect) return next(createError(400,"Wrong Password or Username!"));

    const token = jwt.sign({id:user._id,isadmin:user.isadmin} , process.env.JWT);

    const {password,isadmin,...otherDetails} = user._doc;
    res.cookie("access_token",token,{
        httpOnly:true
    }).status(201).json(otherDetails);
  } catch (err) {
    next(err);
  }
};
