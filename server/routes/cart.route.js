const { verifyAuthorization, verifyAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Cart = require("../models/Cart.model");

const router = require("express").Router();

router.post("/", verifyAuthorization, async (req, res) => {
    const newproduct = new Cart(req.body)
    try {

        const savecart=await newproduct.save();
        return res.status(200).json(savecart);
      
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
//get cart by user id
router.get("/find/:userId", verifyAuthorization ,async (req, res) => {
  try {
    const cart = await Cart.findOne({userId:req.params.userId});

    return res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json(err);
  }
});


//all carts

router.get("/", verifyAdmin,  async (req, res) => {

  try {
    const carts =await Cart.find();
    
    return res.status(200).json(carts);

  } catch (err) {
    return res.status(500).json(err);
  }
});


router.put("/one/:id", verifyAuthorization, async (req, res) => {

  try {
    const updatedcart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(201).json(updatedcart);
  } catch (err) {
    return res.status(500).json(err);
  }
});



router.delete("/one/:id", verifyAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    return res.status(200).json("product deleted from cart");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
