import mongoose from "mongoose";
import CategoryModel from "./CategoryModel";
import SubcategoryModel from "./SubcategoryModel";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: CategoryModel,
  },
  Subcategory: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: SubcategoryModel,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Array,
    required: true,
  },
  shortdescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
    maxLength: 500,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 1,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Product", ProductSchema);
