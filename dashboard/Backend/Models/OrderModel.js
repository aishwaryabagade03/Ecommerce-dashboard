import mongoose from "mongoose";
import CartModel from "./CartModel";
import UserModel from "./UserModel";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  OrderID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  UserID: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  CartID: {
    type: Schema.Types.ObjectId,
    ref: CartModel,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  paymentmethod:{
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  thumbnail: {
    type: String,
    required: true,
  },
  Orderdate: {
    type: Date,
    default: Date.now(),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Order", OrderSchema);
