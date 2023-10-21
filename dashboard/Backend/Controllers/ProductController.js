import ProductModel from "../Models/ProductModel";
import multer from "multer";
import fs from "fs";
import path from "path";
import Cookies from "cookies";
const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./Upload/product")) {
      cb(null, "./Upload/product");
    } else {
      fs.mkdirSync("./Upload/product");
      cb(null, "./Upload/product");
    }
  },
  filename: function (req, file, cb) {
    const name = file.originalname;
    const lastname = path.extname(name);
    const split = name.split(".");
    split.pop();
    const firstname = split.join(".");
    const fullname = firstname + "-" + Date.now() + lastname;
    cb(null, fullname);
  },
});

const Upload = multer({ storage: Storage });

export const AddProduct = (req, res) => {
  try {
    const Imgdata = Upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "image", maxCount: 3 },
    ]);
    console.log(Imgdata);
    Imgdata(req, res, function (error) {
      if (error) return res.status(400).json({ message: error.message });

      const {
        name,
        category,
        Subcategory,
        quantity,
        price,
        shortdescription,
        description,
        status,
      } = req.body;

      let image = [];
      let thumbnail = null;

      if (req.files && req.files["thumbnail"]) {
        thumbnail = req.files["thumbnail"][0].filename;
      }
      console.log(req.files);
      if (req.files && req.files["image"]) {
        req.files["image"].forEach((file) => {
          image.push(file.filename);
        });
      }

      const ProductData = new ProductModel({
        name: name,
        category: category,
        Subcategory: Subcategory,
        quantity: quantity,
        price: price,
        shortdescription: shortdescription,
        description: description,
        thumbnail: thumbnail,
        image: image.join(","),
        status: status,
      });

      ProductData.save();
      console.log(ProductData.image);

      const validationError = ProductData.validateSync();
      if (validationError) {
        return res.status(400).json({ message: validationError.message });
      }

      if (ProductData) {
        return res.status(201).json({
          data: ProductData,
          message: "Success",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Getallproducts = async (req, res) => {
  try {
    const ProductData = await ProductModel.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categories",
        },
      },
      { $unwind: "$categories" },
      {
        $lookup: {
          from: "subcategories",
          localField: "Subcategory",
          foreignField: "_id",
          as: "subcategories",
        },
      },
      { $unwind: "$subcategories" },
    ]);
    if (ProductData) {
      return res.status(200).json({
        data: ProductData,
        message: "Success",
      });
    }
    // console.log('Response:', someVariableContainingData);
    console.log(ProductData);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const Getproduct = async (req, res) => {
  try {
    const productid = req.params.product_id;
    const ProductData = await ProductModel.findOne({ _id: productid });
    const image = ProductData.image.split(",");
    for (var i = 0; i < image.length; i++) {
      console.log(image[i]);
    }
    if (ProductData) {
      return res.status(200).json({
        data: ProductData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Lowprice = async (req, res) => {
  try {
    const { min } = req.query;
    let filtered = {};
    if (min !== undefined) {
      filtered = {
        $or: [{ price: { $gte: min } }],
      };
    }
    const ProductData = await ProductModel.find(filtered).sort({ price: 1 });
    if (ProductData) {
      return res.status(200).json({
        data: ProductData,
        message: "Sort Low to High price",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Highprice = async (req, res) => {
  try {
    const { max } = req.query;
    let filtered = {};
    if (max !== undefined) {
      filtered = {
        $or: [{ price: { $lte: max } }],
      };
    }
    const ProductData = await ProductModel.find(filtered).sort({ price: -1 });
    if (ProductData) {
      return res.status(200).json({
        data: ProductData,
        message: "Sort High to Low price",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Updateproduct = async (req, res) => {
  try {
    const Imgdata = Upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "image", maxCount: 3 },
    ]);
    Imgdata(req, res, function (err) {
      if (err) return res.status(400).json({ message: err.message });
    });
    let thumbnail = ProductData.thumbnail;
    let image = [];
    if (req.files && req.files["thumbnail"]) {
      thumbnail = req.files["thumbnail"][0].filename;
      if (fs.existsSync("./Upload/product" + ProductData.thumbnail)) {
        fs.unlinkSync("./Upload/product" + ProductData.thumbnail);
      }
    }
    if (req.files && req.files["image"]) {
      req.files["image"].forEach((file) => {
        image.push(file.filename);
        for (var i = 0; i < image.length; i++) {
          if (fs.existsSync("./Upload/product" + ProductData.image[i])) {
            fs.unlinkSync("./Upload/product" + ProductData.image[i]);
          }
        }
      });
    }
    const {
      name,
      category,
      Subcategory,
      quantity,
      price,
      shortdescription,
      description,
      status,
    } = req.body;
    const ProductData = await ProductModel.findOne({ _id: productid });
    const productid = req.params.product_id;
    const Updatedproduct = await ProductModel.updateOne(
      { _id: productid },
      {
        $set: {
          name: name,
          category: category,
          Subcategory: Subcategory,
          quantity: quantity,
          price: price,
          shortdescription: shortdescription,
          description: description,
          thumbnail: thumbnail,
          image: image.join(","),
          status: status,
        },
      }
    );
    if (Updatedproduct.acknowledged) {
      return res.status(200).json({
        data: Updatedproduct,
        message: "Updated Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Deleteproduct = async (req, res) => {
  try {
    const productid = req.params.product_id;
    const ProductData = await ProductModel.findOne({ _id: productid });
    let image = ProductData.image.split(",");
    for (var i = 0; i < image.length; i++) {
      if (fs.existsSync("./Upload/product" + ProductData.image[i])) {
        fs.unlinkSync("./Upload/product" + ProductData.image[i]);
      }
    }
    if (fs.existsSync("./Upload/product" + ProductData.thumbnail)) {
      fs.unlinkSync("./Upload/product" + ProductData.thumbnail);
    }
    const Deletedproduct = await ProductModel.deleteOne({ _id: productid });
    if (Deletedproduct.acknowledged) {
      return res.status(200).json({
        message: "Data Successfully deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
