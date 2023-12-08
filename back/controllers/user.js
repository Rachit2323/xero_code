const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const JWT_SECRET = "djbjdbjdsb233";
const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

const axios = require("axios");
const { response } = require("express");

const GIT_CLIENT = "88591916336e1bc18179";
const GIT_SEC = "4f90caf565877c1d22dd874caf1c6ebc8e32290a";

exports.gitsign = async (req, res) => {
  const params =
    "?client_id=" +
    GIT_CLIENT +
    "&client_secret=" +
    GIT_SEC +
    "&code=" +
    req.query.code;
  await fetch("https://github.com/login/oauth/access_token" + params, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      res.json(data);
    });
};

exports.getgit = async (req, res) => {

  try {
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const response = await fetch("https://api.github.com/user/emails", {
      method: "GET",
      headers: {
        Authorization: authorizationHeader,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user emails from GitHub API");
    }

    const data = await response.json();


    if (!data || !data.length) {
      throw new Error("No email found from GitHub API");
    }

    const email = data[0].email;

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(email, 10);
      const newUser = new User({
        email,
        firstName: email,
        lastName: email,
        password: hashedPassword,
      });

      existingUser = await newUser.save();
    }

    const generatedToken = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ success: true, result: existingUser, token: generatedToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.gsignup = async (req, res) => {
  try {
    const { token } = req.body;

    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response);
    const {
      given_name: firstName,
      family_name: lastName,
      email,
    } = response.data;

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(email, 10);
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      existingUser = await newUser.save();
    }

    const generatedToken = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ success: true, result: existingUser, token: generatedToken });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid access token!" });
  }
};

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Password and confirm password do not match",
      });
    }
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, error: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      verified: false,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET);

    res.status(200).json({
      success: true,
      data: firstName,
      token: token,
      message: "Signup Done",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while registering the user",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Email does not exist",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        error: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET);

    res.status(200).json({
      success: true,
      token: token,
      message: "User signed in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while signing in the user",
    });
  }
};

exports.types = async (req, res) => {
  try {
    const { values } = req.body;

    const key = Object.keys(values)[0];

    if (key === "hosting")
      await User.updateOne({ _id: req.userId }, { $set: { hosting: values } });
    else
      await User.updateOne({ _id: req.userId }, { $set: { userType: values } });

    res.status(200).json({
      success: true,
      message: "User type updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while signing in the user",
    });
  }
};

exports.cards = async (req, res) => {
  try {
    const { values } = req.body;

    const userId = req.userId;

    const user = await User.findById(userId);

    user.cloud = values[0].cloud;
    user.sourceCode = values[1].source;
    user.dataSource = values[2].data;

    user.cloud_img = values[0].img;
    user.dataSource_img = values[2].img;
    user.sourceCode_img = values[1].img;
    user.counted = 3;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Cards successfully stored in the database",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "An error occurred while signing in the user",
    });
  }
};

exports.userInfo = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);

    res.status(200).json({
      success: true,
      user: user,
      message: "User details",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: "An error occurred while signing in the user",
    });
  }
};
