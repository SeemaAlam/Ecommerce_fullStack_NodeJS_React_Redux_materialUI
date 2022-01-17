const router=require("express").Router();
const User=require("../models/User.model")
const CryptoJS=require("crypto-js")
var jwt = require('jsonwebtoken');

//-----------------------Register---------------------------//


// var encrypted = CryptoJS.AES.encrypt("Message", "Secret Passphrase");
// ​
// var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");

router.post("/register", async (req,res)=>{

    const user=new User({
       username: req.body.username,
       email:req.body.email,
       password:  CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),  
    });

    try{
        const newuser=await user.save();
        res.status(201).json(newuser)
    }
    catch(err){
        res.status(500).json(err)
    }
  

})

router.post("/login", async (req,res)=>{

    try{
        const user=await User.findOne({ username:req.body.username  });

    if(!user){
        res.status(401).json("user does not exist")
    }

    const decrypted= CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

    const pass=decrypted.toString(CryptoJS.enc.Utf8);

    const accesstoken =jwt.sign({
        id:user._id, isAdmin:user.isAdmin,
    },process.env.JWT_SEC,{
        expiresIn:"3d"
    })

    if(pass!==req.body.password){
        res.status(401).json("wrong password")
    }

    const {password, ...others}=user._doc;

    res.status(200).json({...others, accesstoken});

    }
    catch(err){
        res.status(500).json(err)
    }
  

})


module.exports=router