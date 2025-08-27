const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/config");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        console.log('Auth middleware - Cookies:', req.cookies);
        console.log('Auth middleware - Token:', token ? 'Present' : 'Missing');
        
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        const decodeObj = await jwt.verify(token, config.jwtSecret);
        console.log('Auth middleware - Token decoded:', decodeObj);
        const { _id } = decodeObj;
        
        const user = await User.findById(_id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        console.log('Auth middleware - User found:', user.emailId);
        req.user = user;
        next();
    } catch (err) {
        console.error('Auth middleware error:', err);
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        return res.status(500).json({ message: "Authentication error: " + err.message });
    }
};

module.exports={
    userAuth
};