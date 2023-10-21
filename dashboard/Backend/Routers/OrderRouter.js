import express from "express";
import {
  AddOrder,
  Getorderitems,
  Deleteorder,
} from "../Controllers/OrderController";

const router = express.Router();
router.post("/add-order", AddOrder);
router.get("/get-order-items", Getorderitems);
router.delete("/delete-order/_order:id", Deleteorder);

export default router;
