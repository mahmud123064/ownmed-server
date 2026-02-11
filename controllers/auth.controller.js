import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// signUp
export const signup = async (req, res) => {
    console.log("Request body:", req.body);
    try {
        const { name, email, password, phone, role, profileImage } = req.body;

        if (!name || !email || !password || !phone || !role || !profileImage) {
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
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// signIn
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Validation
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }

        // 2. Check user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        // 3. Compare password
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        // Create token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                profileImage: user.profileImage,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// google signIn
export const googleLogin = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ message: "Token is required" });
        }

        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;

        // Find or Create user
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                profileImage: picture,
                role: "user",
                authProvider: "google",
            });
        }

        // Generate JWT
        const jwtToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" },
        );

        res.status(200).json({
            message: "Google login successful",
            token: jwtToken,
            user,
        });
    } catch (error) {
        console.error("Google login error:", error);
        res.status(400).json({ message: "Google login failed" });
    }
};
