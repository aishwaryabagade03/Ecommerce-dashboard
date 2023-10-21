import CartModel from "../Models/CartModel";
import ProductModel from "../Models/ProductModel";

export const Getcartitems = async (req, res) => {
  try {
    const UserID = req.params.user_id;
    const Cartdata = await CartModel.find({ UserID: UserID });
    if (Cartdata) {
      return res.status(200).json({
        data: Cartdata,
        message: "Cart Items",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const AddtoCart = async (req, res) => {
  try {
    const { UserID, ProductID } = req.body;
    const ProductData = await ProductModel.findOne({ _id: ProductID });

    const existCartItem = await CartModel.findOne({
      ProductID: ProductID,
      UserID: UserID,
    });
    if (existCartItem) {
      let quantity = existCartItem.quantity + 1;
      const updatedItem = await CartModel.updateOne(
        { _id: existCartItem._id },
        {
          $set: {
            quantity: quantity,
          },
        }
      );
      if (updatedItem.acknowledged) {
        return res.status(200).json({
          data: updatedItem,
          message: "updated",
        });
      }
    }
    const CartData = new CartModel({
      UserID: UserID,
      ProductID: ProductID,
      name: ProductData.name,
      price: ProductData.price,
      quantity: 1,
      thumbnail: ProductData.thumbnail,
    });
    CartData.save();
    if (CartData) {
      return res.status(201).json({
        data: CartData,
        message: "Successfully added",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Updatequantity = async (req, res) => {
  try {
    const CartID = req.params.cart_id;
    const { updatetype } = req.body;
    const { ProductID } = req.body;
    const Cartdata = await CartModel.findOne({ _id: CartID });
    const ProductData = await ProductModel.findOne({ _id: ProductID });
    let quantity = Cartdata.quantity;
    let price = ProductData.price;
    if (updatetype === "increment") {
      quantity += 1;
      price = price * quantity;
    }
    if (updatetype === "decrement") {
      quantity -= 1;
      price = price * quantity;
    }
    const Updatedquantity = await CartModel.updateOne(
      { _id: CartID },
      {
        $set: {
          quantity: quantity,
          price: price,
        },
      }
    );
    if (Updatedquantity.acknowledged) {
      return res.status(200).json({
        message: "Updated",
      });
    }
    console.log(Updatedquantity);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Deletequantity = async (req, res) => {
  try {
    const CartID = req.params.cart_id;
    const Cartdata = await CartModel.findOne({ _id: CartID });
    let quantity = Cartdata.quantity <= 0;
    if (quantity) {
      Deletequantity = await CartModel.deleteOne({ _id: CartID });
    }
    if (Deletequantity.acknowledged) {
      return res.status(200).json({
        data: Deletequantity,
        message: "Quantity Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Removecartitem = async (req, res) => {
  try {
    const CartID = req.params.cart_id;
    const Deleteitem = await CartModel.deleteOne({ _id: CartID });
    if (Deleteitem.acknowledged) {
      return res.status(200).json({
        message: "Cart item deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
