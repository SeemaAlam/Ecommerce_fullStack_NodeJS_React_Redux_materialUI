const { verifyAuthorization, verifyAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const Product = require("../models/Product.model");

const router = require("express").Router();

router.post("/", verifyAdmin, async (req, res) => {
    const newproduct = new Product(req.body)
    try {

        const saveprod=await newproduct.save();
        return res.status(200).json(saveprod);
      
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  

router.get("/one/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(200).json(product);
  } catch (err) {
    return res.status(500).json(err);
  }
});


//all products

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/one/:id", verifyAdmin, async (req, res) => {

  try {
    const updatedproduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(201).json(updatedproduct);
  } catch (err) {
    return res.status(500).json(err);
  }
});



router.delete("/one/:id", verifyAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).json("product deleted successfully");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
