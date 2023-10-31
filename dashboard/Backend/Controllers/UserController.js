import UserModel from "../Models/UserModel";
import validator from "validator";
import bcrypt from "bcrypt";
import otpgenerator from "otp-generator";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./Upload/user")) {
      cb(null, "./Upload/user");
    } else {
      fs.mkdirSync("./Upload/user");
      cb(null, "./Upload/user");
    }
  },
  filename: function (req, file, cb) {
    const name = file.originalname;
    const last = path.extname(name);
    const namearr = name.split(".");
    namearr.pop();
    const Nname = namearr.join();
    const Newname = Nname + "-" + Date.now() + last;
    cb(null, Newname);
  },
});
const upload = multer({ storage: storage });
export const Userrecords = async (req, res) => {
  try {
    const UserData = await UserModel.find();
    if (UserData) {
      return res.status(200).json({
      data:UserData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Adduser = async (req, res) => {
  try {
    const Uploaddata = upload.single("image");
    Uploaddata(req, res, function (err) {
      if (err) return res.status(400).json({ message: err.message });
      const {
        Name,
        Email,
        Password,
        Phonenumber,
        DOB,
        Gender,
        About,
        OTP,
        Status,
      } = req.body;
      let image = null;
      if (req.file !== undefined) {
        image = req.file.filename;
      }
      const hashPassword = bcrypt.hashSync(Password, 10);
      const UserData = new UserModel({
        Name:Name,
        Email: Email,
        Password: hashPassword,
        Phonenumber: Phonenumber,
        DOB: DOB,
        Gender: Gender,
        About: About,
        image: image,
        OTP: OTP,
        Status: Status,
      });
      UserData.save();
      if (UserData) {
        return res.status(201).json({
          data: UserData,
          message: "Created",
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Getuser = async (req, res) => {
  try {
    const id = req.params.user_id;
    const UserData = await UserModel.findOne({ _id: id });
    if (UserData) {
      return res.status(200).json({
        data: UserData,
        message: "Success",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Updateuser = async (req, res) => {
  try {
    const Uploaddata = upload.single("image");
    Uploaddata(req, res, async function (err) {
      if (err) return res.status(400).json({ message: err.message });

      const id = req.params.user_id;

      const {
        Name,
        Email,
        Password,
        Phonenumber,
        DOB,
        Gender,
        About,
        OTP,
        Status,
      } = req.body;

      const UserData = await UserModel.findOne({ _id: id });
      console.log(UserData);
      let image = UserData.image;

      if (req.file !== undefined) {
        image = req.file.filename;
        if (fs.existsSync("./Upload/user/" + UserData.image)) {
          fs.unlinkSync("./Upload/user/" + UserData.image);
        }
      }

      const Updateduser = await UserModel.updateOne(
        { _id: id },
        {
          $set: {
            Name:Name,
            Email: Email,
            Password: Password,
            Phonenumber: Phonenumber,
            DOB: DOB,
            Gender: Gender,
            About: About,
            image: image,
            OTP: OTP,
            Status: Status,
          },
        }
      );
      if (Updateduser.acknowledged) {
        return res.status(201).json({
          data: Updateduser,
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

export const Deleteuser = async (req, res) => {
  try {
    const id = req.params.user_id;
    const UserData = await UserModel.findOne({ _id: id });
    if (req.file !== undefined) {
      Avatar = req.file.filename;
      if (fs.existsSync("./Upload/user/" + UserData.Avatar)) {
        fs.unlinkSync("./Upload/user/" + UserData.Avatar);
      }
    }
    const Deleteduser = await UserModel.deleteOne({ _id: id });
    if (Deleteduser.acknowledged) {
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

export const Signup = async (req, res) => {
  try {
    const { Name, Email, Password, Phonenumber } = req.body;
    const IsEmail = validator.isEmail(Email);
    const IsPassword = validator.isStrongPassword(Password);
    if (!IsEmail) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }
    if (!IsPassword) {
      return res.status(400).json({
        message: "Passsword must be minLength: 6",
      });
    }
    const Userexist = await UserModel.findOne({ Email: Email });
    if (Userexist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    const passString = Password.toString();
    const hashPassword = bcrypt.hashSync(passString, 10);
    const OTP = otpgenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const Newuser = new UserModel({
      Name:Name,
      Email: Email,
      Password: hashPassword,
      Phonenumber: Phonenumber,
      OTP: OTP,
    });
    Newuser.save();
    console.log(Newuser);
    if (Newuser) {
      return res.status(201).json({
        message: "Successfully Registered",
        success : true,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Signin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const Userexist = await UserModel.findOne({ Email: Email });
    if (!Userexist) {
      return res.status(400).json({
        message: "User does not exist",
      });
    }
    const ComparePassword = await bcrypt.compare(Password, Userexist.Password);
    if (!ComparePassword) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }
    const Token = await jwt.sign(
      {
        ID: Userexist._id,
        Email: Userexist.Email,
      },
      "SecretKey",
      { expiresIn: "2h" }
    );
    let cookies = new Cookies(req, res);
    cookies.set("Users", JSON.stringify(Userexist));
    return res.status(200).json({
      data: Userexist,
      token: Token,
      success : true,
      message: "Successfully login",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const SigninOTP = async (req, res) => {
  try {
    const { Phonenumber, OTP } = req.body;
    if (!Phonenumber) {
      return res.status(400).json({
        message: "Invalid Contact number",
      });
    }
    const Userexist = await UserModel({ Phonenumber: Phonenumber });
    if (!Userexist) {
      return res.status(400).json({
        message: "PLease enter valid contact number",
      });
    }
    if (Userexist.OTP !== OTP) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    const Token = await jwt.sign(
      {
        ID: Userexist._id,
        Email: Userexist.Email,
      },
      "SecretKey",
      { expiresIn: "2h" }
    );
    return res.status(200).json({
      token: Token,
      message: "Successfully login",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const GenerateOTP = async (req, res) => {
  try {
    const { Phonenumber } = req.body;
    const UserData = await UserModel.findOne({ Phonenumber: Phonenumber });
    if (UserData.Phonenumber === Phonenumber) {
      OTP = otpgenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
    }
    if (!UserData) {
      return res.status(400).json({
        message: "Number Invalid",
      });
    }
    const Updateduser = await UserModel.findOne(
      { Phonenumber: Phonenumber },
      {
        $set: {
          OTP: OTP,
        },
      }
    );
    if (Updateduser) {
      return res.status(200).json({
        message: "OTP Sent",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const Signout = async (req, res) => {
  try {
    var cookies = new Cookies(req, res);
    cookies.set("Users", null);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
