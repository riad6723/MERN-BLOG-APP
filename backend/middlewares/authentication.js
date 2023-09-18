const jwt=require('jsonwebtoken')
const authenticateUser= (req,res,next)=>{
    const token=req.headers.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    try {
        req.user=null;
        // Verify the token
        const decoded =jwt.verify(token, process.env.SECRET_KEY);
        // Attach the decoded user information to the request for further use
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
   
}

module.exports={
    authenticateUser
}