const bcrypt = require('bcrypt');
const Auth = require("../model/auth"); 
const register = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const isUser = await Auth.findOne({ userName });
    if (isUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Auth({
      userName,
      password: hashedPassword
    });

    await newUser.save();

    return res.status(201).json({ msg: "Registered successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const isUser = await Auth.findOne({ userName });
    if (!isUser) {
      return res.status(404).json({ msg: "User not found" });
    }

    const isPassword = await bcrypt.compare(password, isUser.password);
    if (!isPassword) {
      return res.status(400).json({ msg: "Password not matched" });
    }

    return res.status(200).json({ msg: "Logged in successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = { register, login };
