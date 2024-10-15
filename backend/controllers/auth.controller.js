import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import { sendMail } from "../nodemailer/mailsend.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, email, password, confirmPassword, gender } =
      req?.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error occured in signup controller");
    return res
      .status(500)
      .json({ error: error, message: "An error occured in signup" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req?.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      email: user.email ? user.email : "",
      profilePic: user.profilePic,
    });

    sendMail(
      user.email,
      "Welcome to the Community!",
      "Welcome to the community! Glad to have you with us! Please login with our system to continue"
    );
  } catch (error) {
    console.log("Error occured in login controller");
    return res.status(500).json({ error: error, message: "An error occured" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "User Logged Out Successfully" });
  } catch (error) {
    console.log("Error occured in login controller");
    return res.status(500).json({
      error: error,
      message: "An error occured",
    });
  }
};
