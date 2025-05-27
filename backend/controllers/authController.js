import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import createSecretToken from "../SecretToken.js";

const Signup = async (req, res, next) => {
  const { email, username, password } = req.body;
  // check if email already exists
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.json({ message: "User already exists" });
  }
  const user = await User.create({ email, username, password });
  const token = createSecretToken(user._id);
  res.cookie("token", token, {
    withCredentials: true,
    httpOnly: false,
  });

  console.log(user);
  console.log("This the token: ", token);
};

export { Signup };
