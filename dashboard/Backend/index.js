import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import stripe from "stripe"
const stripeClient = stripe("sk_test_51NuVY0SBwK9ePU2bSXSQunMDYUeW3lhOp3UgAveJiAa4GVskcOJu7AhndGoqRyxvZljQBHROUMzn42ZWU1OZHI7p009brYib54");

import Userrouter from "../Backend/Routers/UserRouter";
import Categoryrouter from "../Backend/Routers/CategoryRouter";
import Subcategoryrouter from "../Backend/Routers/SubcategoryRouter";
import Productrouter from "../Backend/Routers/ProductRouter";
import Cartrouter from "../Backend/Routers/CartRouter";
import Orderrouter from "../Backend/Routers/OrderRouter";

var app = express();
app.use(express.json());
app.use(express.static(__dirname));
app.use(cors(corsOptions))
var corsOptions={
  origin: "*",
  optionsSuccessStatus: 200,
}

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log("Your server running on http://localhost:" + PORT);
});

// checkout
app.post("/checkout",async(req,res)=>{
  const {products} = req.body;
  console.log(products)
  const lineItems = products.map((product)=>({
      price_data:{
          currency:"usd",
          product_data:{
              name:product.name,
              images: [product.thumbnail],
          },
          unit_amount:product.price * 100,
      },
      quantity:product.quantity
  }));

  const session = await stripeClient.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"http://localhost:3000/success",
      cancel_url:"http://localhost:3000/cancel",
  });

  res.json({id:session.id})

})

mongoose
  .connect("mongodb://127.0.0.1:27017/" + process.env.dbname)
  .then(() => console.log("Connected!"));

app.use("/User", Userrouter);
app.use("/Category", Categoryrouter);
app.use("/Subcategory", Subcategoryrouter);
app.use("/Product", Productrouter);
app.use("/Cart", Cartrouter);
app.use("/Order", Orderrouter);
