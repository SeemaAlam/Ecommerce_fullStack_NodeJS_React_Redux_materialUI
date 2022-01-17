const express=require("express")
const cors=require("cors")
const app=express();
const mongoose=require("mongoose")
const dotenv=require("dotenv");
dotenv.config();
const userroute=require("./routes/user.route")
const authroute=require("./routes/auth.route")
const productroute=require("./routes/product.route")
const cartroute=require("./routes/cart.route")
const orderroute=require("./routes/order.route")
const payroute=require("./routes/stripe")


app.use(cors())


const port=process.env.PORT || 3333


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connected to server")
})
.catch((err)=>{
    console.log(err)
})

app.use(express.json());


app.use("/user",userroute)
app.use("/auth",authroute)
app.use("/getproduct",productroute)
app.use("/order",orderroute)
app.use("/cart",cartroute)
app.use("/payment",payroute)

app.listen(port,()=>{
    console.log("port is running",port)
})