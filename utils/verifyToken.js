const jwt = require("jsonwebtoken");
const createError = require("../utils/error.js");


exports.verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(createError(401,"You are not authenticated"));
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err) return next(createError(403,"Token is not Valid"));
        req.user=user;
        console.log(user);
        next();
    })
}

exports.verifyUser = (req,res,next)=>{
    this.verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.isadmin){
            next()
        }else{
            return next(createError(401,"You are not Authorized"));
        }
    })
}

exports.verifyAdmin = (req,res,next)=>{
    this.verifyToken(req,res,next, ()=>{
        if(req.user.isadmin){
            next()
        }else{
            return next(createError(401,"You are not Authorized"));
        }
    })
}
