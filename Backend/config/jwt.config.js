const jwt = require("jsonwebtoken");


module.exports.authenticate = (req, res, next) => {
  try{
  const token=req.cookies.usertoken;
  const verified=jwt.verify(token, process.env.SECRET_KEY);
    if (!token) { 
     res.status(401).json({verified: false});
    } 
    if(!verified){
      return res.status(401).json({msg: "Token verification failed, authorization denied"});
    }
    req.user=verified.id;
     next();
    
  }
  catch (err) {
    res.status(500).json({verified: false  });
    }
}
