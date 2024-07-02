const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const app = express();

app.use(express.json());
app.use(cookieParser());

const jwtSecret = "hdcjsdssd";

mongoose.connect("mongodb://127.0.0.1:27017/bookingclone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Update CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // your frontend's origin
  credentials: true
}));

// Register route with password hashing
app.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ email, password: hashedPassword, name });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign(
          { email: user.email, id: user._id, name: user.name },
          jwtSecret,
          {}
        );
        res.cookie("token", token, { httpOnly: true, sameSite: 'lax' }).json("Login Successful");
      } else {
        res.status(401).json("The password is incorrect");
      }
    } else {
      res.status(404).json("No record exists");
    }
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

app.get("/profile", async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, async (err, userData) => {
      if (err) {
        res.status(401).json("Invalid token");
        return;
      }
      try {
        const user = await UserModel.findById(userData.id);
        if (user) {
          res.json({ name: user.name, email: user.email, _id: user._id });
        } else {
          res.status(404).json("User not found");
        }
      } catch (error) {
        res.status(500).json("Internal server error");
      }
    });
  } else {
    res.status(401).json("No token provided");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
