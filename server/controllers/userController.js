const user = require('../models/user')
const bcrypt = require('bcryptjs') // install
const jwt = require('jsonwebtoken') // install it if dont have it

// sign up for new user
exports.signUp = async (req, res) => {
    const body = req.body
    const hashedpassword = bcrypt.hashSync(req.body.password,10)
    if(!body.name || !body.password || !body.email){
        res.json({message:'All fields required', success: false})
    }
    else{
        const details = await user.create(req.body)
        details.password = hashedpassword
        await details.save()
        res.json({message:'successfully', success:true})
    }
}

// sign in user
exports.signinUser = async (req, res) => {
    if(req.body.email == '' || req.body.password == '') {
      res.json({
        message:`Please fill in required input field`,
        auth: false
      })
    }
    else {
      await user.findOne({email:req.body.email}, (err, user) => {
      if (err) {
        res.json({
          message:`Unable to complete task`,
          auth: false
        })
      }  
      else if (!user) {
        res.json({
          message:`Wrong or invalid email address`,
          auth: false
        })
      }
      else{
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
          res.json({
            message:`Wrong password`,
            auth:false,
            token:null
          })
        }
        else { // RETURN USER TOKEN
            const token = jwt.sign({id:user.id, email:user.email, name: user.name}, config.secret)
    
            res.json({
              message: `Login was successful`,
              auth:true,
              token:token
            })
        }
      }
    
     })
    }
  }

//get all user
exports.getAllUser = async (req, res) => {
    const users = await user.find().sort({'_id':-1})
    res.json({info: users})
}

//get single user
exports.getSingleUser = async (req, res) => {
    const details = await user.findOne({_id: req.params.id})
    res.json({info: details})
}

//update user profile
exports.updateProfile = async (req, res) => {
    const hashedpassword = bcrypt.hashSync(req.body.password,10)
    const profile = await user.findOne({_id:req.params.id})
    if(!profile){
        res.json({message:' user not found'})
    }
    profile.name = req.body.name || profile.name
    profile.email = req.body.email || profile.email
    profile.password = hashedpassword || profile.password
    await profile.save()
    res.json({message: 'user profile successfully updated', info: profile})
}