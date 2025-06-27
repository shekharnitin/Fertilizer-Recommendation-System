require('dotenv').config();
const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.TOKEN_AUTH;

function authMiddleware(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Wrongg!!" });
    }
    else {
        const token = authorization.split(' ')[1];
        try {
            const tokenCheck = jwt.verify(token, JWT_TOKEN)
            req.userId = tokenCheck.userID 
            next();
        } catch (error) {

            res.json({ message: error })
        }
    }
}

module.exports = { authMiddleware }