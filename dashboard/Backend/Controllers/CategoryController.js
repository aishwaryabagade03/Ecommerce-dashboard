import CategoryModel from "../Models/CategoryModel";
import multer from "multer";
import fs from "fs";
import path from "path";

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./Upload/category")) {
      cb(null, "./Upload/category");
    } else {
      fs.mkdirSync("./Upload/category");
      cb(null, "./Upload/category");
    }
  },
  filename: function (req, file, cb) {
    const name = file.originalname;
    const endname = path.extname(name);
    const split = name.split(".");
    split.pop();
    const firstname = split.join(".");
    const Fullname = firstname + "-" + Date.now() + endname;
    cb(null, Fullname);
  },
});
const upload = multer({ storage: Storage });
export const Addcategory = async (req, res) => {
  try {
    const Imgdata = upload.single("image");
    Imgdata(req, res, function (err) {
      if (err) return res.status(400).json({ message: err.message });
      const { name } = req.body;
      let image = null;
      if (req.file != undefined) {
        image = req.file.filename;
      }

      const CategoryData = new CategoryModel({
        name: name,
        image: image,
      });
      CategoryData.save();
      console.log(CategoryData);
      if (CategoryData) {
        return res.status(201).json({
          data: CategoryData,
          message: "Successfully Added",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const AllCategories = async (req, res) => {
  try {
    const CategoryData = await CategoryModel.find();
    if (CategoryData) {
      return res.status(200).json({
        data: CategoryData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const GetCategory = async (req, res) => {
  try {
    const categoryid = req.params.category_id;
    const CategoryData = await CategoryModel.findOne({ _id: categoryid });
    if (CategoryData) {
      return res.status(200).json({
        data: CategoryData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const UpdateCategory = async (req, res) => {
  try {
    const Imgdata = upload.single("image");
    Imgdata(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });
      const categoryid = req.params.category_id;
      const { name } = req.body;
      const CategoryData = await CategoryModel.findOne({ _id: categoryid });

      let image = CategoryData.image;
      if (req.file !== undefined) {
        image = req.file.filename;
        if (fs.existsSync("./Upload/category" + CategoryData.image)) {
          fs.unlinkSync("./Upload/category" + CategoryData.image);
        }
      }

      const UpdatedData = await CategoryModel.updateOne(
        { _id: categoryid },
        {
          $set: {
            name: name,
            image: image,
          },
        }
      );
      if (UpdatedData.acknowledged) {
        return res.status(200).json({
          data: UpdatedData,
          message: "Updated",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const DeleteCategory = async (req, res) => {
  try {
    const categoryid = req.params.category_id;
    const CategoryData = await CategoryModel.findOne({ _id: categoryid });
    if (req.file !== undefined) {
      image = req.file.filename;
      if (fs.existsSync("./Upload/category" + CategoryData.image)) {
        fs.unlinkSync("./Upload/category" + CategoryData.image);
      }
    }
    const DeletedData = await CategoryModel.deleteOne({ _id: categoryid });
    if (DeletedData.acknowledged) {
      return res.status(200).json({
        message: "Deleted",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
