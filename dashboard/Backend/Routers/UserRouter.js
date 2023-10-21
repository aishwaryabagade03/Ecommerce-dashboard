import {
  Adduser,
  Getuser,
  Userrecords,
  Updateuser,
  Deleteuser,
  Signup,
  SigninOTP,
  GenerateOTP,
  Signout,
  Signin,
} from "../Controllers/UserController";
import express from "express";

const router = express.Router();

router.post("/add-user", Adduser);
router.get("/user-records", Userrecords);
router.get("/get-user/:user_id", Getuser);
router.put("/update-user/:user_id", Updateuser);
router.delete("/delete-user/:user_id", Deleteuser);
router.post("/signup", Signup);
router.get("/signin", Signin);
router.get("/signin-otp", SigninOTP);
router.patch("/generate-otp", GenerateOTP);
router.delete("/signout", Signout);

export default router;
