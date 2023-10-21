import OrderModel from "../Models/OrderModel";
import CartModel from "../Models/CartModel";
import Cookies from "cookies";
import jwt from "jsonwebtoken";

export const AddOrder = async (req, res) => {
  try {
    const { UserID, CartID } = req.body;
    const Cartdata = await CartModel.find({ _id: CartID });
    const Orderdata = new OrderModel({
      UserID: UserID,
      CartID: CartID,
      ProductID: Cartdata.ProductID,
      name: Cartdata.name,
      city: city,
      price: Cartdata.price,
      quantity: Cartdata.quantity,
      paymentmethod: paymentmethod,
      thumbnail: Cartdata.thumbnail,
    });
    Orderdata.save();
    const Token = await jwt.sign(
      {
        ID: OrderID._id,
      },
      "SecretKey",
      { expiresIn: "3d" }
    );
    if (Orderdata) {
      return res.status(201).json({
        data: Orderdata,
        token: Token,
        message: "Order Successfully added",
        bill: Cartdata.quantity * Cartdata.price,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Getorderitems = async (req, res) => {
  try {
    const UserID = req.params.user_id;
    const Orderdata = await OrderModel.findOne({ _id: UserID });
    if (Orderdata) {
      return res.status(200).json({
        data: Orderdata,
        message: "Order Items",
      });
    }
    var cookies = new Cookies(req, res);
    cookies.set("Orders", JSON.stringify(Orderdata));
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Deleteorder = async (req, res) => {
  try {
    const OrderID = req.params.order_id;
    const Cancelorder = await OrderModel.deleteOne({ _id: OrderID });
    if (Cancelorder.acknowledged) {
      return res.status(200).json({
        message: "Order Cancelled",
      });
    }
    var cookies = new Cookies(req, res);
    cookies.set("Orders", null);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
