import {
  Addcategory,
  GetCategory,
  AllCategories,
  UpdateCategory,
  DeleteCategory,
} from "../Controllers/CategoryController";
import express from "express";

const router = express.Router();
router.get("/all-categories", AllCategories);
router.post("/add-category", Addcategory);
router.get("/get-category/:category_id", GetCategory);
router.put("/update-category/:category_id", UpdateCategory);
router.delete("/delete-category/:category_id", DeleteCategory);
export default router;
