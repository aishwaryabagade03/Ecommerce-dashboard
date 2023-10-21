import express from "express";
import {
  AddtoCart,
  Getcartitems,
  Updatequantity,
  Deletequantity,
  Removecartitem,
} from "../Controllers/CartController";

const router = express.Router();
router.get("/get-cart-items/:user_id", Getcartitems);
router.post("/add-to-cart", AddtoCart);
router.put("/update-quantity/:cart_id", Updatequantity);
router.delete("/delete-quantity/:cart_id", Deletequantity);
router.delete("/remove-item/:cart_id", Removecartitem);

export default router;
