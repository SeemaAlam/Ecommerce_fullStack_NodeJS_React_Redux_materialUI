const { verifyAuthorization, verifyAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const router = require("express").Router();

router.get("/one/:id", verifyAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { password, ...others } = user._doc;

    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});


//all users

router.get("/", verifyAdmin, async (req, res) => {
  const query = req.query.new;

  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(1)
      : await User.find();

    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json(err);
  }
});

//user data and stats

router.get("/stats", verifyAdmin, async (req, res) => {
    const date=new Date()
    const lastyear=new Date(date.setFullYear(date.getFullYear()-1))

    try {
      const data = await User.aggregate([
          {$match:{createdAt:{$gte:lastyear}}},
          {$project:{
              month:{$month:"$createdAt"}

          }},{
              $group:{
                  _id:"$month",
                  total:{$sum:1}
              }
          }

      ]);
  
      return res.status(200).json(data);

    } catch (err) {
      return res.status(500).json(err);
    }
  });

router.put("/one/:id", verifyAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updateduser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(201).json(updateduser);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.delete("/one/:id", verifyAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json("user deleted successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
