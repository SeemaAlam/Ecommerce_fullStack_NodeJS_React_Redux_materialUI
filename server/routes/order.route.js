const { verifyAuthorization, verifyAdmin } = require("./verifyToken");
const Order = require("../models/Order.model");

const router = require("express").Router();

router.post("/", verifyAuthorization, async (req, res) => {
    const newOrder = new Order(req.body)
    try {

        const saveOrder=await newOrder.save();
        return res.status(200).json(saveOrder);
      
    } catch (err) {
      return res.status(500).json(err);
    }
  });
  
//getz all order of perticular user Order by user id
router.get("/find/:userId", verifyAuthorization ,async (req, res) => {
  try {
    const orders = await Order.find({userId:req.params.userId});

    return res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json(err);
  }
});


//all Orders

router.get("/", verifyAdmin,  async (req, res) => {

  try {
    const orders =await Order.find();
    
    return res.status(200).json(orders);

  } catch (err) {
    return res.status(500).json(err);
  }
});


//get monthly income
router.get("/income", verifyAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.put("/one/:id", verifyAdmin, async (req, res) => {

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(201).json(updatedOrder);
  } catch (err) {
    return res.status(500).json(err);
  }
});



router.delete("/one/:id", verifyAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    return res.status(200).json("product deleted from Order");
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
