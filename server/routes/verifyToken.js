var jwt = require('jsonwebtoken')

const verifytoken=(req,res,next)=>{
   const authheaders=req.headers.token;


   if(authheaders){

    const token=authheaders.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
        if(err){
        return res.status(403).json("Invalid token")
        }
        req.user=user;
        next();
        

    });

   }else{
       return res.status(401).json("you are not authonticate")
   }
}


//all users
const verifyAuthorization=(req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
          next()
        }else{
            return res.status(403).json("not authonticate to make changes")
        }
    })
}


//only admis
const verifyAdmin=(req,res,next)=>{
    verifytoken(req,res,()=>{
        if(req.user.isAdmin){
          next()
        }else{
            return res.status(403).json("not authonticate to make changes")
        }
    })
}


module.exports={verifytoken,verifyAuthorization,verifyAdmin};