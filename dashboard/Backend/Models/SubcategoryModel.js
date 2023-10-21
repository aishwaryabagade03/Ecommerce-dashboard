import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubcategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  image: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
},
});

export default mongoose.model("Subcategory", SubcategorySchema);
