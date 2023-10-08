const jwt=require('jsonwebtoken')
const userModel = require('../models/userModel');

const checkToken= (req,res,next)=>{
    const token=req.headers.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {
        req.user=null;
        // Verify the token
        const decoded =jwt.verify(token, process.env.SECRET_KEY);
        // Attach the decoded user information to the request for further use
        req.user = decoded.username;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

const checkUser= (req,res,next)=>{
    const username=req.user;
    
    userModel.findOne({username})
    .then(result=>{
        if(result)next();
        else return res.status(401).json({ message: 'Unauthorized: user does not exist' });
    })
    .catch(err=>{
        return res.status(401).json({ message: 'Unauthorized: user does not exist' });
    })
}

module.exports={
    checkToken,
    checkUser
}