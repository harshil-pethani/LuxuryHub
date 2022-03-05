const JWT = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.luxuryHub;

    if (authHeader) {
        // const token = authHeader.split(" ")[1];
        // console.log(token);
        JWT.verify(authHeader, process.env.JWT_SEC_KEY, (err, userData) => {
            if (err) {
                res.status(403).json({
                    "success": false,
                    "message": "You are not authenticated User"
                })
            }
            req.user = userData;
            next();
        })
    } else {
        return res.status(401).json({
            "success": false,
            "message": "Please Login to Perform This"
        })
    }
}

module.exports = verifyToken;