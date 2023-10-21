import express from "express";
import {
  Getallproducts,
  Getproduct,
  AddProduct,
  Highprice,
  Lowprice,
  Updateproduct,
  Deleteproduct,
} from "../Controllers/ProductController";

const router = express.Router();
router.get("/get-all-products", Getallproducts);
router.post("/add-product", AddProduct);
router.get("/get-product/:product_id", Getproduct);
router.get("/low-price", Lowprice);
router.get("/high-price", Highprice);
router.put("/update-product/:product_id", Updateproduct);
router.delete("/delete-product/:product_id", Deleteproduct);

export default router;
