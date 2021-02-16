const {User} = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
module.exports.register = (req, res) => {
  
    User.create(req.body)
      .then(user => {
        const payload = {
            id: user._id
          };
          const userToken = jwt.sign(payload, process.env.SECRET_KEY);
          
          res.cookie("userToken", userToken, { httpOnly: true }).json({
            message: "This response has a cookie" , user : user , token: userToken
          });
          res.json({ msg: "success!", user: user , token: userToken });
      })
      .catch(err => res.json(err));
  }
  module.exports.login= async(req, res) => {
    try{
      const{email,password}=req.body;
      if (!email|| !password){
        return res.status(400).json({ msg: "Not all fields have been entered." });
      }
      const user = await User.findOne({ email: req.body.email });
       if(user === null) {
                // email not found in users collection
                return res.sendStatus(400);
            }
         const correctPassword = await bcrypt.compare(req.body.password, user.password);
         if(!correctPassword) {
                  // password wasn't a match!
                  return res.sendStatus(400);
              }
        const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);
                res
                    .cookie("usertoken", userToken, {
                        httpOnly: true
                    })
                    .json({ msg: "success!" });
            }
            catch (err) {
              res.status(500).json({ error: err.message });
              } 
    }
        
     
       
     
 
     
        // note that the response object allows chained calls to cookie and json
   
    module.exports.logout=(req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    }
    module.exports.getAll = (request, response) => {
       User.find({})
         .then(persons => response.json(persons))
            .catch(err => response.json(err))
    }