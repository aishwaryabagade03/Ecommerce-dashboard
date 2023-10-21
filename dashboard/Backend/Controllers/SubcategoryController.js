import SubcategoryModel from "../Models/SubcategoryModel";
import multer from "multer";
import fs from "fs";
import path from "path";

const Storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./Upload/Subcategory")) {
      cb(null, "./Upload/Subcategory");
    } else {
      fs.mkdirSync("./Upload/Subcategory");
      cb(null, "./Upload/Subcategory");
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
export const Addsubcategory = async (req, res) => {
  try {
    const Imgdata = upload.single("image");
    Imgdata(req, res, function (err) {
      if (err) return res.status(400).json({ message: err.message });
      const { name, category } = req.body;
      let image = null;
      if (req.file != undefined) {
        image = req.file.filename;
      }
      const SubcategoryData = new SubcategoryModel({
        name: name,
        category: category,
        image: image,
      });
      SubcategoryData.save();
      if (SubcategoryData) {
        return res.status(201).json({
          data: SubcategoryData,
          message: "Successfully added",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const AllSubcategories = async (req, res) => {
  try {
    const SubcategoryData = await SubcategoryModel.find();
    if (SubcategoryData) {
      return res.status(200).json({
        data: SubcategoryData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const GetSubcategory = async (req, res) => {
  try {
    const Subcategoryid = req.params.Subcategory_id;
    const SubcategoryData = await SubcategoryModel.findOne({
      _id: Subcategoryid,
    });
    if (SubcategoryData) {
      return res.status(200).json({
        data: SubcategoryData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const UpdateSubcategory = async (req, res) => {
  try {
    const Imgdata = upload.single("image");
    Imgdata(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });
      const SubcategoryData = await SubcategoryModel.findOne({
        _id: Subcategoryid,
      });
      let image = SubcategoryData.image;
      if (req.file !== undefined) {
        image = req.file.filename;
        if (fs.existsSync("./Upload/Subcategory" + SubcategoryData.image)) {
          fs.unlinkSync("./Upload/Subcategory" + SubcategoryData.image);
        }
      }
      const Subcategoryid = req.params.Subcategory_id;
      const { name, category } = req.body;
      const UpdatedSubcategoryData = await SubcategoryModel.updateOne(
        {
          _id: Subcategoryid,
        },
        {
          $set: {
            name: name,
            category: category,
            image: image,
          },
        }
      );
      if (UpdatedSubcategoryData.acknowledged) {
        return res.status(200).json({
          data: UpdatedSubcategoryData,
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

export const DeleteSubcategory = async (req, res) => {
  try {
    const Subcategoryid = req.params.Subcategory_id;
    const SubcategoryData = await SubcategoryModel.findOne({
      _id: Subcategoryid,
    });
    if (req.file !== undefined) {
      image = req.file.filename;
      if (fs.existsSync("./Upload/Subcategory" + SubcategoryData.image)) {
        fs.unlinkSync("./Upload/Subcategory" + SubcategoryData.image);
      }
    }
    const DeletedData = await SubcategoryModel.deleteOne({
      _id: Subcategoryid,
    });
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
