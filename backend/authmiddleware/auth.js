const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; // Check if authorization header exists

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decodedData = jwt.verify(token, "test");
        req.userId = decodedData?.id;
        
        next(); 
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
    }
};

module.exports = auth;
