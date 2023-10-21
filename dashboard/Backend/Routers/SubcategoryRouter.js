import express from "express";
import {
  Addsubcategory,
  AllSubcategories,
  GetSubcategory,
  UpdateSubcategory,
  DeleteSubcategory,
} from "../Controllers/SubcategoryController";

const router = express.Router();
router.post("/add-subcategory", Addsubcategory);
router.get("/all-subcategories", AllSubcategories);
router.get("/get-subcategory/:Subcategory_id", GetSubcategory);
router.put("/update-subcategory/:Subcategory_id", UpdateSubcategory);
router.delete("/delete-subcategory/:Subcategory_id", DeleteSubcategory);

export default router;
