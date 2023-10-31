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
    type: String,
    required: true,
  },
  DOB: {
    type: Date,
    default: null,
  },
  Gender: {
    type: String,
    default: null,
  },
  About: {
    type: String,
    default: null,
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
