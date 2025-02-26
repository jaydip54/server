const mongoose = require("mongoose");
const { userService, CityServices, areaService } = require("../services");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
    try {
        const { ctid, areaid, name, gender, contact, emailed, pwd, sq, sa, type, propic } = req.body;
        console.log("🚀 ~ createUser ~ ctid:", ctid)

        // // Validate MongoDB ObjectIds
        // if (!mongoose.Types.ObjectId.isValid(ctid)) {
        //     return res.status(400).json({ status: "error", message: "Invalid City ID" });
        // }
        // if (!mongoose.Types.ObjectId.isValid(areaid)) {
        //     return res.status(400).json({ status: "error", message: "Invalid Area ID" });
        // }

        // Check if city exists
        const cityExists = await CityServices.getCityById(ctid);
        if (!cityExists) {
            return res.status(404).json({ status: "error", message: "City not found" });
        }

        // Check if area exists
        const areaExists = await areaService.getAreaById(areaid);
        if (!areaExists) {
            return res.status(404).json({ status: "error", message: "Area not found" });
        }

        // Check if email already exists
        const emailExists = await userService.findOne(emailed);
        if (emailExists) {
            return res.status(400).json({ status: "error", message: "Email already in use" });
        }

        // Hash password before storing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(pwd, salt);

        // Create user object with hashed password
        const userData = {
            ctid,
            areaid,
            name,
            gender,
            contact,
            emailed,
            pwd: hashedPassword,  // Store the hashed password
            sq,
            sa,
            type,
            propic
        };

        const user = await userService.createUser(userData);

        res.status(201).json({
            status: "success",
            message: "User created successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await userService.getUsers();
        res.status(200).json({
            status: "success",
            message: "Users retrieved successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: "error", message: "Invalid User ID" });
        }

        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        res.status(200).json({
            status: "success",
            message: "User retrieved successfully",
            data: user
        });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { ctid, areaid, name, gender, contact, emailed, sq, sa, type, propic } = req.body; // Removed `pwd`

        // Validate MongoDB ObjectIds
        if (!mongoose.Types.ObjectId.isValid(ctid)) {
            return res.status(400).json({ status: "error", message: "Invalid City ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(areaid)) {
            return res.status(400).json({ status: "error", message: "Invalid Area ID" });
        }

        // Check if city exists
        const cityExists = await CityServices.getCityById(ctid);
        if (!cityExists) {
            return res.status(404).json({ status: "error", message: "City not found" });
        }

        // Check if area exists
        const areaExists = await areaService.getAreaById(areaid);
        if (!areaExists) {
            return res.status(404).json({ status: "error", message: "Area not found" });
        }

        // Check if email already exists (excluding current user)
        const emailExists = await userService.findOne(emailed);
        if (emailExists && emailExists.id.toString() !== req.params.id) {
            return res.status(400).json({ status: "error", message: "Email already in use" });
        }

        // Prevent updating the password
        const updateData = { ctid, areaid, name, gender, contact, emailed, sq, sa, type, propic };

        const updatedUser = await userService.updateUser(req.params.id, updateData);
        if (!updatedUser) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        res.status(200).json({
            status: "success",
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ status: "error", message: "Invalid User ID" });
        }

        const user = await userService.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({ status: "error", message: "User not found" });
        }

        res.status(200).json({
            status: "success",
            message: "User deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
};



module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
