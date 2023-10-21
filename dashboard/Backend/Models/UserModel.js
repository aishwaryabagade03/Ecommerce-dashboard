import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Phonenumber: {
    type: Number,
    required: true,
  },
  DOB: {
    type: Date,
    required: true,
  },
  Gender: {
    type: String,
    required: true,
  },
  About: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  OTP: {
    type: Number,
    default: null,
  },
  Status: {
    type: String,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("User", UserSchema);
