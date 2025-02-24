const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserSchema } = require("../model");
const { userService } = require("../services");
require("dotenv").config();

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET_KEY;
// console.log("🚀 ~ JWT_SECRET:", JWT_SECRET)

// Generate JWT Token
const Create_Token = (user) => {
    return jwt.sign(
        { _id: user._id, type: user.type },
        JWT_SECRET,
        { expiresIn: "10d" }
    );
};

// 📌 USER LOGIN
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await UserSchema.findOne({ emailed: email })
        if (!user) {
            return res.status(400).json({ status: false, message: "Invalid email or password" });
        }

        // Validate password
        const isMatch = await bcrypt.compare(password, user.pwd);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Invalid email or password" });
        }

        // Generate token
        const token = Create_Token(user);

        res.status(200).json({ status: true, message: "Login successful", token, type: user.type });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// 📌 GET PROFILE (Protected)
const getProfile = async (req, res) => {
    try {
        const user_Id = req.user._id;
        const user = await UserSchema.findById(user_Id).populate('areaid ctid')
        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }

        res.status(200).json({ status: true, data: user });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

// 📌 RESET PASSWORD (Requires Old, New & Confirm Password)
const resetPassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;
        const user = await UserSchema.findById(req.user._id);
        console.log("🚀 ~ resetPassword ~ confirmPassword:", confirmPassword)
        console.log("🚀 ~ resetPassword ~ newPassword:", newPassword)
        console.log("🚀 ~ resetPassword ~ oldPassword:", oldPassword)
        // console.log("🚀 ~ resetPassword ~ user:", user)

        if (!user) {
            return res.status(404).json({ status: false, message: "User not found" });
        }
        if (!oldPassword || !newPassword || !confirmPassword) {
            throw new Error(`enter required fields`)
        }
        // Validate old password
        const isMatch = await bcrypt.compare(oldPassword, user.pwd);
        if (!isMatch) {
            return res.status(400).json({ status: false, message: "Old password is incorrect" });
        }

        // Check if new and confirm password match
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ status: false, message: "New password and confirm password do not match" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update password
        await userService.updateUser(user._id, { pwd: hashedPassword });

        res.status(200).json({ status: true, message: "Password reset successfully" });

    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
};

module.exports = { login, getProfile, resetPassword };
