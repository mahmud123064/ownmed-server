import bcrypt from "bcryptjs";
import User from "../models/User.js";

export const signup = async (req, res) => {
    console.log("Request body:", req.body);
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      profileImage,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !phone ||
      !role ||
      !profileImage
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
      profileImage,
    });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error); 
    res.status(500).json({ message: "Server error" });
  }
};
