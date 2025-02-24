const jwt = require("jsonwebtoken");
const { userService } = require("../services");

// 📌 AUTHENTICATE JWT TOKEN
const isLogin = async (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        if (!header) {
            throw new Error("You are not logged in. Please login first.");
        }

        const token = header

        const userFromToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        // console.log("🚀 ~ isLogin ~ userFromToken:", userFromToken)
        const userInDB = await userService.getUserById(userFromToken._id);
        // console.log("🚀 ~ isLogin ~ userInDB:", userInDB)

        if (!userInDB) {
            throw new Error("Invalid session. Please login again.");
        }

        req.user = userFromToken;
        next();

    } catch (error) {
        return res.status(401).json({ status: false, message: error.message || "Authentication failed." });
    }
};

// 📌 ROLE-BASED ACCESS CONTROL (RBAC) 
const isRestrict = (roles) => {
    // console.log("🚀 ~ isRestrict ~ roles:", roles)
    return async (req, res, next) => {
        try {
            const user = await userService.getUserById(req.user._id);
            if (!user || !roles.includes(user.type)) {
                throw new Error("You do not have permission to access this resource.");
            }
            next();
        } catch (error) {
            res.status(403).json({ status: false, message: error.message });
        }
    };
};

module.exports = { isLogin, isRestrict };
